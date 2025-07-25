import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './Radio';
import { useState } from 'react';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    defaultValue: { control: 'text' },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <RadioGroup {...args}>
        <RadioGroupItem value="option-1" id="option-1" label="Option 1" />
        <RadioGroupItem value="option-2" id="option-2" label="Option 2" />
        <RadioGroupItem value="option-3" id="option-3" label="Option 3" />
      </RadioGroup>
    );
  },
};

export const UseState: Story = {
  render: () => {
    const RadioWithReact = () => {
      const [value, setValue] = useState('option-1');
      return (
        <div className="flex flex-col gap-2">
          <RadioGroup value={value} onValueChange={setValue}>
            <RadioGroupItem value="option-1" id="option-1" label="Option 1" />
            <RadioGroupItem value="option-2" id="option-2" label="Option 2" />
            <RadioGroupItem value="option-3" id="option-3" label="Option 3" />
          </RadioGroup>
          <Typography variant="body-small">state:{value}</Typography>
        </div>
      );
    };
    return <RadioWithReact />;
  },
};

export const ManyItems: Story = {
  render: () => {
    const RadioWithReact = () => {
      const values = [
        'option-1',
        'option-2',
        'option-3',
        'option-4',
        'option-5',
        'option-6',
        'option-7',
      ];
      return (
        <div className="flex flex-col gap-2">
          <RadioGroup>
            {values.map((value) => (
              <RadioGroupItem key={value} value={value} id={value} label={value} />
            ))}
          </RadioGroup>
        </div>
      );
    };
    return <RadioWithReact />;
  },
};

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" disabled {...args}>
      <RadioGroupItem value="option-1" id="disabled-1" label="Disabled Option 1" />
      <RadioGroupItem value="option-2" id="disabled-2" label="Disabled Option 2" />
    </RadioGroup>
  ),
};

export const WithCustomSpacing: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" className="grid gap-md" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="custom-1" />
        <label htmlFor="custom-1">Custom Spacing 1</label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="custom-2" />
        <label htmlFor="custom-2">Custom Spacing 2</label>
      </div>
    </RadioGroup>
  ),
};
