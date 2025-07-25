import { EmailSource, EmailStatus } from 'src/data/models/emailAuth';
import { EmailStrategyType } from 'src/data/models/emailStrategy';

export interface FilterBarProps {
  /**
   * Id is used to store filters data in local storage.
   * When id is provided it automatically enables localStorage feature.
   * Must be uniq for each usecase across the app.
   */
  readonly id?: string;

  readonly minFiltersAmount: number;
  readonly filters: FilterUnion[];
  readonly visibleFilters: FilterType[];
  readonly setVisibleFilters: (t: FilterType[]) => void;

  /**
   * With current implementation initial request must be sent with no filters applied.
   * To fetch all available users list.
   * If you have no USER filter you dont need to provide this value.
   * TODO(artsiom): refactor logic to have a separate request for available users list.
   */
  readonly hasSetInitialFilter?: boolean;
}

export type FilterValueMap = {
  USER: string;
  PROVIDER: EmailSource;
  STATUS: EmailStatus;
  STRATEGY_TYPE: EmailStrategyType;
  RESTRICTED: boolean;
  SIGNATURE: boolean;
};

export type FilterUnion = {
  [K in keyof FilterValueMap]: FilterProps<K>;
}[keyof FilterValueMap];

export type FilterType = keyof FilterValueMap;

export interface FilterProps<T extends FilterType> {
  readonly type: T;

  /**
   * Show filter by default.
   * Initially and when ClearAll clicked.
   */
  readonly default?: boolean;

  readonly options: { label: string; value: FilterValueMap[T] }[];
  readonly selectedOptions: FilterValueMap[T][];
  readonly setSelectedOptions: (v: FilterValueMap[T][]) => void;
}
