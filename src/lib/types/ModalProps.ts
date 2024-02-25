import { ModalId } from './ModalType';

export interface OverlayProps {
  children: React.ReactNode;
  onCloseModalClickOverlay:
    | ((e: React.MouseEvent<HTMLDivElement>) => void)
    | undefined;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayRef?: React.RefObject<HTMLDivElement>;
}

export interface ModalContainerProps {
  children: React.ReactNode;
  modalContainerClassName?: string;
  modalContainerStyle?: React.CSSProperties;
  modalContainerRef?: React.RefObject<HTMLDivElement>;
}

export interface ModalProps
  extends Omit<OverlayProps, 'onCloseModalClickOverlay'>,
    ModalContainerProps {
  id: Exclude<ModalId, null>;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}
