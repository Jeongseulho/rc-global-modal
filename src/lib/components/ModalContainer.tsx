import { css } from '@emotion/react';
import { ModalContainerProps } from '../types/ModalProps';

const ModalContainer = ({
  children,
  className,
  style,
  ref,
  onTransitionEnd,
  animationStyle,
}: ModalContainerProps) => {
  return (
    <div
      css={css({
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        ...animationStyle,
        ...style,
      })}
      className={className}
      ref={ref}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
