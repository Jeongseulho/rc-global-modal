import { createContext } from 'react';
import { ModalController } from './ModalController';

export const ModalContext = createContext<ModalController | null>(null);
