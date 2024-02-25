import { css } from '@emotion/react';

interface Props {
  children: React.ReactNode;
  modalContainerClassName?: string;
  modalContainerStyle?: React.CSSProperties;
  modalContainerRef?: React.RefObject<HTMLDivElement>;
}

const ModalContainer = ({
  children,
  modalContainerClassName,
  modalContainerStyle,
  modalContainerRef,
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
      ref={modalContainerRef}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
