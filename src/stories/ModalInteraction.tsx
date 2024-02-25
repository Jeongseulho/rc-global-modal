import React from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';

interface Props {
  closeOnOverlayClick: boolean;
  closeOnEsc: boolean;
}

export const ModalInteraction = ({
  closeOnOverlayClick,
  closeOnEsc,
}: Props) => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={() => openModal('modal-id')}>Open Modal</button>
      <Modal
        id="modal-id"
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEsc={closeOnEsc}
      >
        <h1>Modal Content</h1>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </>
  );
};
