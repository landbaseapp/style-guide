import type { Meta, StoryObj } from '@storybook/react';
import {
  CustomDropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './Dropdown';
import { Button } from '../Button/Button';
import { User } from '@phosphor-icons/react';

const meta = {
  title: 'Components/DropdownMenu',
  component: CustomDropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomDropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SampleDropdown: Story = {
  render: () => (
    <CustomDropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* works with our own button */}
        <Button variant="accent">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Disabled</DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              alert('Billing');
            }}
          >
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              alert('Icon');
            }}
            icon={User}
          >
            With Icon
          </DropdownMenuItem>
          <DropdownMenuItem selected icon={User}>
            Selected Icon
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Group title</DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem selected>Selected</DropdownMenuItem>
          <DropdownMenuItem selected disabled>
            Selected Disabled
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem selected disabled icon={User}>
          Disabled Selected Icon
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            alert('Log out');
          }}
        >
          Super long dropdown menu item
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            alert('Log out');
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </CustomDropdownMenu>
  ),
};
