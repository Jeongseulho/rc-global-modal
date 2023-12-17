import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
}

const Overlay = ({ children }: Props) => {
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
    >
      {children}
    </div>
  );
};

export default Overlay;
