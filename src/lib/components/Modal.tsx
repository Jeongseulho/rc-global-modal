import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useContext } from 'react';
import { ModalStateContext } from '../context/ModalContext';
import { createPortal } from 'react-dom';
import getModalRoot from '../utils/getModalRoot';

interface Props {
  id: string | number;
  children: React.ReactNode;
}

function Modal({ children, id }: Props) {
  const { openModalId } = useContext(ModalStateContext);
  const modalRoot = getModalRoot();

  return (
    openModalId === id &&
    createPortal(
      <Overlay>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>,
      modalRoot,
    )
  );
}

export default Modal;
