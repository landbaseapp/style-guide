import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    className?: string;
    onValueChange?: (value: number[]) => void;
    value?: number[];
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      value={value}
      onPointerDown={() => setIsDragging(true)}
      onPointerUp={() => setIsDragging(false)}
      onValueChange={onValueChange}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb
        className={cn(
          'block h-md w-md rounded-full border border-outline-variant bg-surface-container transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline disabled:pointer-events-none disabled:opacity-50'
        )}
      >
        <Typography
          variant="body-small"
          className={cn(
            'absolute top-lg -left-xs max-w-[200px] whitespace-normal overflow-hidden',
            'rounded-xs bg-surface-inverse text-on-surface-inverse px-xs py-0',
            isDragging ? 'visible' : 'invisible'
          )}
        >
          {value}
        </Typography>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
