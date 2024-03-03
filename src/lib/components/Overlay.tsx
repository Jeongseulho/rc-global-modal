import { css } from '@emotion/react';
import { OverlayProps } from '../types/ModalProps';

const Overlay = ({
  children,
  onCloseModalClickOverlay,
  overlayClassName,
  overlayStyle,
  overlayRef,
  onTransitionEnd,
  animationStyle,
}: OverlayProps) => {
  return (
    <div
      css={css({
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...animationStyle,
        ...overlayStyle,
      })}
      className={overlayClassName}
      onClick={onCloseModalClickOverlay}
      ref={overlayRef}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};

export default Overlay;
