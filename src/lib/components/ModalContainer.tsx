import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
}

const ModalContainer = ({ children }: Props) => {
  return (
    <div
      css={css({
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
      })}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
