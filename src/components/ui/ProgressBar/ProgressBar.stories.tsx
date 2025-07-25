import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, ProgressBarProps } from './ProgressBar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    mode: {
      control: 'select',
      options: ['hidden', 'below', 'front'],
    },
    type: {
      control: 'select',
      options: ['determinate', 'indeterminate'],
    },
    progressPercentage: { control: { type: 'range', min: 0, max: 100, step: 5 } },
  },
  args: {
    progressPercentage: 50,
    size: 'md',
    mode: 'hidden',
  },
} satisfies Meta<ProgressBarProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressBarVariants: Story = {
  render: (args) => (
    <div className="space-y-6 p-4">
      <h3 className="text-sm font-medium leading-none">Progress Bar</h3>
      <p className="text-sm text-muted-foreground">
        Different sizes and modes of progress bars with proper spacing.
      </p>

      <div className="space-y-8">
        <h4 className="text-xs font-medium">50% Progress</h4>
        {['hidden', 'below', 'front'].map((mode) => (
          <div key={mode} className="flex flex-col space-y-1">
            <span className="text-xs text-gray-500">md - {mode}</span>
            <ProgressBar {...args} mode={mode as ProgressBarProps['mode']} />
          </div>
        ))}
      </div>

      <div className="space-y-8">
        <h3 className="text-sm font-medium">Indeterminate Progress</h3>
        <ProgressBar {...args} type="indeterminate" />
      </div>
    </div>
  ),
};

export const ProgressBarDemo: Story = {
  args: {
    progressPercentage: 60,
    size: 'md',
    mode: 'below',
  },
  render: (args) => (
    <div className="w-[300px] space-y-2">
      <h4 className="text-sm font-medium">Progress: {args.progressPercentage}%</h4>
      <ProgressBar {...args} />
    </div>
  ),
};
