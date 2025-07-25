import { describe, it, expect } from 'vitest';
import { LockKey, Plugs, Pulse, Signature, Strategy, User } from '@phosphor-icons/react';
import { getFilterIcon, getFilterLabel, createFilter } from '../utils';
import { FilterType, FilterProps } from '../constants';

describe('getFilterIcon', () => {
  it('should return User icon for USER type', () => {
    expect(getFilterIcon('USER')).toBe(User);
  });

  it('should return Plugs icon for PROVIDER type', () => {
    expect(getFilterIcon('PROVIDER')).toBe(Plugs);
  });

  it('should return Pulse icon for STATUS type', () => {
    expect(getFilterIcon('STATUS')).toBe(Pulse);
  });

  it('should return Strategy icon for STRATEGY_TYPE type', () => {
    expect(getFilterIcon('STRATEGY_TYPE')).toBe(Strategy);
  });

  it('should return LockKey icon for RESTRICTED type', () => {
    expect(getFilterIcon('RESTRICTED')).toBe(LockKey);
  });

  it('should return Signature icon for SIGNATURE type', () => {
    expect(getFilterIcon('SIGNATURE')).toBe(Signature);
  });

  it('should return User icon for unknown type', () => {
    expect(getFilterIcon('UNKNOWN' as FilterType)).toBe(User);
  });
});

describe('getFilterLabel', () => {
  it('should return "User" for USER type', () => {
    expect(getFilterLabel('USER')).toBe('User');
  });

  it('should return "Provider" for PROVIDER type', () => {
    expect(getFilterLabel('PROVIDER')).toBe('Provider');
  });

  it('should return "Status" for STATUS type', () => {
    expect(getFilterLabel('STATUS')).toBe('Status');
  });

  it('should return "Email strategy type" for STRATEGY_TYPE type', () => {
    expect(getFilterLabel('STRATEGY_TYPE')).toBe('Email strategy type');
  });

  it('should return "Restricted" for RESTRICTED type', () => {
    expect(getFilterLabel('RESTRICTED')).toBe('Restricted');
  });

  it('should return "Signature" for SIGNATURE type', () => {
    expect(getFilterLabel('SIGNATURE')).toBe('Signature');
  });

  it('should return "Unknown" for unknown type', () => {
    expect(getFilterLabel('UNKNOWN' as FilterType)).toBe('Unknown');
  });
});

describe('createFilter', () => {
  it('should return the same filter object passed as parameter', () => {
    const mockFilter: FilterProps<'USER'> = {
      type: 'USER',
      options: [
        { label: 'John Doe', value: 'john.doe@example.com' },
        { label: 'Jane Smith', value: 'jane.smith@example.com' },
      ],
      selectedOptions: ['john.doe@example.com'],
      setSelectedOptions: () => {},
    };

    const result = createFilter(mockFilter);

    expect(result).toBe(mockFilter);
    expect(result.type).toBe('USER');
    expect(result.options).toEqual(mockFilter.options);
    expect(result.selectedOptions).toEqual(mockFilter.selectedOptions);
    expect(result.setSelectedOptions).toBe(mockFilter.setSelectedOptions);
  });

  it('should work with boolean filter types', () => {
    const mockFilter: FilterProps<'RESTRICTED'> = {
      type: 'RESTRICTED',
      options: [
        { label: 'Yes', value: true },
        { label: 'No', value: false },
      ],
      selectedOptions: [true],
      setSelectedOptions: () => {},
    };

    const result = createFilter(mockFilter);

    expect(result).toBe(mockFilter);
    expect(result.type).toBe('RESTRICTED');
    expect(result.selectedOptions).toEqual([true]);
  });
});
