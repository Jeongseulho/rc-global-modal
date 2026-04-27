import type { Meta, StoryObj } from '@storybook/react';

import { ModalStack } from './ModalStack';

const meta = {
  title: 'Modal Stack',
  component: ModalStack,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ModalStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalStackExample: Story = {};
