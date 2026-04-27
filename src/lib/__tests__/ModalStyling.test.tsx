/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalProvider } from '../context/ModalProvider';
import { TestTrigger, DummyModal } from './utils/TestComponents';

describe('Modal Styling Options', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
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
});
