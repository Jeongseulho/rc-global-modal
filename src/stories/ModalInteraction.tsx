import React from 'react';
import Modal from '../lib/index';
import { useModal } from '../lib/index';
import { ModalProps } from '../lib/types/ModalProps';

type Props = Pick<
  ModalProps,
  'closeOnOverlayClick' | 'closeOnEsc' | 'animationType'
>;

export const ModalInteraction = ({
  closeOnOverlayClick,
  closeOnEsc,
  animationType,
}: Props) => {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={() => openModal('modal-id')}>Open Modal</button>
      <Modal
        id="modal-id"
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEsc={closeOnEsc}
        animationType={animationType}
      >
        <h1>Modal Content</h1>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </>
  );
};
