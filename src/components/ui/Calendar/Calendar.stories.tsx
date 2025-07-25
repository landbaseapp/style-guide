import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';
import { Typography } from '../Typography/Typography';
import React from 'react';
import { DateRange } from 'react-day-picker';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Calendar component uses props from react-day-picker, which has complicated typing not suitable for storybook. See example code for how to use.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Interactive: Story = {
  render: () => {
    const InteractiveCalendar = () => {
      // IMPORTANT: MUST use Date for mode=single
      const [date, setDate] = React.useState<Date | undefined>(new Date());

      return (
        <div className="flex flex-col gap-2">
          <Calendar selected={date} mode="single" onSelect={setDate} />
          <Typography variant="body-small">Selected Date: {date?.toLocaleDateString()}</Typography>
        </div>
      );
    };
    return <InteractiveCalendar />;
  },
};

export const InteractiveDateRange: Story = {
  render: () => {
    const InteractiveCalendar = () => {
      // IMPORTANT: MUST use DateRange for mode=range
      const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(new Date().setDate(new Date().getDate() + 5)),
      });

      return (
        <div className="flex flex-col gap-2">
          <Calendar selected={dateRange} mode="range" onSelect={setDateRange} />
          <Typography variant="body-small">
            Selected Date Range: {dateRange?.from?.toLocaleDateString()} -{' '}
            {dateRange?.to?.toLocaleDateString()}
          </Typography>
        </div>
      );
    };
    return <InteractiveCalendar />;
  },
};

export const WithDateRange: Story = {
  render: () => {
    const dateRange = {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 5)),
    };

    return (
      <div>
        <Calendar selected={dateRange} mode="range" />
        <Typography variant="body-small">
          Selected Date Range: {dateRange.from.toLocaleDateString()} -{' '}
          {dateRange.to.toLocaleDateString()}
        </Typography>
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  args: {
    disabled: [{ from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 1)) }],
  },
};
