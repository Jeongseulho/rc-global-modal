import getModalPortal from '../portal/getModalPortal';
import ReactDOM from 'react-dom';
import Overlay from './Overlay';
import Content from './Content';

function Modal() {
  const modalPortal = getModalPortal();
  return ReactDOM.createPortal(
    <Overlay>
      <Content />
    </Overlay>,
    modalPortal,
  );
}

export default Modal;
