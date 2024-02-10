import React from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';

export const ModalInteraction = () => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={() => openModal('modal-id')}>Open Modal</button>
      <Modal id="modal-id">
        <h1>Modal Content</h1>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </>
  );
};
