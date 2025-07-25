import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from './Avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

export const WithFallback: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.jpg" alt="@johndoe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  args: {
    size: 'md',
  },
  render: () => (
    <div className="flex items-center gap-4">
      {Array(5)
        .fill(null)
        .map((_, index) => {
          const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
          return (
            <Avatar key={index} size={sizes[index]}>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          );
        })}
    </div>
  ),
};

export const AvatarGroupDemo: Story = {
  args: {
    size: 'md',
  },
  render: () => {
    const avatars = Array(5).fill({
      src: 'https://github.com/shadcn.png',
      alt: '@shadcn',
      fallback: 'CN',
    });

    return (
      <div className="flex items-center gap-4">
        <AvatarGroup size="xl" avatars={avatars} />
        <AvatarGroup size="lg" avatars={avatars} />
        <AvatarGroup size="md" avatars={avatars} />
        <AvatarGroup size="sm" avatars={avatars} />
        <AvatarGroup size="xs" avatars={avatars} />
      </div>
    );
  },
};
