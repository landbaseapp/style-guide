import type { Meta, StoryObj } from '@storybook/react';

import { RocketLaunch } from '@phosphor-icons/react';
import { Badge, BadgeProps } from './Badge';
import { Check } from '@phosphor-icons/react';

const badgeVariants = ['default', 'brand', 'positive', 'negative', 'warning', 'info'] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component is used to display status indicators, labels, or tags. It supports different variants (outline, primary, success, danger, accent, info) and can contain text, icons, or both. Commonly used for showing status, categories, or highlighting important information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: badgeVariants,
    },
  },
  args: {
    variant: 'default',
  },
} satisfies Meta<BadgeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BadgeStory: Story = {
  render: (args) => (
    <div className="space-y-8 p-4">
      {/* Text Only */}
      <div>
        <h4 className="text-sm font-medium mb-2">Text Only</h4>
        <div className="flex flex-wrap gap-4">
          {badgeVariants.map((variant) => (
            <Badge
              key={variant}
              {...args}
              variant={variant}
              label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Text various cases */}
      <div>
        <h4 className="text-sm font-medium mb-2">Text various cases</h4>
        <div className="flex flex-wrap gap-4">
          {['to-enrich', 'CONNECTED', 'To Enrich', 'NO-REPLY', 'to-enrich-again'].map((label) => (
            <Badge key={label} {...args} variant="info" label={label} />
          ))}
        </div>
      </div>

      {/* Icon Only */}
      <div>
        <h4 className="text-sm font-medium mb-2">Icon Only</h4>
        <div className="flex flex-wrap gap-4">
          {badgeVariants.map((variant) => (
            <Badge key={variant} {...args} variant={variant} rightIcon={RocketLaunch} />
          ))}
        </div>
      </div>

      {/* Left Icon + Text */}
      <div>
        <h4 className="text-sm font-medium mb-2">Left Icon + Text</h4>
        <div className="flex flex-wrap gap-4">
          {badgeVariants.map((variant) => (
            <Badge
              key={variant}
              {...args}
              variant={variant}
              leftIcon={RocketLaunch}
              label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            />
          ))}
        </div>
      </div>

      {/* Right Icon + Text */}
      <div>
        <h4 className="text-sm font-medium mb-2">Right Icon + Text</h4>
        <div className="flex flex-wrap gap-4">
          {badgeVariants.map((variant) => (
            <Badge
              key={variant}
              {...args}
              variant={variant}
              rightIcon={Check}
              label={variant.charAt(0).toUpperCase() + variant.slice(1)}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

export const BadgeDemo: Story = {
  args: {
    label: 'Custom Label',
    leftIcon: 'dot',
    rightIcon: Check,
  },
};
