import React, { useEffect } from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';
import { ModalProps } from '../lib/types/ModalProps';

type Props = Pick<ModalProps, 'modalContainerStyle' | 'overlayStyle'>;

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
