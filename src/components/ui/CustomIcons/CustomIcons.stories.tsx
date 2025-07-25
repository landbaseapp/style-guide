import type { Meta, StoryObj } from '@storybook/react';
import { IconProps } from '@phosphor-icons/react';
import { LinkedinIcon, TwitterIcon, FaceBookIcon, HubspotIcon } from './CustomIcons';

const meta = {
  title: 'Components/CustomIcons',
  component: LinkedinIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    weight: {
      control: 'select',
      options: ['thin', 'light', 'regular', 'bold', 'fill'],
      defaultValue: 'regular',
    },
  },
} satisfies Meta<IconProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons: Story = {
  render: (args) => (
    <div className="flex gap-4 items-center">
      <LinkedinIcon {...args} />
      <TwitterIcon {...args} />
      <FaceBookIcon {...args} />
      <HubspotIcon {...args} />
    </div>
  ),
};

export const LinkedIn: Story = {
  render: (args) => <LinkedinIcon {...args} />,
};

export const Twitter: Story = {
  render: (args) => <TwitterIcon {...args} />,
};

export const Facebook: Story = {
  render: (args) => <FaceBookIcon {...args} />,
};

export const Hubspot: Story = {
  render: (args) => <HubspotIcon {...args} />,
};
