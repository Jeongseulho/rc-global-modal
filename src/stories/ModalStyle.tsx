import React, { useEffect } from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';

export const ModalStyle = () => {
  const { openModal } = useModal();

  useEffect(() => {
    openModal('modal-id');
  }, [openModal]);

  return (
    <Modal id="modal-id">
      <h1>Modal Content</h1>
    </Modal>
  );
};
