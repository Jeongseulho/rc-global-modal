import getModalPortal from './portal/getModalPortal';
import ReactDOM from 'react-dom';
import Overlay from './components/Overlay';
import Content from './components/Content';

function App() {
  const modalPortal = getModalPortal();
  return ReactDOM.createPortal(
    <Overlay>
      <Content />
    </Overlay>,
    modalPortal,
  );
}

export default App;
