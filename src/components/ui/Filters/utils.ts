import { LockKey, Plugs, Pulse, Signature, Strategy, User } from '@phosphor-icons/react';
import { FilterProps, FilterType } from './constants';

export function getFilterIcon(t: FilterType) {
  switch (t) {
    case 'USER':
      return User;
    case 'PROVIDER':
      return Plugs;
    case 'STATUS':
      return Pulse;
    case 'STRATEGY_TYPE':
      return Strategy;
    case 'RESTRICTED':
      return LockKey;
    case 'SIGNATURE':
      return Signature;
    default:
      return User;
  }
}

export function getFilterLabel(t: FilterType) {
  switch (t) {
    case 'USER':
      return 'User';
    case 'PROVIDER':
      return 'Provider';
    case 'STATUS':
      return 'Status';
    case 'STRATEGY_TYPE':
      return 'Email strategy type';
    case 'RESTRICTED':
      return 'Restricted';
    case 'SIGNATURE':
      return 'Signature';
    default:
      return 'Unknown';
  }
}

export function createFilter<T extends FilterType>(filter: FilterProps<T>): FilterProps<T> {
  return filter;
}
