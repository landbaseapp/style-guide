import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'select', options: ['checked', 'unchecked', 'indeterminate'] },
    disabled: { control: 'boolean' },
    label: { control: 'text', defaultValue: undefined },
  },
  args: {
    checked: false,
    disabled: false,
    label: 'Label',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Interactive: Story = {
  render: () => {
    const InteractiveCheckbox = () => {
      const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);

      const onClick = () => {
        setChecked((prev) => {
          if (prev === false) return 'indeterminate';
          if (prev === 'indeterminate') return true;
          return false;
        });
      };

      return <Checkbox checked={checked} onClick={onClick} label={`state: ${checked}`} />;
    };
    return <InteractiveCheckbox />;
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    label: undefined,
  },
};

export const CheckedWithLabel: Story = {
  args: {
    checked: true,
    label: 'Label',
  },
};

export const Indeterminate: Story = {
  args: {
    checked: 'indeterminate',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};
