import type { Meta, StoryObj } from '@storybook/react';
import { Toaster, openSnackbar } from './Sooner';
import { Button } from '../Button/Button';

const meta = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col my-2 gap-2">
        <Story />
        <Button
          onClick={() =>
            openSnackbar({
              title: 'This is a toast message',
            })
          }
        >
          Show Toast
        </Button>
      </div>
    ),
  ],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const DifferentVariants: Story = {
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-2">
        <Story />
        <Button
          onClick={() =>
            openSnackbar({
              title: 'Operation completed successfully',
              severity: 'success',
              button: {
                label: 'OK',
                onClick: () => console.log('OK clicked'),
              },
            })
          }
        >
          Show SnackBar with Action
        </Button>

        <Button
          onClick={() =>
            openSnackbar({
              title: 'Operation completed successfully, and this is a longer title',
              severity: 'success',
              button: {
                label: 'OK',
                onClick: () => console.log('OK clicked'),
              },
            })
          }
        >
          Long Title
        </Button>

        <Button
          onClick={() =>
            openSnackbar({
              title: 'Operation completed successfully',
              severity: 'error',
              closeButton: true,
              button: {
                label: 'OK',
                onClick: () => console.log('OK clicked'),
              },
            })
          }
        >
          Show SnackBar with Close (Error)
        </Button>
      </div>
    ),
  ],
};
