import getModalPortal from '../portal/getModalPortal';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { ModalId } from '../types/ModalType';
import { useModal } from '../context/ModalContext';

interface Props {
  id: ModalId;
  children: React.ReactNode;
}

function Modal({ children, id }: Props) {
  const modalPortal = getModalPortal();
  const { openModalId } = useModal();

  return openModalId === id
    ? createPortal(
        <Overlay>
          <ModalContainer>{children}</ModalContainer>
        </Overlay>,
        modalPortal,
      )
    : null;
}

export default Modal;
