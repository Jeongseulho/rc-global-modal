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
  },
} satisfies Meta<typeof ModalInteraction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalInteractionExample: Story = {
  args: {
    closeOnOverlayClick: true,
  },
};
