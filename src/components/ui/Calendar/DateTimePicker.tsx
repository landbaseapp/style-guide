import * as React from 'react';
import { Calendar as CalendarIcon } from '@phosphor-icons/react';

import { cn } from 'src/utils/tw.utils';
import { Button } from 'src/components/ui/Button';
import { Calendar } from 'src/components/ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/Popover';
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'MM/DD/YYYY hh:mm A';
export function DateTimePicker({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute' | 'meridiem', value: string) => {
    if (date) {
      const newDate = new Date(date);
      if (type === 'hour') {
        const currentMeridiem = newDate.getHours() >= 12 ? 'PM' : 'AM';
        const parsedHour = parseInt(value);
        const newHour = currentMeridiem === 'PM' ? (parsedHour % 12) + 12 : parsedHour % 12;
        newDate.setHours(newHour);
      } else if (type === 'minute') {
        newDate.setMinutes(parseInt(value));
      } else if (type === 'meridiem') {
        const currentHours = newDate.getHours();
        const currentMeridiem = currentHours >= 12 ? 'PM' : 'AM';
        if (currentMeridiem !== value) {
          newDate.setHours(currentHours + (value === 'PM' ? 12 : -12));
        }
      }
      setDate(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal rounded-md',
            !date && 'text-on-surface-variant'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>{date ? dayjs(date).format(DATE_TIME_FORMAT) : 'MM/DD/YYYY hh:mm AM'}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            className="py-lg"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <div className="w-64 sm:w-auto overflow-y-auto">
              <div className="flex sm:flex-col p-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="sm"
                    variant={date && (date.getHours() % 12 || 12) === hour ? 'primary' : 'ghost'}
                    className="sm:w-full shrink-0 aspect-square rounded-md"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-64 sm:w-auto overflow-y-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 4 }, (_, i) => i * 15).map((minute) => (
                  <Button
                    key={minute}
                    size="sm"
                    variant={date && date.getMinutes() === minute ? 'primary' : 'ghost'}
                    className="sm:w-full shrink-0 aspect-square rounded-md"
                    onClick={() => handleTimeChange('minute', minute.toString())}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </div>
            <div className="w-64 sm:w-auto overflow-y-auto">
              <div className="flex sm:flex-col p-2">
                {['AM', 'PM'].map((meridiem) => (
                  <Button
                    key={meridiem}
                    size="sm"
                    variant={
                      date && (date.getHours() >= 12 ? 'PM' : 'AM') === meridiem
                        ? 'primary'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square rounded-md"
                    onClick={() => handleTimeChange('meridiem', meridiem)}
                  >
                    {meridiem}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
