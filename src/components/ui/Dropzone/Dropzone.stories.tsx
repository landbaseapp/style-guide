import type { Meta, StoryObj } from '@storybook/react';
import { Dropzone } from './Dropzone';
import { fn } from '@storybook/test';
import { BrowserRouter } from 'react-router-dom';

const meta = {
  title: 'Components/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: '600px', padding: '20px' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Dropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

const testFile = new File(['test content'], 'test.csv', { type: 'text/csv' });

export const Default: Story = {
  args: {
    file: null,
    processing: false,
    onDropFile: fn(),
    onRemoveFile: fn(),
    accept: {
      'text/csv': ['.csv'],
    },
  },
};

export const Uploading: Story = {
  args: {
    ...Default.args,
    file: testFile,
    processing: true,
  },
};

export const Uploaded: Story = {
  args: {
    ...Default.args,
    file: testFile,
    processing: false,
  },
};
