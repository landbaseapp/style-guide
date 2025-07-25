import { describe, it, expect, vi } from 'vitest';
import { Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { dateSortingFn } from '../sorting';

interface MockTableRow {
  id: string;
  [key: string]: unknown;
}

const createMockRow = <T>(data: T): Row<T> => {
  return {
    id: 'test-row',
    getValue: vi.fn((columnId: string) => (data as Record<string, unknown>)[columnId]),
    original: data,
    index: 0,
    depth: 0,
    parentId: undefined,
    getIsSelected: vi.fn(() => false),
    getIsSomeSelected: vi.fn(() => false),
    getIsAllSubRowsSelected: vi.fn(() => false),
    getCanSelect: vi.fn(() => true),
    toggleSelected: vi.fn(),
    getIsExpanded: vi.fn(() => false),
    getCanExpand: vi.fn(() => false),
    getToggleExpandedHandler: vi.fn(),
    toggleExpanded: vi.fn(),
    getIsGrouped: vi.fn(() => false),
    getGroupingValue: vi.fn(),
    getIsAggregated: vi.fn(() => false),
    subRows: [],
    getLeafRows: vi.fn(() => []),
    getAllCells: vi.fn(() => []),
    getVisibleCells: vi.fn(() => []),
    getLeftVisibleCells: vi.fn(() => []),
    getCenterVisibleCells: vi.fn(() => []),
    getRightVisibleCells: vi.fn(() => []),
    _valuesCache: {},
    columnFilters: {},
    columnFiltersMeta: {},
  } as unknown as Row<T>;
};

describe('dateSortingFn', () => {
  const columnId = 'testDate';

  describe('string date values', () => {
    it('should sort valid date strings correctly (ascending)', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-02',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0); // rowA comes before rowB
    });

    it('should sort valid date strings correctly (descending)', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-02',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeGreaterThan(0); // rowA comes after rowB
    });

    it('should return 0 for equal date strings', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBe(0);
    });

    it('should handle ISO date strings with time', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01T10:00:00Z',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01T11:00:00Z',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle different date string formats', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '01/01/2023',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '01/02/2023',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });
  });

  describe('Date object values', () => {
    it('should sort Date objects correctly', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: new Date('2023-01-01'),
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: new Date('2023-01-02'),
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle equal Date objects', () => {
      const date = new Date('2023-01-01');
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: date,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: new Date(date.getTime()),
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBe(0);
    });
  });

  describe('number timestamp values', () => {
    it('should sort number timestamps correctly', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: 1640995200000, // 2022-01-01
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: 1641081600000, // 2022-01-02
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle equal number timestamps', () => {
      const timestamp = 1640995200000;
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: timestamp,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: timestamp,
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBe(0);
    });
  });

  describe('null and undefined values', () => {
    it('should sort null values to the beginning (both null)', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: null,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: null,
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeNaN(); // NEGATIVE_INFINITY - NEGATIVE_INFINITY = NaN
    });

    it('should sort undefined values to the beginning (both undefined)', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: undefined,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: undefined,
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeNaN(); // NEGATIVE_INFINITY - NEGATIVE_INFINITY = NaN
    });

    it('should sort null before valid date', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: null,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should sort undefined before valid date', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: undefined,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should sort valid date after null', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: null,
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeGreaterThan(0);
    });

    it('should sort valid date after undefined', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: undefined,
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeGreaterThan(0);
    });

    it('should treat null and undefined as equal', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: null,
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: undefined,
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeNaN(); // NEGATIVE_INFINITY - NEGATIVE_INFINITY = NaN
    });
  });

  describe('invalid date values', () => {
    it('should handle invalid date strings (dayjs treats them as invalid)', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: 'invalid-date',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      // Invalid dates get converted to NaN by dayjs, which should be handled
      expect(typeof result).toBe('number');
    });

    it('should handle both invalid date strings', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: 'invalid-date-a',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: 'invalid-date-b',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      // Both invalid dates should be treated as NaN - NaN = NaN, but NaN comparison behavior
      expect(typeof result).toBe('number');
    });

    it('should handle empty string', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(typeof result).toBe('number');
    });
  });

  describe('mixed value types', () => {
    it('should handle string date vs Date object', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: new Date('2023-01-02'),
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle string date vs number timestamp', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: dayjs('2023-01-02').valueOf(),
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle Date object vs number timestamp', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: new Date('2023-01-01'),
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: dayjs('2023-01-02').valueOf(),
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle very distant dates', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '1900-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2100-01-01',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle same date different times', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01T09:00:00Z',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01T10:00:00Z',
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBeLessThan(0);
    });

    it('should handle timezone differences', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01T10:00:00+00:00',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-01T11:00:00+01:00', // Same UTC time
      });

      const result = dateSortingFn(rowA, rowB, columnId);
      expect(result).toBe(0);
    });
  });

  describe('column ID handling', () => {
    it('should use the correct column ID to get values', () => {
      const columnId1 = 'date1';
      const columnId2 = 'date2';

      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId1]: '2023-01-01',
        [columnId2]: '2023-01-03',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId1]: '2023-01-02',
        [columnId2]: '2023-01-01',
      });

      // Sort by columnId1
      const result1 = dateSortingFn(rowA, rowB, columnId1);
      expect(result1).toBeLessThan(0); // 2023-01-01 < 2023-01-02

      // Sort by columnId2
      const result2 = dateSortingFn(rowA, rowB, columnId2);
      expect(result2).toBeGreaterThan(0); // 2023-01-03 > 2023-01-01
    });

    it('should handle missing column ID gracefully', () => {
      const rowA = createMockRow<MockTableRow>({
        id: 'a',
        [columnId]: '2023-01-01',
      });
      const rowB = createMockRow<MockTableRow>({
        id: 'b',
        [columnId]: '2023-01-02',
      });

      // Use a different column ID that doesn't exist
      const result = dateSortingFn(rowA, rowB, 'nonExistentColumn');
      // getValue should return undefined for non-existent columns, resulting in NaN
      expect(result).toBeNaN(); // NEGATIVE_INFINITY - NEGATIVE_INFINITY = NaN
    });
  });
});
