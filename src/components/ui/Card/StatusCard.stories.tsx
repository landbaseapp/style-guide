import { Meta, StoryObj } from '@storybook/react';
import { RocketLaunch } from '@phosphor-icons/react';
import { StatusCard, StatusCards } from './StatusCard';

const meta: Meta<typeof StatusCard> = {
  title: 'Composite-UI/StatusCard',
  component: StatusCard,
  tags: ['autodocs'],
};

export default meta;

export const MultipleCards: StoryObj<typeof StatusCards> = {
  render: () => (
    <StatusCards
      items={[
        {
          title: 'Emails sent',
          value: '1,234',
          subtitle: 'Last 30 days',
          icon: RocketLaunch,
        },
        {
          title: 'Bounce rate',
          value: '2.4%',
          subtitle: 'Last 30 days',
        },
        {
          title: 'Replies',
          value: '543',
          subtitle: 'Last 30 days',
        },
        {
          title: 'Interested',
          value: '123',
          subtitle: 'Last 30 days',
        },
      ]}
    />
  ),
};
