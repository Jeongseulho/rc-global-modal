import React, { useEffect } from 'react';
import { useModal } from '../lib/index';
import { ModalOptions } from '../lib/types/ModalProps';

type Props = Pick<ModalOptions, 'modalContainerStyle' | 'overlayStyle'>;

export const ModalStyle = ({ modalContainerStyle, overlayStyle }: Props) => {
  const modal = useModal();

  const handleOpenModal = async () => {
    try {
      const result = await modal.push({
        key: 'style-modal',
        options: {
          modalContainerStyle,
          overlayStyle,
        },
        Component: ({ resolve, reject }) => (
          <div>
            <h1>Styled Modal Content</h1>
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
      <button onClick={handleOpenModal}>Open Styled Modal</button>
    </>
  );
};
