import getModalPortal from './portal/getModalPortal';
import ReactDOM from 'react-dom';

function App() {
  const modalPortal = getModalPortal();
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">테스트</div>
    </div>,
    modalPortal,
  );
}

export default App;
