import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { User } from '@phosphor-icons/react';
import { GeneralDialog } from './GeneralDialog';
import { useState } from 'react';

const meta = {
  title: 'Components/GeneralDialog',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', defaultValue: 'Dialog Title' },
    description: { control: 'text', defaultValue: 'Dialog description text' },
    icon: { control: 'boolean', defaultValue: false },
    action: { control: 'object' },
    children: { control: 'object' },
  },
} satisfies Meta<typeof GeneralDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultipleButtonControls: Story = {
  render: () => {
    const MultipleButtonControlsStory = () => {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <div className="flex gap-md">
            <Button variant="accent" onClick={() => setOpen(true)}>
              Open Dialog
            </Button>
            <Button variant="accent" onClick={() => setOpen(true)}>
              Open Dialog 2
            </Button>
          </div>
          <GeneralDialog
            controls={{ open, onOpenChange: setOpen }}
            title="Custom Dialog"
            description="This dialog demonstrates custom content and multiple actions"
          >
            <div className="py-4">
              <p>You can add any custom content here.</p>
              <p>This content will appear between the header and footer.</p>
            </div>
          </GeneralDialog>
        </div>
      );
    };
    return <MultipleButtonControlsStory />;
  },
};

export const WithIcon: Story = {
  render: () => (
    <GeneralDialog
      title="Dialog with Icon"
      description="This is a dialog with an icon and custom content."
      icon={User}
      controls={{ trigger: <Button variant="accent">Open Dialog</Button> }}
      action={<Button type="submit">Confirm</Button>}
    >
      <div className="py-4">
        <p>Additional content can be added here</p>
      </div>
    </GeneralDialog>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <GeneralDialog
      title="Custom Dialog"
      description="This dialog demonstrates custom content and multiple actions"
      controls={{ trigger: <Button variant="accent">Open Dialog</Button> }}
      action={
        <>
          <Button variant="outline">Secondary Action</Button>
          <Button type="submit">Primary Action</Button>
        </>
      }
    >
      <div className="py-4">
        <p>You can add any custom content here.</p>
        <p>This content will appear between the header and footer.</p>
      </div>
    </GeneralDialog>
  ),
};
