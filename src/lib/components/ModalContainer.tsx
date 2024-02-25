import { css } from '@emotion/react';
import { ModalContainerProps } from '../types/ModalProps';

const ModalContainer = ({
  children,
  modalContainerClassName,
  modalContainerStyle,
  modalContainerRef,
}: ModalContainerProps) => {
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
