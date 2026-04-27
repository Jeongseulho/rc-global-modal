/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalProvider } from '../context/ModalProvider';
import { useModal } from '../hooks/useModal';

// A simple component to trigger modal
const TestTrigger = ({ options = {}, Component, onResolve, onReject }: any) => {
  const modal = useModal();

  return (
    <button
      onClick={async () => {
        try {
          const result = await modal.push({
            key: 'test-modal',
            options,
            Component,
            props: {},
          });
          onResolve && onResolve(result);
        } catch (error) {
          onReject && onReject(error);
        }
      }}
    >
      Open Modal
    </button>
  );
};

// A dummy modal component
const DummyModal = ({ resolve, reject }: any) => {
  return (
    <div data-testid="dummy-modal">
      <button onClick={() => resolve('Resolved!')}>Resolve</button>
      <button onClick={() => reject('Rejected!')}>Reject</button>
    </div>
  );
};

describe('Global Modal Logic', () => {
  beforeEach(() => {
    // Clear portals or DOM if necessary
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

    // To fully remove from DOM, we need to simulate transition end
    // since we use a portal and Overlay has the transition end handler.
    // The overlay is the parent of dummy-modal.
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

  it('closes on overlay click if closeOnOverlayClick is true', async () => {
    const user = userEvent.setup();
    const handleReject = vi.fn();

    render(
      <ModalProvider>
        <TestTrigger Component={DummyModal} options={{ closeOnOverlayClick: true }} onReject={handleReject} />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    
    // The overlay is the outermost div rendered by the portal. We can click it.
    // It wraps the modal container.
    const modalContainer = screen.getByTestId('dummy-modal').parentElement;
    const overlay = modalContainer?.parentElement;
    
    expect(overlay).toBeInTheDocument();
    await user.click(overlay!);

    await waitFor(() => {
      expect(handleReject).toHaveBeenCalledWith('Overlay clicked');
    });
  });

  it('does not close on overlay click if closeOnOverlayClick is false', async () => {
    const user = userEvent.setup();
    const handleReject = vi.fn();

    render(
      <ModalProvider>
        <TestTrigger Component={DummyModal} options={{ closeOnOverlayClick: false }} onReject={handleReject} />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    
    const modalContainer = screen.getByTestId('dummy-modal').parentElement;
    const overlay = modalContainer?.parentElement;
    
    await user.click(overlay!);

    // Should not have been called
    expect(handleReject).not.toHaveBeenCalled();
    expect(screen.getByTestId('dummy-modal')).toBeInTheDocument();
  });

  it('closes on Escape key if closeOnEsc is true', async () => {
    const user = userEvent.setup();
    const handleReject = vi.fn();

    render(
      <ModalProvider>
        <TestTrigger Component={DummyModal} options={{ closeOnEsc: true }} onReject={handleReject} />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    expect(screen.getByTestId('dummy-modal')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(handleReject).toHaveBeenCalledWith('Escape key pressed');
    });
  });

  it('applies custom classNames and styles from options', async () => {
    const user = userEvent.setup();

    render(
      <ModalProvider>
        <TestTrigger
          Component={DummyModal}
          options={{
            modalContainerClassName: 'custom-container',
            overlayClassName: 'custom-overlay',
            modalContainerStyle: { color: 'red' },
            overlayStyle: { backgroundColor: 'blue' }
          }}
        />
      </ModalProvider>
    );

    await user.click(screen.getByText('Open Modal'));
    
    const modalContainer = screen.getByTestId('dummy-modal').parentElement;
    const overlay = modalContainer?.parentElement;

    expect(modalContainer).toHaveClass('custom-container');
    expect(overlay).toHaveClass('custom-overlay');
    expect(modalContainer).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(overlay).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
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
