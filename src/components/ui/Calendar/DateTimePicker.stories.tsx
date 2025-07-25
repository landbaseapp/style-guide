import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from './DateTimePicker';
import { useState } from 'react';

const meta = {
  title: 'Components/Calendar/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: new Date(),
    setDate: (date: Date) => {
      console.log(date);
    },
  },
  render: (args) => {
    const Demo = () => {
      const [date, setDate] = useState<Date>(args.date ?? new Date());
      return <DateTimePicker date={date} setDate={setDate} />;
    };

    return <Demo />;
  },
};
