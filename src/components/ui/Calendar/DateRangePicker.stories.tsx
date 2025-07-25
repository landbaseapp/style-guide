import type { Meta, StoryObj } from '@storybook/react';
import { DateRangePicker } from './DateRangePicker';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { fn } from '@storybook/test';

const meta = {
  title: 'Components/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: { placeholder: { control: 'text' } },
  tags: ['autodocs'],
} satisfies Meta<typeof DateRangePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select date range',
    dateRange: undefined,
    onDateRangeChange: fn(),
  },
  render: (args) => {
    const Example = () => {
      const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

      return (
        <div className="w-[300px]">
          <DateRangePicker {...args} dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>
      );
    };

    return <Example />;
  },
};
