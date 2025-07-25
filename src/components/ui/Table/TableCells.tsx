import { Avatar, AvatarFallback } from '../Avatar';
import { CustomTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ToolTip';
import { Typography, TypographyVariant } from '../Typography';
import { truncate } from 'lodash';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { useState, useEffect, useRef, useCallback } from 'react';

const EXPANDED_LENGTH_MULTIPLIER = 5;

export const TruncatedToolTipCell = ({
  items,
  limit,
  variant,
  className,
}: {
  items: string;
  limit: number;
  variant?: TypographyVariant;
  className?: string;
}) => {
  if (items && items?.length > limit) {
    return (
      <TooltipProvider delayDuration={100}>
        <CustomTooltip>
          <TooltipTrigger asChild>
            <Typography variant={variant ?? 'body-medium'} className={className}>
              {truncate(items, { length: limit })}
            </Typography>
          </TooltipTrigger>
          <TooltipContent className="w-full max-w-[500px]" side="bottom">
            <Typography variant="body-small" className="text-on-surface-inverse text-pretty">
              {truncate(items, { length: limit * EXPANDED_LENGTH_MULTIPLIER })}
            </Typography>
          </TooltipContent>
        </CustomTooltip>
      </TooltipProvider>
    );
  }

  return <Typography variant="body-medium">{items}</Typography>;
};

const MOUSE_ENTER_DELAY = 500;

export const TruncatedPopoverCell = ({ items }: { items: string }) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleTimeout = (shouldOpen: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpen(shouldOpen);
    }, MOUSE_ENTER_DELAY);
  };

  const handleMouseEnter = () => handleTimeout(true);
  const handleMouseLeave = () => handleTimeout(false);

  const checkTextHeightOverflow = useCallback(() => {
    const textCell = textRef.current;
    if (!textCell) return;

    const isTextOverflowing = textCell.scrollHeight > textCell.clientHeight;
    setIsOverflowed(isTextOverflowing);
  }, []);

  useEffect(() => {
    checkTextHeightOverflow();

    const observer = new ResizeObserver(checkTextHeightOverflow);
    if (textRef.current) observer.observe(textRef.current);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [checkTextHeightOverflow]);

  return (
    <Popover open={open && isOverflowed} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          ref={cellRef}
          className="w-full h-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Typography
            ref={textRef}
            variant="body-medium"
            className="text-pretty text-on-surface-variant whitespace-pre-line line-clamp-2"
          >
            {items}
          </Typography>
        </div>
      </PopoverTrigger>

      <PopoverContent
        side="bottom"
        align="start"
        className="p-xs"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          minWidth: cellRef.current?.offsetWidth,
          maxHeight: 200,
          overflow: 'auto',
          transform: `translateY(-${cellRef.current?.offsetHeight}px)`,
          position: 'absolute',
          top: 0,
          left: -100,
          marginLeft: 0,
        }}
      >
        <Typography variant="body-medium" className="text-pretty text-on-surface-variant">
          {items}
        </Typography>
      </PopoverContent>
    </Popover>
  );
};

export const AvatarCell = ({ word, subtext }: { word: string | null; subtext?: string | null }) => {
  if (!word || word.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-md">
      <Avatar size="lg">
        <AvatarFallback>{word[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2xs">
        <Typography variant="body-medium">{word}</Typography>
        {subtext && <Typography variant="body-small">{subtext}</Typography>}
      </div>
    </div>
  );
};
