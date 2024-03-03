import { ModalId } from './ModalType';
import { AnimationDuration } from './Animation';
import { ANIMATION_TYPE } from './Animation';
import { ObjValues } from './ObjValues';

export interface OverlayProps {
  children: React.ReactNode;
  onCloseModalClickOverlay:
    | ((e: React.MouseEvent<HTMLDivElement>) => void)
    | undefined;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  overlayRef?: React.RefObject<HTMLDivElement>;
  onTransitionEnd: () => void;
  animationTrigger: boolean;
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
  animationType: ObjValues<typeof ANIMATION_TYPE>;
  animationDuration: AnimationDuration;
}
