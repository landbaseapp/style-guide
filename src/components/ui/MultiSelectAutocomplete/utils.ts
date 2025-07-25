export type SelectOption = Record<'value' | 'label', string>;

export const uniqueOptions = (options: SelectOption[]) => {
  return options.filter(
    (option, index, self) => self.findIndex((t) => t.value === option.value) === index
  );
};
