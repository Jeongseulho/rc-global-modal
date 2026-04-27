import React from 'react';
import { useModal } from '../lib/index';

export const ModalStack = () => {
  const modal = useModal();

  const handleOpenFirst = () => {
    modal.push({
      key: 'first-modal',
      Component: ({ resolve, reject }) => {
        const innerModal = useModal();
        return (
          <div style={{ padding: '20px', backgroundColor: 'white', border: '2px solid black', borderRadius: '8px' }}>
            <h2>First Modal</h2>
            <p>This is the first layer.</p>
            <button
              onClick={() => {
                innerModal.push({
                  key: 'second-modal',
                  Component: ({ resolve: res2, reject: rej2 }) => (
                    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', border: '2px solid blue', borderRadius: '8px' }}>
                      <h2>Second Modal</h2>
                      <p>This is the second layer.</p>
                      <button onClick={() => res2('Resolved second')}>Close Second</button>
                    </div>
                  ),
                  props: {}
                });
              }}
              style={{ marginRight: '10px' }}
            >
              Open Second Modal
            </button>
            <button onClick={() => resolve('Resolved first')}>Close First</button>
          </div>
        );
      },
      props: {}
    });
  };

  return (
    <div>
      <p>Stack multiple modals on top of each other.</p>
      <button onClick={handleOpenFirst}>Open Stack Modal</button>
    </div>
  );
};
