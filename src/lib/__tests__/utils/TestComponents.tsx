import React from 'react';
import { useModal } from '../../hooks/useModal';

// A simple component to trigger modal
export const TestTrigger = ({ options = {}, Component, onResolve, onReject }: any) => {
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
export const DummyModal = ({ resolve, reject }: any) => {
  return (
    <div data-testid="dummy-modal">
      <button onClick={() => resolve('Resolved!')}>Resolve</button>
      <button onClick={() => reject('Rejected!')}>Reject</button>
    </div>
  );
};
