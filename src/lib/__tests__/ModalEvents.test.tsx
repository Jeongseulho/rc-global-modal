/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalProvider } from '../context/ModalProvider';
import { TestTrigger, DummyModal } from './utils/TestComponents';

describe('Modal Event Interactions', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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
});
