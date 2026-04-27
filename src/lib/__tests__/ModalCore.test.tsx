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

  it('removes a specific modal using pop', async () => {
    const user = userEvent.setup();
    const handleReject = vi.fn();

    const PopTrigger = () => {
      const modal = useModal();
      return (
        <div>
          <button
            onClick={() => {
              modal.push({
                key: 'pop-modal',
                Component: () => <div data-testid="pop-modal">Pop me!</div>,
                props: {},
              }).catch(handleReject);
            }}
          >
            Open Pop Modal
          </button>
          <button onClick={() => modal.pop()}>Pop the Modal</button>
        </div>
      );
    };

    render(
      <ModalProvider>
        <PopTrigger />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Pop Modal'));
    expect(screen.getByTestId('pop-modal')).toBeInTheDocument();

    await user.click(screen.getByText('Pop the Modal'));

    const overlay = screen.getByTestId('pop-modal').parentElement?.parentElement;
    if (overlay) fireEvent.transitionEnd(overlay);

    await waitFor(() => {
      expect(screen.queryByTestId('pop-modal')).not.toBeInTheDocument();
    });
    // pop rejects the promise with 'Close modal: <key>'
    expect(handleReject).toHaveBeenCalledWith('Close modal: pop-modal');
  });

  it('clears all modals using clear', async () => {
    const user = userEvent.setup();

    const ClearTrigger = () => {
      const modal = useModal();
      return (
        <div>
          <button
            onClick={() => {
              modal.push({
                key: 'clear-modal-1',
                Component: () => <div data-testid="clear-modal-1">1</div>,
                props: {},
              }).catch(() => {});
              modal.push({
                key: 'clear-modal-2',
                Component: () => <div data-testid="clear-modal-2">2</div>,
                props: {},
              }).catch(() => {});
            }}
          >
            Open Two Modals
          </button>
          <button onClick={() => modal.clear()}>Clear All</button>
        </div>
      );
    };

    render(
      <ModalProvider>
        <ClearTrigger />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Two Modals'));
    expect(screen.getByTestId('clear-modal-1')).toBeInTheDocument();
    expect(screen.getByTestId('clear-modal-2')).toBeInTheDocument();

    await user.click(screen.getByText('Clear All'));

    const overlay1 = screen.getByTestId('clear-modal-1').parentElement?.parentElement;
    const overlay2 = screen.getByTestId('clear-modal-2').parentElement?.parentElement;
    if (overlay1) fireEvent.transitionEnd(overlay1);
    if (overlay2) fireEvent.transitionEnd(overlay2);

    await waitFor(() => {
      expect(screen.queryByTestId('clear-modal-1')).not.toBeInTheDocument();
      expect(screen.queryByTestId('clear-modal-2')).not.toBeInTheDocument();
    });
  });
});
