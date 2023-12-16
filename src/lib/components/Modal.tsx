import getModalPortal from '../portal/getModalPortal';
import { createPortal } from 'react-dom';
import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useModal } from '../context/ModalContext';

interface Props {
  id: string | number;
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
