import React, { useState } from 'react';
import { ModalController } from './ModalController';
import { ModalContext } from './ModalContext';
import GlobalModalContainer from '../components/GlobalModalContainer';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [controller] = useState(() => new ModalController());

  return (
    <ModalContext.Provider value={controller}>
      {children}
      <GlobalModalContainer />
    </ModalContext.Provider>
  );
};
