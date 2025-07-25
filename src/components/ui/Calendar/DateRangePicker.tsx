import { format, subDays, subWeeks } from 'date-fns';
import { type DateRange } from 'react-day-picker';
import { Calendar } from '.';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover';
import { cn } from 'src/utils/tw.utils';
import { getHours, getMilliseconds, getMinutes, getSeconds, set } from 'date-fns';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StandaloneSelectItem,
} from '../Select';
import { CalendarBlank } from '@phosphor-icons/react';
import { Typography } from '../Typography';

const DATE_FORMAT = 'LLL dd';

const enum DATE_LABEL {
  WEEK = '1-week',
  MONTH = '28-days',
  QUARTER = '90-days',
  ALL_TIME = 'all-time',
  CUSTOM = 'custom',
}

export type DateRangePickerProps = {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  dateRange: DateRange | undefined;
  label?: string;
  onDateRangeChange: Dispatch<SetStateAction<DateRange | undefined>>;
} & React.HTMLAttributes<HTMLDivElement>;

export function DateRangePicker({
  className,
  placeholder = 'Select Dates',
  dateRange,
  disabled,
  label,
  onDateRangeChange,
}: DateRangePickerProps) {
  const [isCustom, setIsCustom] = useState(false);

  const [dateRangeLabel, setDateRangeLabel] = useState<DATE_LABEL>(DATE_LABEL.ALL_TIME);

  useEffect(() => {
    const initialLabel = (() => {
      if (!dateRange?.from || !dateRange?.to) return DATE_LABEL.ALL_TIME;

      const diffInMs = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());

      if (diffInMs === 7 * 24 * 60 * 60 * 1000) {
        return DATE_LABEL.WEEK;
      }
      if (diffInMs === 28 * 24 * 60 * 60 * 1000) {
        return DATE_LABEL.MONTH;
      }
      if (diffInMs === 90 * 24 * 60 * 60 * 1000) {
        return DATE_LABEL.QUARTER;
      }
      return DATE_LABEL.CUSTOM;
    })();
    setDateRangeLabel(initialLabel);
    setIsCustom(initialLabel === DATE_LABEL.CUSTOM);
  }, [dateRange]);

  function setTimeToNow(date: Date | undefined): Date | undefined {
    if (!date) return;
    const now = new Date();
    return set(date, {
      hours: getHours(now),
      minutes: getMinutes(now),
      seconds: getSeconds(now),
      milliseconds: getMilliseconds(now),
    });
  }

  /**
   * By default, the dateRange will have its timestamp set to 00:00:00. This function is a wrapper
   * around the onDateRangeChange function that sets the time to the current time.
   *
   * @param dateRange
   */
  function onDateRangeChangeWrapper(setStateAction: SetStateAction<DateRange | undefined>) {
    if (typeof setStateAction === 'function') {
      onDateRangeChange((prevState) => {
        const dateRange = setStateAction(prevState);
        return (
          dateRange && {
            from: setTimeToNow(dateRange.from),
            to: setTimeToNow(dateRange.to),
          }
        );
      });
    } else {
      const dateRange = setStateAction && {
        from: setTimeToNow(setStateAction.from),
        to: setTimeToNow(setStateAction.to),
      };
      onDateRangeChange(dateRange);
    }
  }

  function onPresetChange(value: string) {
    const now = new Date();
    let newDateRange: DateRange | undefined = {
      from: now,
      to: now,
    };

    switch (value) {
      case '1-week':
        newDateRange.from = subWeeks(now, 1);
        break;
      case '2-week':
        newDateRange.from = subWeeks(now, 2);
        break;
      case '28-days':
        newDateRange.from = subDays(now, 28);
        break;
      case '90-days':
        newDateRange.from = subDays(now, 90);
        break;
      case 'all-time':
        newDateRange = undefined;
        break;
      case 'custom':
        newDateRange = {
          from: now,
          to: now,
        };
        break;
      default:
        throw new Error(`Invalid value: ${value}`);
    }

    setIsCustom(value === DATE_LABEL.CUSTOM);
    onDateRangeChangeWrapper(newDateRange);
  }

  return (
    <div className={cn('flex flex-col gap-2xs', className)}>
      {label && (
        <Typography variant="label-medium" className="text-on-surface-variant">
          {label}
        </Typography>
      )}

      <Select
        disabled={disabled}
        onValueChange={(value) => {
          onPresetChange(value);
          setDateRangeLabel(value as DATE_LABEL);
        }}
        value={!dateRange?.from && !dateRange?.to ? 'all-time' : dateRangeLabel}
      >
        <SelectTrigger className="w-full flex-auto">
          <SelectValue placeholder={dateRange ? 'Custom' : 'All time'} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value={DATE_LABEL.WEEK}>Last 7 days</SelectItem>
          <SelectItem value={DATE_LABEL.MONTH}>Last 28 days</SelectItem>
          <SelectItem value={DATE_LABEL.QUARTER}>Last 90 days</SelectItem>
          <SelectItem value={DATE_LABEL.ALL_TIME}>All time</SelectItem>
          <SelectItem value={DATE_LABEL.CUSTOM}>Custom</SelectItem>
        </SelectContent>
      </Select>
      {isCustom && (
        <Popover modal={false}>
          <PopoverTrigger asChild>
            <StandaloneSelectItem
              className={cn(
                'w-full first-line:grow justify-start -ml-[2px]',
                !dateRange && 'text-muted-foreground'
              )}
              icon={<CalendarBlank size={16} />}
            >
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, DATE_FORMAT)} - {format(dateRange.to, DATE_FORMAT)}
                  </>
                ) : (
                  format(dateRange.from, `'After ' ${DATE_FORMAT}`)
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </StandaloneSelectItem>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-lg space-y-lg" align="start">
            <Calendar
              disabled={disabled}
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={(v) => {
                setTimeout(() => {
                  onDateRangeChangeWrapper(v);
                }, 10);
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
