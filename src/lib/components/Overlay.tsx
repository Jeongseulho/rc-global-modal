import { css } from '@emotion/react';
import { OverlayProps } from '../types/ModalProps';

const Overlay = ({
  children,
  onCloseModalClickOverlay,
  className,
  style,
  ref,
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
        ...style,
      })}
      className={className}
      onClick={onCloseModalClickOverlay}
      ref={ref}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};

export default Overlay;
