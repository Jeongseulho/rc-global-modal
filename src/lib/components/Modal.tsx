import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useContext } from 'react';
import { ModalStateContext } from '../context/ModalContext';
import { createPortal } from 'react-dom';
import getModalRoot from '../utils/getModalRoot';
import { ModalId } from '../types/ModalType';

interface Props {
  children: React.ReactNode;
  id: Exclude<ModalId, null>;
  closeOnOverlayClick?: boolean;
  modalContainerClassName?: string;
  overlayClassName?: string;
  modalContainerStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
}

function Modal({
  children,
  id,
  closeOnOverlayClick = true,
  modalContainerClassName,
  overlayClassName,
  modalContainerStyle,
  overlayStyle,
}: Props) {
  const { openModalId } = useContext(ModalStateContext);
  const modalRoot = getModalRoot();

  return (
    openModalId === id &&
    createPortal(
      <Overlay
        closeOnOverlayClick={closeOnOverlayClick}
        overlayClassName={overlayClassName}
        overlayStyle={overlayStyle}
      >
        <ModalContainer
          modalContainerClassName={modalContainerClassName}
          modalContainerStyle={modalContainerStyle}
        >
          {children}
        </ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
}

export default Modal;
