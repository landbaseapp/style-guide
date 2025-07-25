import { memo } from 'react';
import { Typography } from 'src/components/ui/Typography';
import { IconButton } from 'src/components/ui/Button';
import { CaretCircleLeft, CaretCircleRight } from '@phosphor-icons/react';
import { PaginationType, SetPaginationType } from 'src/components/Table/hooks/useQueryPagination';
import { Skeleton } from 'src/components/ui/Skeleton';

export interface PaginationProps {
  total: number;
  pagination: PaginationType;
  setPagination: SetPaginationType;
  isLoading?: boolean;
}

export const QueryPagination = memo(
  ({ total, pagination, setPagination, isLoading = false }: PaginationProps) => {
    const { pageSize, pageIndex } = pagination;

    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const startIndex = pageIndex * pageSize + 1;
    const endIndex = Math.min((pageIndex + 1) * pageSize, total);
    const isPrevPageDisabled = pageIndex === 0 || isLoading;
    const isNextPageDisabled = pageIndex === totalPages - 1 || isLoading;

    const handlePrev = () => {
      if (isPrevPageDisabled) {
        return;
      }

      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex - 1 }));
    };

    const handleNext = () => {
      if (isNextPageDisabled) {
        return;
      }

      setPagination((prev) => ({ ...prev, pageIndex: prev.pageIndex + 1 }));
    };

    if (total === 0 && !isLoading) {
      return null;
    }

    return (
      <div className="flex flex-row items-center justify-between gap-2xs">
        <IconButton
          onClick={handlePrev}
          disabled={isPrevPageDisabled}
          icon={CaretCircleLeft}
          variant="ghost"
        />
        <Typography variant="body-small" className="text-on-surface">
          {isLoading ? (
            <Skeleton className="w-14 h-4" />
          ) : (
            <>
              {startIndex}–{endIndex} <span className="text-on-surface-variant">of {total}</span>
            </>
          )}
        </Typography>
        <IconButton
          onClick={handleNext}
          disabled={isNextPageDisabled}
          icon={CaretCircleRight}
          variant="ghost"
        />
      </div>
    );
  }
);
