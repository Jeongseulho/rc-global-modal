import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  modalContainerClassName?: string;
  modalContainerStyle?: React.CSSProperties;
}

const ModalContainer = ({
  children,
  modalContainerClassName,
  modalContainerStyle,
}: Props) => {
  return (
    <div
      css={css({
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        ...modalContainerStyle,
      })}
      className={modalContainerClassName}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
