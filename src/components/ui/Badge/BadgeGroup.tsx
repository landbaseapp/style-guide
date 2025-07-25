import { Popover, PopoverContent } from 'src/components/ui/Popover';
import { useState, useRef, useEffect } from 'react';
import { Badge } from 'src/components/ui/Badge';
import { Button } from 'src/components/ui/Button';
import { PopoverTrigger } from '@radix-ui/react-popover';

const MAX_CHIP_ROWS = 2;

const CustomChip = ({
  label,
  isCapitalized = true,
}: {
  label: string;
  isCapitalized?: boolean;
}) => {
  return (
    <Badge
      variant="default"
      label={label}
      className="mx-2xs mb-2xs"
      isCapitalized={isCapitalized}
    />
  );
};

export const BadgeGroup = ({
  values = [],
  isCapitalized = true,
}: {
  values: string[];
  isCapitalized?: boolean;
}) => {
  const [firstRowChips, setFirstRowChips] = useState<string[]>([]);
  const [secondRowChips, setSecondRowChips] = useState<string[]>([]);
  const [hiddenChips, setHiddenChips] = useState<string[]>([]);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      if (
        (triggerRef.current && triggerRef.current.contains(event.target as Node)) ||
        (popoverRef?.current && popoverRef?.current.contains(event.target as Node))
      ) {
        return;
      }
      setOpen(false);
    };

    const timer = setTimeout(() => {
      if (open) {
        document.addEventListener('mousedown', handleDocumentClick);
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [open]);

  // Helper function to create a test chip element
  const createTestChip = (value: string) => {
    const chip = document.createElement('div');
    chip.innerText = value;
    chip.style.display = 'inline-flex';
    chip.style.alignItems = 'center';
    chip.style.whiteSpace = 'nowrap';
    chip.style.padding = '4px 12px';
    chip.style.margin = '4px';
    chip.style.border = '1px solid';
    chip.style.fontSize = '0.875rem';
    return chip;
  };

  const createShowAllButton = (count: number) => {
    const button = document.createElement('div');
    button.innerText = `Show all (${count})`;
    button.style.margin = '4px 8px';
    button.style.fontSize = '0.875rem';
    button.style.whiteSpace = 'nowrap';
    return button;
  };

  const isOnDifferentRow = (rect1: DOMRect, rect2: DOMRect, threshold = 5) => {
    return Math.abs(rect1.top - rect2.top) > threshold;
  };

  useEffect(() => {
    if (!values || values.length === 0) {
      setFirstRowChips([]);
      setSecondRowChips([]);
      setHiddenChips([]);
      return;
    }

    setTimeout(() => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth === 0) return;

      // Create test container to measure chip placement
      const testContainer = document.createElement('div');
      testContainer.style.visibility = 'hidden';
      testContainer.style.position = 'fixed';
      testContainer.style.width = `${containerWidth}px`;
      testContainer.style.display = 'flex';
      testContainer.style.flexWrap = 'wrap';
      document.body.appendChild(testContainer);

      try {
        const chipElements = values.map((value) => {
          const chip = createTestChip(value);
          testContainer.appendChild(chip);
          return chip;
        });

        const rowBoundaries = findRowBoundaries(chipElements);

        // If all chips fit in one or two rows, use that arrangement
        if (rowBoundaries.length <= MAX_CHIP_ROWS) {
          setFirstRowChips(
            rowBoundaries[0] ? values.slice(0, rowBoundaries[0].endIndex + 1) : values
          );
          setSecondRowChips(rowBoundaries[1] ? values.slice(rowBoundaries[0].endIndex + 1) : []);
          setHiddenChips([]);
        } else {
          testContainer.innerHTML = '';

          const row1 = values.slice(0, rowBoundaries[0].endIndex + 1);

          // Add potential second row chips
          const potentialRow2 = values.slice(
            rowBoundaries[0].endIndex + 1,
            rowBoundaries[1].endIndex + 1
          );

          const row2Elements = potentialRow2.map((value) => {
            const chip = createTestChip(value);
            testContainer.appendChild(chip);
            return chip;
          });

          const showAllButton = createShowAllButton(values.length);
          testContainer.appendChild(showAllButton);

          let secondFinalRow = potentialRow2;
          if (row2Elements.length > 0) {
            const lastChipRect = row2Elements[row2Elements.length - 1].getBoundingClientRect();
            const buttonRect = showAllButton.getBoundingClientRect();

            if (isOnDifferentRow(lastChipRect, buttonRect)) {
              secondFinalRow = findMaxChipsWithButton(
                potentialRow2,
                testContainer,
                createTestChip,
                createShowAllButton,
                values.length
              );
            }
          }

          const hidden = [
            ...potentialRow2.slice(secondFinalRow.length),
            ...values.slice(rowBoundaries[1].endIndex + 1),
          ];

          setFirstRowChips(row1);
          setSecondRowChips(secondFinalRow);
          setHiddenChips(hidden);
        }
      } finally {
        // Clean up
        document.body.removeChild(testContainer);
      }
    }, 0);
  }, [values]);

  // Helper function to find row boundaries
  const findRowBoundaries = (elements: HTMLElement[]) => {
    if (elements.length === 0) return [];

    const rows = [];
    let currentRowY = elements[0].getBoundingClientRect().top;
    let currentRowStartIndex = 0;

    for (let i = 1; i < elements.length; i++) {
      const rect = elements[i].getBoundingClientRect();

      if (isOnDifferentRow(rect, { top: currentRowY } as DOMRect)) {
        rows.push({
          startIndex: currentRowStartIndex,
          endIndex: i - 1,
          y: currentRowY,
        });
        currentRowY = rect.top;
        currentRowStartIndex = i;
      }
    }

    // Add the last row
    rows.push({
      startIndex: currentRowStartIndex,
      endIndex: elements.length - 1,
      y: currentRowY,
    });

    return rows;
  };

  // Helper function to find max chips that fit with button
  const findMaxChipsWithButton = (
    chips: string[],
    container: HTMLElement,
    createChipFn: (value: string) => HTMLElement,
    createButtonFn: (count: number) => HTMLElement,
    totalCount: number
  ) => {
    let maxChips = 0;

    container.innerHTML = ''; // Clear container

    // Try adding chips one by one until button moves to next row
    for (let i = 0; i < chips.length; i++) {
      const chip = createChipFn(chips[i]);
      container.appendChild(chip);

      const button = createButtonFn(totalCount);
      container.appendChild(button);

      const chipRect = chip.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      if (!isOnDifferentRow(chipRect, buttonRect)) {
        maxChips = i + 1;
        container.removeChild(button);
      } else {
        // Button is on a new row, so we've found our limit
        container.removeChild(button);
        break;
      }
    }

    return chips.slice(0, maxChips);
  };

  return (
    <div ref={containerRef} className="flex flex-col w-full min-w-[100px]">
      <Popover open={open}>
        <PopoverTrigger asChild>
          <div className="h-[1px] border-0 outline-none"></div>
        </PopoverTrigger>
        <PopoverContent
          className="p-2 max-h-[200px] -translate-y-md border bg-white overflow-y-auto"
          style={{ width: containerRef.current?.offsetWidth || 400 }}
        >
          <div className="flex flex-wrap gap-1">
            {values.map((value, index) => (
              <CustomChip key={index} label={value} isCapitalized={isCapitalized} />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap items-center">
        {firstRowChips.map((value, index) => (
          <CustomChip key={`row1-${index}`} label={value} isCapitalized={isCapitalized} />
        ))}
      </div>

      <div className="flex flex-wrap items-center">
        {secondRowChips.map((value, index) => (
          <CustomChip key={`row2-${index}`} label={value} isCapitalized={isCapitalized} />
        ))}

        {hiddenChips.length > 0 && (
          <Button
            variant="text"
            size="text"
            onClick={() => setOpen(true)}
            ref={triggerRef}
            className="pb-2xs px-2xs customtext-label-medium"
          >
            Show all ({values.length})
          </Button>
        )}
      </div>
    </div>
  );
};
