import React, { useEffect } from 'react';
import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { createPortal } from 'react-dom';
import getModalRoot from '../utils/getModalRoot';
import { useAnimation } from '../hooks/useAnimation';
import { ANIMATION_TYPE } from '../constants/Animation';
import getAnimationStyle from '../utils/getAnimationStyle';
import { ModalStackItem, ModalController } from '../context/ModalController';

interface Props {
  modalItem: ModalStackItem;
  controller: ModalController;
}

const AnimatedModalWrapper = ({ modalItem, controller }: Props) => {
  const modalRoot = getModalRoot();
  const { shouldMount, animationTrigger, onTransitionEnd } = useAnimation(modalItem.isOpen);

  const {
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
  } = modalItem.options;

  useEffect(() => {
    const closeOnEscHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        modalItem.reject('Escape key pressed');
      }
    };
    if (modalItem.isOpen) {
      document.addEventListener('keydown', closeOnEscHandler);
    }
    return () => document.removeEventListener('keydown', closeOnEscHandler);
  }, [closeOnEsc, modalItem]);

  const onCloseModalClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      modalItem.reject('Overlay clicked');
    }
  };

  const handleTransitionEnd = () => {
    onTransitionEnd();
    if (!modalItem.isOpen) {
      controller.remove(modalItem.key);
    }
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
        onTransitionEnd={handleTransitionEnd}
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
          onTransitionEnd={handleTransitionEnd}
          animationStyle={getAnimationStyle(
            animationType,
            animationDuration,
            animationTrigger,
          )}
        >
          <modalItem.Component
            {...modalItem.props}
            resolve={modalItem.resolve}
            reject={modalItem.reject}
          />
        </ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
};

export default AnimatedModalWrapper;
