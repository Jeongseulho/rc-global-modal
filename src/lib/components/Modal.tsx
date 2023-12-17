import Overlay from './Overlay';
import ModalContainer from './ModalContainer';
import { useContext } from 'react';
import { ModalStateContext } from '../context/ModalContext';

interface Props {
  id: string | number;
  children: React.ReactNode;
}

function Modal({ children, id }: Props) {
  const { openModalId } = useContext(ModalStateContext);

  return (
    openModalId === id && (
      <Overlay>
        <ModalContainer>{children}</ModalContainer>
      </Overlay>
    )
  );
}

export default Modal;
