import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { SettingWrapper, SettingWrapperProps } from './SettingWrapper';
import { Typography } from '../Typography';

const meta = {
  title: 'Composite-UI/SettingWrapper',
  component: SettingWrapper,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<SettingWrapperProps>;

export default meta;
type Story = StoryObj<SettingWrapperProps>;

export const Default: Story = {
  args: {
    label: 'Setting Title',
    mainAction: <Button variant="accent">Action Button</Button>,
    children: (
      <div className="rounded-md bg-red-300/50 h-[200px] w-full flex items-center justify-center">
        <Typography variant="body-medium">Setting Content</Typography>
      </div>
    ),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Setting Title',
    mainAction: <Button variant="accent">Action Button</Button>,
    children: (
      <div className="rounded-md bg-red-300/50 h-[200px] w-full flex items-center justify-center">
        <Typography variant="body-medium">Setting Content</Typography>
      </div>
    ),
  },
};
