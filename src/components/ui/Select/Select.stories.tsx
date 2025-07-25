import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select';
import { User } from '@phosphor-icons/react';
import React from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const optionGroups = [
  {
    label: 'Option Digit 1',
    options: [
      {
        value: 'option1',
        label: 'short label1',
        selected: false,
        disabled: false,
        icon: <User size={16} />,
      },
      { value: 'option2', label: 'short label2', selected: true, disabled: false },
      { value: 'option3', label: 'short label3', selected: true, disabled: true },
      { value: 'option4', label: 'short label4', selected: false, disabled: true },
      { value: 'option5', label: 'short label5', selected: false, disabled: false },
      {
        value: 'option6',
        label: 'long label long label long label long label 666666',
        selected: false,
        disabled: false,
      },
    ],
  },
  {
    label: 'Option Digit 2',
    options: Array.from({ length: 8 }, (_, i) => ({
      value: `option1${i}`,
      label: `short label1${i}`,
      selected: false,
      disabled: false,
    })),
  },
];

export const SelectStory: Story = {
  render: () => {
    const SelectDemo = () => {
      const triggerRef = React.useRef<HTMLButtonElement | null>(null);

      return (
        <Select>
          <SelectTrigger className="w-[280px]" triggerRef={triggerRef}>
            <SelectValue placeholder="Select an option." />
          </SelectTrigger>
          <SelectContent triggerRef={triggerRef}>
            {optionGroups.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.options.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    selected={item.selected}
                    disabled={item?.disabled}
                    icon={item?.icon}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      );
    };
    return <SelectDemo />;
  },
};
