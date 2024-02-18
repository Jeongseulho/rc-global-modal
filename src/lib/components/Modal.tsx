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
}

function Modal({
  children,
  id,
  closeOnOverlayClick = true,
  modalContainerClassName,
  overlayClassName,
}: Props) {
  const { openModalId } = useContext(ModalStateContext);
  const modalRoot = getModalRoot();

  return (
    openModalId === id &&
    createPortal(
      <Overlay
        closeOnOverlayClick={closeOnOverlayClick}
        overlayClassName={overlayClassName}
      >
        <ModalContainer modalContainerClassName={modalContainerClassName}>
          {children}
        </ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
}

export default Modal;
