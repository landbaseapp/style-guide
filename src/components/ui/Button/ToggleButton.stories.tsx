import type { Meta, StoryObj } from '@storybook/react';
import { PlusCircle } from '@phosphor-icons/react';
import { ToggleButton, ToggleButtonProps } from './ToggleButton';
import { useState } from 'react';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
  },
  args: {
    selected: false,
    size: 'md',
  },
} satisfies Meta<ToggleButtonProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleButtonStory: Story = {
  render: (args) => (
    <div className="space-y-8 p-6">
      <h4 className="text-sm mb-5">Selected</h4>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          <ToggleButton icon={PlusCircle} {...args} selected={true} />
        </div>
      </div>
      <h4 className="text-sm mb-5">Unselected</h4>
      <div className="flex gap-6">
        <div className="flex flex-col items-center gap-1">
          <ToggleButton icon={PlusCircle} {...args} selected={false} />
        </div>
      </div>
    </div>
  ),
};

export const InteractiveToggleButtonStory: Story = {
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState(false);
      return (
        <div className="space-y-8 p-6">
          <ToggleButton
            icon={PlusCircle}
            selected={selected}
            onClick={() => setSelected(!selected)}
          />
        </div>
      );
    };
    return <Example />;
  },
};
