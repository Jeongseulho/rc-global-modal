import type { Meta, StoryObj } from '@storybook/react';

import { ModalStyle } from './ModalStyle';

const meta = {
  title: 'Modal Style',
  component: ModalStyle,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
} satisfies Meta<typeof ModalStyle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalStyleExample: Story = {};
