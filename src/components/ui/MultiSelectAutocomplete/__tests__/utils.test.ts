import { describe, it, expect } from 'vitest';
import { uniqueOptions, SelectOption } from '../utils';

describe('MultiSelectAutocomplete utils', () => {
  describe('uniqueOptions', () => {
    it('should remove duplicate options based on value', () => {
      const options: SelectOption[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '1', label: 'Option 1 Duplicate' },
        { value: '3', label: 'Option 3' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual([
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ]);
      expect(result).toHaveLength(3);
    });

    it('should keep first occurrence when duplicates have different labels', () => {
      const options: SelectOption[] = [
        { value: '1', label: 'First Label' },
        { value: '1', label: 'Second Label' },
        { value: '1', label: 'Third Label' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual([{ value: '1', label: 'First Label' }]);
      expect(result).toHaveLength(1);
    });

    it('should return empty array when given empty array', () => {
      const options: SelectOption[] = [];

      const result = uniqueOptions(options);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return same array when all options are unique', () => {
      const options: SelectOption[] = [
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual(options);
      expect(result).toHaveLength(3);
    });

    it('should handle single option', () => {
      const options: SelectOption[] = [{ value: '1', label: 'Single Option' }];

      const result = uniqueOptions(options);

      expect(result).toEqual(options);
      expect(result).toHaveLength(1);
    });

    it('should handle options with empty string values', () => {
      const options: SelectOption[] = [
        { value: '', label: 'Empty Value 1' },
        { value: '', label: 'Empty Value 2' },
        { value: '1', label: 'Normal Option' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual([
        { value: '', label: 'Empty Value 1' },
        { value: '1', label: 'Normal Option' },
      ]);
      expect(result).toHaveLength(2);
    });

    it('should handle options with special characters in values', () => {
      const options: SelectOption[] = [
        { value: 'option@1', label: 'Special 1' },
        { value: 'option#2', label: 'Special 2' },
        { value: 'option@1', label: 'Duplicate Special' },
        { value: 'option-3', label: 'Hyphen Option' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual([
        { value: 'option@1', label: 'Special 1' },
        { value: 'option#2', label: 'Special 2' },
        { value: 'option-3', label: 'Hyphen Option' },
      ]);
      expect(result).toHaveLength(3);
    });

    it('should handle large number of duplicates', () => {
      const options: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({
        value: (i % 10).toString(),
        label: `Option ${i}`,
      }));

      const result = uniqueOptions(options);

      expect(result).toHaveLength(10);
      expect(result.map((o) => o.value)).toEqual([
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ]);
    });

    it('should preserve original order of first occurrences', () => {
      const options: SelectOption[] = [
        { value: 'z', label: 'Z Option' },
        { value: 'a', label: 'A Option' },
        { value: 'm', label: 'M Option' },
        { value: 'a', label: 'A Duplicate' },
        { value: 'z', label: 'Z Duplicate' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual([
        { value: 'z', label: 'Z Option' },
        { value: 'a', label: 'A Option' },
        { value: 'm', label: 'M Option' },
      ]);
    });

    it('should handle numeric string values', () => {
      const options: SelectOption[] = [
        { value: '10', label: 'Ten' },
        { value: '2', label: 'Two' },
        { value: '10', label: 'Ten Duplicate' },
        { value: '02', label: 'Zero Two' },
      ];

      const result = uniqueOptions(options);

      expect(result).toEqual([
        { value: '10', label: 'Ten' },
        { value: '2', label: 'Two' },
        { value: '02', label: 'Zero Two' },
      ]);
      expect(result).toHaveLength(3);
    });
  });
});
