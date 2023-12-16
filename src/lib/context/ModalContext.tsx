import { createContext, useState, useContext } from 'react';
import { ModalId } from '../types/ModalType';

interface ModalContextAction {
  openModal: (id: ModalId) => void;
  closeModal: () => void;
}

interface ModalContextState {
  openModalId: ModalId;
}

const ModalContext = createContext<ModalContextAction & ModalContextState>({
  openModal: () => {},
  closeModal: () => {},
  openModalId: null,
});

interface ProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ProviderProps) => {
  const [openModalId, setOpenModalId] = useState<ModalId>(null);
  const openModal = (id: ModalId) => setOpenModalId(id);
  const closeModal = () => setOpenModalId(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, openModalId }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal };
