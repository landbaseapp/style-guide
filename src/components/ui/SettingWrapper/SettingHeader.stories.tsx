import type { Meta, StoryObj } from '@storybook/react';
import { SettingHeader, SettingHeaderProps } from './SettingHeader';
import { Button } from '../Button';

const meta: Meta<SettingHeaderProps> = {
  title: 'Components/SettingHeader',
  component: SettingHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export default meta;
type Story = StoryObj<SettingHeaderProps>;

export const HeaderExamples: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-sm w-full p-5">
        <SettingHeader label="Setting Title" />
        <SettingHeader
          label="Setting Title"
          mainAction={
            <Button variant="accent" size="md">
              MainAction
            </Button>
          }
        />
      </div>
    );
  },
};
