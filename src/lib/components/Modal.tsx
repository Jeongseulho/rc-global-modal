import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useContext, useEffect } from 'react';
import { ModalStateContext } from '../context/ModalContext';
import { createPortal } from 'react-dom';
import getModalRoot from '../utils/getModalRoot';
import { useModal } from '../context/ModalContext';
import { ModalProps } from '../types/ModalProps';
import { useAnimation } from '../hooks/useAnimation';
import { ANIMATION_TYPE } from '../constants/Animation';
import getAnimationStyle from '../utils/getAnimationStyle';

function Modal({
  children,
  id,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  modalContainerClassName,
  overlayClassName,
  modalContainerStyle,
  overlayStyle,
  modalContainerRef,
  overlayRef,
  animationType = ANIMATION_TYPE.FADE,
  animationDuration = 300,
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
        className={overlayClassName}
        style={overlayStyle}
        ref={overlayRef}
        onTransitionEnd={onTransitionEnd}
        animationStyle={getAnimationStyle(
          ANIMATION_TYPE.FADE,
          animationDuration,
          animationTrigger,
        )}
      >
        <ModalContainer
          className={modalContainerClassName}
          style={modalContainerStyle}
          ref={modalContainerRef}
          onTransitionEnd={onTransitionEnd}
          animationStyle={getAnimationStyle(
            animationType,
            animationDuration,
            animationTrigger,
          )}
        >
          {children}
        </ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
}

export default Modal;
