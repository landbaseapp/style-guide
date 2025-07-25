import { type Column } from '@tanstack/react-table';
import { type CSSProperties } from 'react';

export function getCommonPinningStyles<TData>({
  column,
  header,
}: {
  column: Column<TData>;
  header: boolean;
}): CSSProperties {
  const pinnedPosition = column.getIsPinned();
  const isLastLeftPinnedColumn = pinnedPosition === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = pinnedPosition === 'right' && column.getIsFirstColumn('right');

  return {
    boxShadow: header
      ? undefined
      : isLastLeftPinnedColumn
      ? '-1px 0 1px -1px gray inset'
      : isFirstRightPinnedColumn
      ? '1px 0 1px -1px gray inset'
      : undefined,
    left: pinnedPosition === 'left' ? `${column.getStart('left')}px` : undefined,
    right: pinnedPosition === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: pinnedPosition ? 0.95 : 1,
    position: pinnedPosition ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: pinnedPosition ? 1 : undefined,
  };
}
