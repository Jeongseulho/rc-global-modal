import { css } from '@emotion/react';
import { useModal } from '../context/ModalContext';

interface Props {
  children: React.ReactNode;
  closeOnOverlayClick: boolean;
}

const Overlay = ({ children, closeOnOverlayClick }: Props) => {
  const { closeModal } = useModal();
  const onCloseModalClickOverlay = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

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
      })}
      onClick={closeOnOverlayClick ? onCloseModalClickOverlay : undefined}
    >
      {children}
    </div>
  );
};

export default Overlay;
