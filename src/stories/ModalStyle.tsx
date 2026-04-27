import React, { useEffect } from 'react';
import { useModal } from '../lib/index';
import { ModalOptions } from '../lib/types/ModalProps';

type Props = Pick<ModalOptions, 'modalContainerStyle' | 'overlayStyle'>;

export const ModalStyle = ({ modalContainerStyle, overlayStyle }: Props) => {
  const modal = useModal();

  useEffect(() => {
    // Clear any existing modals to avoid stacking in Storybook
    modal.clear();
    
    modal.push({
      key: 'modal-id',
      options: {
        modalContainerStyle,
        overlayStyle,
      },
      Component: () => (
        <div>
          <h1>Modal Content</h1>
        </div>
      ),
      props: {}
    });
  }, [modal, modalContainerStyle, overlayStyle]);

  return <></>;
};
