import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: {
    max: 100,
    min: 0,
    step: 1,
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const FullExample: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<number[]>([0]);
      return (
        <div className="flex flex-col gap-md">
          <Slider {...args} value={value} onValueChange={setValue} />
          <p>Value: {value}</p>
        </div>
      );
    };

    return <Example />;
  },
};
