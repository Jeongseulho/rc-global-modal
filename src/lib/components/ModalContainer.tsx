import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  modalContainerClassName?: string;
}

const ModalContainer = ({ children, modalContainerClassName }: Props) => {
  return (
    <div
      css={css({
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
      })}
      className={modalContainerClassName}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
