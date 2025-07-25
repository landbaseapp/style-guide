import type { Meta, StoryObj } from '@storybook/react';
import { SegmentPicker } from './SegmentPicker';
import { useState } from 'react';

const meta: Meta<typeof SegmentPicker> = {
  title: 'Components/SegmentPicker',
  component: SegmentPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The SegmentPicker component adapts to its parent container width (width: 100%) and evenly distributes the width among its option items. For example, if there are 2 options, each option will take up 50% of the available width.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    value: { control: 'text' },
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentPicker>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ width: '600px' }}>
        <SegmentPicker {...args} value={value} onClick={(newValue) => setValue(newValue)} />
      </div>
    );
  },
  args: {
    options: defaultOptions,
    value: 'option1',
    disabled: false,
  },
};

export const TwoOptions: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ width: '400px' }}>
        <SegmentPicker {...args} value={value} onClick={(newValue) => setValue(newValue)} />
      </div>
    );
  },
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    value: 'option1',
    disabled: false,
  },
};

export const LongLabels: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ width: '600px' }}>
        <SegmentPicker {...args} value={value} onClick={(newValue) => setValue(newValue)} />
      </div>
    );
  },
  args: {
    options: [
      { value: 'option1', label: 'This is a very long option label' },
      {
        value: 'option2',
        label:
          'Another long option label Another long option label Another long option label Another long option label Another long option label',
      },
      { value: 'option3', label: 'Yet another long option label' },
    ],
    value: 'option1',
    disabled: false,
  },
};
