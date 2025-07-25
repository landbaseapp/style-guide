import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, RocketLaunch } from '@phosphor-icons/react';
import { fn } from '@storybook/test';
import { StepsActionBar } from './ActionBar';

const meta = {
  title: 'Composite-UI/ActionBar',
  component: StepsActionBar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StepsActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiStepExample: Story = {
  args: {
    steps: { current: 1, total: 3 },
    label: 'Basic Information',
    onCancel: fn(),
    onSaveDraft: fn(),
  },
  render: () => (
    <div className="flex flex-col gap-lg">
      <StepsActionBar
        steps={{ current: 1, total: 3 }}
        label="Choose your target"
        onCancel={fn()}
        onSaveDraft={fn()}
        next={{
          label: 'Design your campaign',
          icon: ArrowRight,
          onClick: fn(),
          buttonVariant: 'primary',
        }}
      />

      <StepsActionBar
        steps={{ current: 2, total: 3 }}
        label="Define campaign strategy"
        onBack={fn()}
        onSaveDraft={fn()}
        next={{
          label: 'Review campaign',
          icon: ArrowRight,
          onClick: fn(),
          buttonVariant: 'primary',
        }}
      />

      <StepsActionBar
        steps={{ current: 3, total: 3 }}
        label="Review examples of messages"
        onBack={fn()}
        onSaveDraft={fn()}
        next={{
          label: 'Start Campaign',
          icon: RocketLaunch,
          onClick: fn(),
          buttonVariant: 'accent',
        }}
      />
    </div>
  ),
};
