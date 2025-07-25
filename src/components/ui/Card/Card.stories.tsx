import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CustomCardHeader,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './Card';
import { Typography } from '../Typography';
import { Divider } from '../Divider/Divider';
import { DotsThree, Funnel } from '@phosphor-icons/react';
import { IconButton } from '../Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithHeader: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader
        icon={Funnel}
        title="Card with Header"
        description="Optional description"
        actions={
          <IconButton
            icon={DotsThree}
            variant="ghost"
            onClick={() => {
              alert('clicked');
            }}
          />
        }
      />
      <CardContent>
        <div className="rounded-md bg-red-300/50 h-[200px] w-full flex items-center justify-center">
          <Typography variant="body-medium">Card content</Typography>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Typography variant="body-medium">Footer content</Typography>
      </CardFooter>
    </Card>
  ),
};

export const CustomCardHeaderCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CustomCardHeader>
        <CardTitle label="Card Title is title-medium" />
        {/* Optional Divider */}
        <Divider className="my-2xs" />
        <CardDescription>Card description is body-medium</CardDescription>
      </CustomCardHeader>
      <CardContent>
        <Typography variant="body-medium">
          Card is a collection of related information that is displayed in a card format. Use it to
          display content like images, text, and links.
        </Typography>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Typography variant="body-medium">Footer content</Typography>
      </CardFooter>
    </Card>
  ),
};
