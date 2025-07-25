import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button/Button';
import { User } from '@phosphor-icons/react';
import { Typography } from '../Typography/Typography';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
import { GeneralDialog } from './GeneralDialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof Dialog>;

export const DialogDemo: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Button</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogIcon>
            <User />
          </DialogIcon>
          <DialogTitle>This is a dialog header</DialogTitle>
          <DialogDescription>
            This is a dialog description. Dialog headers are optimized for accessibility.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Dialog Button (DialogFooter)</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DialogDemoWithIcon: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dialog Button (DialogTrigger)</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogIcon>
            {/* no need to set size */}
            <User />
          </DialogIcon>
          <DialogTitle>This is a dialog header</DialogTitle>
          <DialogDescription>
            This is a dialog description. Dialog headers are optimized for accessibility.
            <br />
            <br />
            Dialog Icon should be a 24px icon.
            <br />
            <br />
            Dialog should always have a cancel button with variant=&quot;ghost&quot;, which is
            automatically added when using the DialogFooter component.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const DialogDemoWithMoreContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Dialog Button (DialogTrigger)</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogIcon>
            {/* no need to set size */}
            <User />
          </DialogIcon>
          <DialogTitle>This is a dialog header</DialogTitle>
          <DialogDescription>
            This is a dialog description. Dialog headers are optimized for accessibility.
            <br />
            <br />
            Dialog can have more content inside, like a form or a list.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 grid-cols-2 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Typography variant="body-medium">Name</Typography>
            <Typography variant="body-medium">Name</Typography>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" variant={'danger'}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const GeneralDialogDemo: Story = {
  render: () => (
    <GeneralDialog
      title="Dialog Title"
      description="Dialog Description"
      controls={{ trigger: <Button variant="outline">Open Dialog</Button> }}
    />
  ),
};
