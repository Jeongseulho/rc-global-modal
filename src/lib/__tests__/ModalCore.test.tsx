/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalProvider } from '../context/ModalProvider';
import { useModal } from '../hooks/useModal';
import { TestTrigger, DummyModal } from './utils/TestComponents';

describe('Modal Core Logic', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('mounts without error', () => {
    render(
      <ModalProvider>
        <div>App Content</div>
      </ModalProvider>
    );
    expect(screen.getByText('App Content')).toBeInTheDocument();
  });

  it('opens a modal when push is called', async () => {
    const user = userEvent.setup();
    render(
      <ModalProvider>
        <TestTrigger Component={DummyModal} />
      </ModalProvider>
    );

    expect(screen.queryByTestId('dummy-modal')).not.toBeInTheDocument();

    const openBtn = screen.getByText('Open Modal');
    await user.click(openBtn);

    expect(screen.getByTestId('dummy-modal')).toBeInTheDocument();
  });

  it('resolves the modal promise and initiates close when resolved', async () => {
    const user = userEvent.setup();
    const handleResolve = vi.fn();

    render(
      <ModalProvider>
        <TestTrigger Component={DummyModal} onResolve={handleResolve} />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    expect(screen.getByTestId('dummy-modal')).toBeInTheDocument();

    await user.click(screen.getByText('Resolve'));

    await waitFor(() => {
      expect(handleResolve).toHaveBeenCalledWith('Resolved!');
    });

    const overlay = screen.getByTestId('dummy-modal').parentElement?.parentElement;
    if (overlay) {
      fireEvent.transitionEnd(overlay);
    }

    await waitFor(() => {
      expect(screen.queryByTestId('dummy-modal')).not.toBeInTheDocument();
    });
  });

  it('rejects the modal promise and initiates close when rejected', async () => {
    const user = userEvent.setup();
    const handleReject = vi.fn();

    render(
      <ModalProvider>
        <TestTrigger Component={DummyModal} onReject={handleReject} />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    await user.click(screen.getByText('Reject'));

    await waitFor(() => {
      expect(handleReject).toHaveBeenCalledWith('Rejected!');
    });

    const overlay = screen.getByTestId('dummy-modal').parentElement?.parentElement;
    if (overlay) {
      fireEvent.transitionEnd(overlay);
    }

    await waitFor(() => {
      expect(screen.queryByTestId('dummy-modal')).not.toBeInTheDocument();
    });
  });

  it('supports multiple modals stacked', async () => {
    const user = userEvent.setup();

    const NestedTrigger = ({ resolve }: any) => {
      const modal = useModal();
      return (
        <div>
          <button
            onClick={() => {
              modal.push({
                key: 'nested-modal',
                Component: () => <div data-testid="nested-modal">Nested!</div>,
                props: {},
              });
            }}
          >
            Open Nested
          </button>
          <button onClick={() => resolve('Done')}>Resolve First</button>
        </div>
      );
    };

    render(
      <ModalProvider>
        <TestTrigger Component={NestedTrigger} />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    await user.click(screen.getByText('Open Nested'));

    expect(screen.getByText('Open Nested')).toBeInTheDocument();
    expect(screen.getByTestId('nested-modal')).toBeInTheDocument();
  });
});
