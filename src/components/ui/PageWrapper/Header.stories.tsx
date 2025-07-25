import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { User, Mailbox } from '@phosphor-icons/react';
import { Header } from './Header';
import { Button } from '../Button';
import { Link } from '../Link';
import { Badge } from '../Badge';
import { Divider } from '../Divider';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
          <Route
            path="/story"
            element={
              <>
                <h2>🎨 Color Palette Page</h2>
                <Link to="/">Back to Home</Link>
              </>
            }
          />
        </Routes>
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Header component is used to display section titles with optional right and left sections. 
        It supports badges, editable states, icons, descriptions and action buttons.
        **Left section can have: title and optional back link with ** 1) only icon, 2) only badge, 3) both badge and icon (on hover shows icon, otherwise shows badge), or 4) neither. 
        **Right section can include:** a main action button and either a label or a secondary action button (these cannot be used together).`,
      },
    },
    argTypes: {
      label: {
        description: 'The main title text of the header',
        control: 'text',
      },
      leftSection: {
        description: 'Configuration for the left side of the header',
        control: 'object',
      },
      rightSection: {
        description: 'Configuration for the right side of the header',
        control: 'object',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Header>;

export const HeaderExamples: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-2xs w-full px-md">
        <Header
          label="Mailbox"
          leftSection={{
            leftIcon: Mailbox,
          }}
          description={
            'We have used AI to preselect potential prospects for you. Feel free to reach out to all of them or unselect companies which you would like to do not contact.'
          }
        />
        <Divider />
        <Header
          label="Search"
          leftSection={{
            badge: <Badge label="Beta" />,
            backLink: {
              label: 'Back to Search',
              href: '/story',
            },
          }}
        />
        <Divider />
        <Header
          label="User Profile"
          onEdit={fn()}
          leftSection={{ badge: <Badge label="Beta" />, leftIcon: User }}
          description={
            'We have used AI to preselect potential prospects for you. Feel free to reach out to all of them or unselect companies which you would like to do not contact.'
          }
        />
        <Divider />
        <Header
          label="Mailbox"
          leftSection={{
            leftIcon: Mailbox,
          }}
          rightSection={{
            mainAction: (
              <Button variant="accent" size="md">
                MainAction
              </Button>
            ),
            secondaryAction: (
              <Button variant="ghost" size="md">
                SecondaryAction
              </Button>
            ),
          }}
        />
        <Divider />
        <Header
          label="Mailbox"
          leftSection={{
            leftIcon: Mailbox,
          }}
          rightSection={{
            mainAction: (
              <Button variant="accent" size="md">
                MainAction
              </Button>
            ),
            label: 'Last Sync: Nov 11, 2024',
          }}
        />
      </div>
    );
  },
};
