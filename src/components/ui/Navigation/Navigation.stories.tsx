import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Navigation, NavigationItem } from './Navigation';
import { Badge } from '../Badge';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  render: (args) => (
    <Navigation {...args}>
      <NavigationItem selected>Dashboard</NavigationItem>
      <NavigationItem>Contacts</NavigationItem>
      <NavigationItem>Calendar</NavigationItem>
      <NavigationItem>Messages</NavigationItem>
      <NavigationItem>Settings</NavigationItem>
    </Navigation>
  ),
};

export const WithBadges: Story = {
  render: (args) => (
    <Navigation {...args}>
      <NavigationItem selected>Dashboard</NavigationItem>
      <NavigationItem badge={<Badge label="Beta" />}>Contacts</NavigationItem>
      <NavigationItem badge={<Badge label="New" />}>Calendar</NavigationItem>
      <NavigationItem badge={<Badge label="Test" />}>Messages</NavigationItem>
      <NavigationItem>Settings</NavigationItem>
    </Navigation>
  ),
};

export const Interactive: Story = {
  render: () => {
    const NavigationDemo = () => {
      const [selected, setSelected] = React.useState('dashboard');

      return (
        <Navigation>
          <NavigationItem
            selected={selected === 'dashboard'}
            onClick={() => setSelected('dashboard')}
          >
            Dashboard
          </NavigationItem>
          <NavigationItem
            selected={selected === 'contacts'}
            onClick={() => setSelected('contacts')}
            badge={<Badge label="Beta" />}
          >
            Contacts
          </NavigationItem>
          <NavigationItem
            selected={selected === 'calendar'}
            onClick={() => setSelected('calendar')}
          >
            Calendar
          </NavigationItem>
          <NavigationItem
            selected={selected === 'messages'}
            onClick={() => setSelected('messages')}
          >
            Messages
          </NavigationItem>
          <NavigationItem
            selected={selected === 'settings'}
            onClick={() => setSelected('settings')}
          >
            Settings
          </NavigationItem>
        </Navigation>
      );
    };

    return <NavigationDemo />;
  },
};
