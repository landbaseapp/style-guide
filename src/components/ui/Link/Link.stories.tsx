import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Story />} />
          <Route
            path="/story/color-palette--color-palette"
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
};

export default meta;
type Story = StoryObj<typeof Link>;

export const InternalLink: Story = {
  args: {
    children: 'Go to Color Palette',
    to: '/story/color-palette--color-palette',
    size: 'md',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'Go to Google',
    to: 'https://www.google.com',
    size: 'md',
  },
};
