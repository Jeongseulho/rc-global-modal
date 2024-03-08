import type { Meta, StoryObj } from '@storybook/react';

import { ModalInteraction } from './ModalInteraction';

const meta = {
  title: 'Modal Interaction',
  component: ModalInteraction,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close the modal when the overlay is clicked',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Close the modal when the escape key is pressed',
    },
    animationType: {
      control: {
        type: 'select',
        options: [
          'fade',
          'slide-up',
          'slide-down',
          'slide-left',
          'slide-right',
          'zoom',
        ],
      },
      description:
        'The type of animation to use when the modal opens and closes',
    },
  },
} satisfies Meta<typeof ModalInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalInteractionExample: Story = {
  args: {
    closeOnOverlayClick: true,
    closeOnEsc: true,
    animationType: 'fade',
  },
};
