import React from 'react';
import { useModal } from '../lib/index';
import { ModalOptions } from '../lib/types/ModalProps';

type Props = Pick<
  ModalOptions,
  'closeOnOverlayClick' | 'closeOnEsc' | 'animationType'
>;

export const ModalInteraction = ({
  closeOnOverlayClick,
  closeOnEsc,
  animationType,
}: Props) => {
  const modal = useModal();

  const handleOpenModal = async () => {
    try {
      const result = await modal.push({
        key: 'interaction-modal',
        options: {
          closeOnOverlayClick,
          closeOnEsc,
          animationType,
        },
        Component: ({ resolve, reject }) => (
          <div>
            <h1>Modal Content</h1>
            <button onClick={() => resolve('Resolved!')}>Resolve</button>
            <button onClick={() => reject('Rejected!')}>Close Modal</button>
          </div>
        ),
        props: {}
      });
      alert(`Modal result: ${result}`);
    } catch (error) {
      console.log('Modal closed:', error);
    }
  };

  return (
    <>
      <button onClick={handleOpenModal}>Open Modal</button>
    </>
  );
};
