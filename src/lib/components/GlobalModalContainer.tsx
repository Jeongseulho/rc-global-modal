import React, { useEffect, useReducer } from 'react';
import { useModal } from '../hooks/useModal';
import AnimatedModalWrapper from './AnimatedModalWrapper';

const GlobalModalContainer = () => {
  const modal = useModal();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    modal.setRender(forceUpdate);
  }, [modal]);

  return (
    <>
      {modal.stack.map((modalItem) => (
        <AnimatedModalWrapper
          key={modalItem.key}
          modalItem={modalItem}
          controller={modal}
        />
      ))}
    </>
  );
};

export default GlobalModalContainer;
