import { Row } from '@tanstack/react-table';
import dayjs from 'dayjs';

type DateValue = string | number | Date | null | undefined;

export const dateSortingFn = <T>(rowA: Row<T>, rowB: Row<T>, columnId: string): number => {
  const rawA = rowA.getValue(columnId) as DateValue;
  const rawB = rowB.getValue(columnId) as DateValue;

  const timeA = rawA == null ? Number.NEGATIVE_INFINITY : dayjs(rawA).valueOf();

  const timeB = rawB == null ? Number.NEGATIVE_INFINITY : dayjs(rawB).valueOf();

  return timeA - timeB;
};
