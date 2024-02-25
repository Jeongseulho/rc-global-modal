import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useContext, useEffect } from 'react';
import { ModalStateContext } from '../context/ModalContext';
import { createPortal } from 'react-dom';
import getModalRoot from '../utils/getModalRoot';
import { ModalId } from '../types/ModalType';
import { useModal } from '../context/ModalContext';

interface Props {
  children: React.ReactNode;
  id: Exclude<ModalId, null>;
  closeOnOverlayClick?: boolean;
  modalContainerClassName?: string;
  overlayClassName?: string;
  modalContainerStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  closeOnEsc?: boolean;
  modalContainerRef?: React.RefObject<HTMLDivElement>;
  overlayRef?: React.RefObject<HTMLDivElement>;
}

function Modal({
  children,
  id,
  closeOnOverlayClick = true,
  modalContainerClassName,
  overlayClassName,
  modalContainerStyle,
  overlayStyle,
  closeOnEsc = true,
  modalContainerRef,
  overlayRef,
}: Props) {
  const { openModalId } = useContext(ModalStateContext);
  const modalRoot = getModalRoot();
  const { closeModal } = useModal();
  useEffect(() => {
    const closeOnEscHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        closeModal();
      }
    };
    document.addEventListener('keydown', closeOnEscHandler);
    return () => document.removeEventListener('keydown', closeOnEscHandler);
  }, [closeOnEsc, closeModal]);

  return (
    openModalId === id &&
    createPortal(
      <Overlay
        closeOnOverlayClick={closeOnOverlayClick}
        overlayClassName={overlayClassName}
        overlayStyle={overlayStyle}
        overlayRef={overlayRef}
      >
        <ModalContainer
          modalContainerRef={modalContainerRef}
          modalContainerClassName={modalContainerClassName}
          modalContainerStyle={modalContainerStyle}
        >
          {children}
        </ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
}

export default Modal;
