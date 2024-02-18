import type { Meta, StoryObj } from '@storybook/react';

import { ModalStyle } from './ModalStyle';

const meta = {
  title: 'Modal Style',
  component: ModalStyle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    modalContainerStyle: {
      control: 'object',
      description: 'Styles for the modal container',
    },
    overlayStyle: {
      control: 'object',
      description: 'Styles for the modal overlay',
    },
  },
} satisfies Meta<typeof ModalStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalStyleExample: Story = {
  args: {
    modalContainerStyle: {},
    overlayStyle: {},
  },
};
