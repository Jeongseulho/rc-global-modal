import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
}

const Overlay = ({ children }: Props) => {
  return (
    <div
      css={css({
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(145,145,145,0.5)',
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
