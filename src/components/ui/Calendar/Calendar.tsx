import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { buttonVariants, iconButtonSizes } from '../Button';
import { cn } from 'src/utils/tw.utils';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  className?: string;
  // see example in Calendar.stories.tsx for how to use
  mode?: 'single' | 'range';
};

function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={true}
      className={cn(className, 'bg-surface-container')}
      classNames={{
        months: 'flex flex-row space-y-md customtext-label-large',
        month: 'flex flex-col gap-md',
        caption: 'flex justify-center pt-2xs relative items-center text-primary',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'ghost' }), iconButtonSizes.sm, 'p-0 p-xs'),
        nav_button_previous: 'absolute left-2xs',
        nav_button_next: 'absolute right-2xs',
        table: 'w-full border-collapse space-y-2xs',
        head_row: 'flex',
        head_cell: 'text-on-surface-muted customtext-body-small rounded-sm w-xl',
        row: 'flex w-full mt-xs',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
          // selected colors
          '[&:has([aria-selected])]:bg-primary-container [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? // control rounded corners for range selection
              '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-xl w-xl p-0 customtext-body-medium rounded-sm hover:bg-state-layer-low'
        ),
        day_range_start: cn(
          'day-range-start aria-selected:text-on-primary',
          'hover:bg-primary hover:text-on-primary',
          'focus:bg-primary focus:text-on-primary'
        ),
        day_range_end: cn(
          'day-range-end aria-selected:text-on-primary',
          'hover:bg-primary hover:text-on-primary',
          'focus:bg-primary focus:text-on-primary'
        ),
        day_selected: cn(
          'bg-primary text-on-primary',
          // we need this to override the default text color
          'aria-selected:bg-primary aria-selected:text-on-primary',
          'hover:bg-primary hover:text-on-primary',
          'focus:bg-primary focus:text-on-primary'
        ),
        day_today: 'border border-outline',
        day_outside: 'day-outside text-on-surface-muted opacity-50',
        day_disabled: 'text-on-surface-muted opacity-50 cursor-not-allowed pointer-events-none',
        day_range_middle: cn(
          'bg-primary-container text-on-primary-container',
          // we need this to override the default text color
          'aria-selected:bg-primary-container aria-selected:text-on-primary-container'
        ),
        day_hidden: 'invisible',
      }}
      components={{
        IconLeft: (props) => <CaretLeft size={16} {...props} />,
        IconRight: (props) => <CaretRight size={16} {...props} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
