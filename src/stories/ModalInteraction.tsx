import React from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';

interface Props {
  closeOnOverlayClick: boolean;
}

export const ModalInteraction = ({ closeOnOverlayClick }: Props) => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={() => openModal('modal-id')}>Open Modal</button>
      <Modal id="modal-id" closeOnOverlayClick={closeOnOverlayClick}>
        <h1>Modal Content</h1>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </>
  );
};
