import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useContext, useEffect } from 'react';
import { ModalStateContext } from '../context/ModalContext';
import { createPortal } from 'react-dom';
import getModalRoot from '../utils/getModalRoot';
import { useModal } from '../context/ModalContext';
import { ModalProps } from '../types/ModalProps';
import { useAnimation } from '../hooks/useAnimation';

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
}: ModalProps) {
  const { openModalId } = useContext(ModalStateContext);
  const modalRoot = getModalRoot();
  const { closeModal } = useModal();
  const { shouldMount, animationTrigger, onTransitionEnd } = useAnimation(
    id === openModalId,
  );

  useEffect(() => {
    const closeOnEscHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) closeModal();
    };
    document.addEventListener('keydown', closeOnEscHandler);
    return () => document.removeEventListener('keydown', closeOnEscHandler);
  }, [closeOnEsc, closeModal]);

  const onCloseModalClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    shouldMount &&
    createPortal(
      <Overlay
        onCloseModalClickOverlay={
          closeOnOverlayClick ? onCloseModalClickOverlay : undefined
        }
        overlayClassName={overlayClassName}
        overlayStyle={overlayStyle}
        overlayRef={overlayRef}
        onTransitionEnd={onTransitionEnd}
        animationTrigger={animationTrigger}
      >
        <ModalContainer
          modalContainerClassName={modalContainerClassName}
          modalContainerStyle={modalContainerStyle}
          modalContainerRef={modalContainerRef}
        >
          {children}
        </ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
}

export default Modal;
