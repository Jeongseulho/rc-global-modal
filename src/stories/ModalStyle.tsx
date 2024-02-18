import React, { useEffect } from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';

interface Props {
  modalContainerStyle: React.CSSProperties;
  overlayStyle: React.CSSProperties;
}

export const ModalStyle = ({ modalContainerStyle, overlayStyle }: Props) => {
  const { openModal } = useModal();

  useEffect(() => {
    openModal('modal-id');
  }, [openModal]);

  return (
    <Modal
      id="modal-id"
      modalContainerStyle={modalContainerStyle}
      overlayStyle={overlayStyle}
    >
      <h1>Modal Content</h1>
    </Modal>
  );
};
