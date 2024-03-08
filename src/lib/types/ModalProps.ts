import { ModalId } from './ModalType';
import { ObjValues } from './ObjValues';
import { ANIMATION_TYPE } from '../constants/Animation';

interface CommonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.RefObject<HTMLDivElement>;
  onTransitionEnd: () => void;
  animationStyle: React.CSSProperties;
}

export interface OverlayProps extends CommonProps {
  onCloseModalClickOverlay:
    | ((e: React.MouseEvent<HTMLDivElement>) => void)
    | undefined;
}

export interface ModalContainerProps extends CommonProps {}

export interface ModalProps {
  children: React.ReactNode;
  id: Exclude<ModalId, null>;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  modalContainerClassName?: string;
  overlayClassName?: string;
  modalContainerStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  modalContainerRef?: React.RefObject<HTMLDivElement>;
  overlayRef?: React.RefObject<HTMLDivElement>;
  animationType?: ObjValues<typeof ANIMATION_TYPE>;
  animationDuration?: number;
}
