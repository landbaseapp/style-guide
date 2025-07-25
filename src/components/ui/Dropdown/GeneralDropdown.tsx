import { DotsThreeVertical, Icon } from '@phosphor-icons/react';
import { IconButton, IconButtonProps } from '../Button';
import {
  CustomDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown';

export type DropdownOption = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  selected?: boolean;
  icon?: Icon;
};

export function DropdownMenu({
  triggerIcon,
  options,
  disabled,
  size,
}: {
  readonly size?: IconButtonProps['size'];
  readonly triggerIcon?: Icon;
  readonly options: DropdownOption[];
  readonly disabled?: boolean;
}) {
  return (
    <CustomDropdownMenu>
      <DropdownMenuTrigger asChild className="shrink-0">
        <IconButton
          size={size}
          disabled={disabled}
          icon={triggerIcon ?? DotsThreeVertical}
          variant={'ghost'}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.label}
            disabled={option.disabled}
            selected={option.selected}
            onClick={(e) => {
              option.onClick?.();
              e.stopPropagation();
            }}
            icon={option.icon}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </CustomDropdownMenu>
  );
}
