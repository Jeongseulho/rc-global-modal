import { css, keyframes } from '@emotion/react';
import { OverlayProps } from '../types/ModalProps';
import { useLayoutEffect, useState } from 'react';

const Overlay = ({
  children,
  onCloseModalClickOverlay,
  overlayClassName,
  overlayStyle,
  overlayRef,
}: OverlayProps) => {
  const [mounted, setMounted] = useState(false);

  const fadeIn = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

  const fadeInAnimation = `${fadeIn} 0.3s`;

  const fadeOut = keyframes`
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  `;

  const fadeOutAnimation = `${fadeOut} 0.3s`;

  useLayoutEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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
        animation: `${mounted ? fadeInAnimation : fadeOutAnimation}`,
        ...overlayStyle,
      })}
      className={overlayClassName}
      onClick={onCloseModalClickOverlay}
      ref={overlayRef}
    >
      {children}
    </div>
  );
};

export default Overlay;
