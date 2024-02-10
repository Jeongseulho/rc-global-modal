import { createContext, useState, useContext, useMemo } from 'react';
import { ModalId } from '../types/ModalType';

interface ModalContextAction {
  openModal: (id: Exclude<ModalId, null>) => void;
  closeModal: () => void;
}

interface ModalContextState {
  openModalId: ModalId;
}

const ModalActionContext = createContext<ModalContextAction>({
  openModal: () => {},
  closeModal: () => {},
});

const ModalStateContext = createContext<ModalContextState>({
  openModalId: null,
});

interface ProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ProviderProps) => {
  const [openModalId, setOpenModalId] = useState<ModalId>(null);

  const actions = useMemo(
    () => ({
      openModal(id: Exclude<ModalId, null>) {
        setOpenModalId(id);
      },
      closeModal() {
        setOpenModalId(null);
      },
    }),
    [],
  );

  return (
    <ModalActionContext.Provider value={actions}>
      <ModalStateContext.Provider value={{ openModalId }}>
        {children}
      </ModalStateContext.Provider>
    </ModalActionContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalActionContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export { ModalProvider, useModal, ModalStateContext };
