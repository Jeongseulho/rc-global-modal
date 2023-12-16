import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Modal, useModal } from './lib';

function App() {
  const { openModal, closeModal } = useModal();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={closeModal}>Close Modal</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          <button onClick={() => openModal(1)}>Open Modal</button>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Modal id={1}>
        <div>
          <h1>Modal</h1>
          <p>Modal content</p>
        </div>
      </Modal>
    </>
  );
}

export default App;
