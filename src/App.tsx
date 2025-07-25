import React from 'react';
import { Button, LoadingButton } from './components/ui/Button';
import { Card, CardContent, CardHeader } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Badge } from './components/ui/Badge';
import { Avatar, AvatarGroup } from './components/ui/Avatar';
import { Checkbox } from './components/ui/Checkbox';
import { Switch } from './components/ui/Switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './components/ui/Select';
import { Dialog } from './components/ui/Dialog';
import { GeneralToolTip } from './components/ui/ToolTip';
import { Typography } from './components/ui/Typography';
import { Loading } from './components/ui/Loading';
import { ProgressBar } from './components/ui/ProgressBar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs';
import { Accordion, AccordionItem, AccordionTrigger } from './components/ui/Accordion';
import { Banner } from './components/ui/Banner';
import { Calendar } from './components/ui/Calendar';
import { Command } from './components/ui/Command';
import { EmptyState } from './components/ui/EmptyState';
import { Header } from './components/ui/Header';
import { Navigation } from './components/ui/Navigation';
import { Popover } from './components/ui/Popover';
import { SegmentPicker } from './components/ui/SegmentPicker';
import { Sheet } from './components/ui/Sheet';
import { Skeleton } from './components/ui/Skeleton';
import { Slider } from './components/ui/Slider';
import { Tag } from './components/ui/Tag';
import { RadioGroup, RadioGroupItem } from './components/ui/Radio';
import { IceCream, User } from '@phosphor-icons/react';
import { cn } from './utils/tw.utils';
import { Colors } from './components/ui/ColorPalette.stories';

const optionGroups = [
  {
    label: 'Option Digit 1',
    options: [
      {
        value: 'option1',
        label: 'short label1',
        selected: false,
        disabled: false,
        icon: <User size={16} />,
      },
      { value: 'option2', label: 'short label2', selected: true, disabled: false },
      { value: 'option3', label: 'short label3', selected: true, disabled: true },
      { value: 'option4', label: 'short label4', selected: false, disabled: true },
      { value: 'option5', label: 'short label5', selected: false, disabled: false },
      {
        value: 'option6',
        label: 'long label long label long label long label 666666',
        selected: false,
        disabled: false,
      },
    ],
  },
  {
    label: 'Option Digit 2',
    options: Array.from({ length: 8 }, (_, i) => ({
      value: `option1${i}`,
      label: `short label1${i}`,
      selected: false,
      disabled: false,
    })),
  },
];

const SelectDemo = () => {
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <div className="p-2">
      <Select>
        <SelectTrigger className="w-[280px]" triggerRef={triggerRef}>
          <SelectValue placeholder="Select an option." />
        </SelectTrigger>
        <SelectContent triggerRef={triggerRef}>
          {optionGroups.map((group) => (
            <SelectGroup key={group.label}>
              <SelectLabel>{group.label}</SelectLabel>
              {group.options.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  selected={item.selected}
                  disabled={item?.disabled}
                  icon={item?.icon}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const ComponentSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <Typography variant="headline-large" className="mb-4">
      {title}
    </Typography>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
  </div>
);

const ComponentDemo = ({
  title,
  children,
  className,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <Card className={cn(className, 'p-4')}>
    <Typography variant="title-large" className="mb-2">
      {title}
    </Typography>
    <div className="space-y-2 overflow-scroll">{children}</div>
  </Card>
);

export function App() {
  return (
    <div className="h-screen bg-gray-50 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <Header
          label="UI Component Style Guide"
          description="Showcase of all available UI components"
        />

        <div className="mt-8 space-y-8">
          <ComponentSection title="Typography">
            <ComponentDemo title="Typography" className="col-span-3">
              <Typography variant="display-large">Display Large</Typography>
              <Typography variant="display-medium">Display Medium</Typography>
              <Typography variant="display-small">Display Small</Typography>
              <Typography variant="headline-large">Headline Large</Typography>
              <Typography variant="headline-medium">Headline Medium</Typography>
              <Typography variant="headline-small">Headline Small</Typography>
              <Typography variant="title-large">Title Large</Typography>
              <Typography variant="title-medium">Title Medium</Typography>
              <Typography variant="title-small">Title Small</Typography>
              <Typography variant="body-large">Body Large</Typography>
              <Typography variant="body-medium">Body Medium</Typography>
              <Typography variant="body-small">Body Small</Typography>
              <Typography variant="label-large">Label Large</Typography>
              <Typography variant="label-medium">Label Medium</Typography>
              <Typography variant="label-small">Label Small</Typography>
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Colors">
            <ComponentDemo title="Colors" className="col-span-3">
              <Colors />
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Buttons">
            <ComponentDemo title="Button Variants">
              <Button variant="primary">Primary Button</Button>
              <Button variant="accent">Accent Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="danger">Danger Button</Button>
            </ComponentDemo>

            <ComponentDemo title="Button Sizes">
              <Button size="xs" leftIcon={IceCream}>
                Extra Small
              </Button>
              <Button size="sm" rightIcon={IceCream}>
                Small
              </Button>
              <Button size="md" rightIcon={IceCream} leftIcon={IceCream}>
                Medium
              </Button>
            </ComponentDemo>

            <ComponentDemo title="Button States">
              <Button disabled>Disabled</Button>
              <LoadingButton loading={true}>Loading</LoadingButton> (Loading)
            </ComponentDemo>

            <ComponentDemo title="Tags">
              <Tag variant="default" label="Default Tag" />
              <Tag variant="positive" label="Success Tag" />
              <Tag variant="warning" label="Warning Tag" />
              <Tag variant="negative" label="Error Tag" />
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Form Controls">
            <ComponentDemo title="Input">
              <div className="p-2 space-y-2">
                <Input placeholder="Enter text..." />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" disabled />
              </div>
            </ComponentDemo>

            <ComponentDemo title="Select">
              <SelectDemo />
            </ComponentDemo>

            <ComponentDemo title="Checkbox & Radio">
              <div className="flex items-center space-x-2">
                <Checkbox id="check1" />
                <label htmlFor="check1">Checkbox option</label>
              </div>
              <Switch label="Switch" />
              <div className="flex flex-col space-y-2">
                <Typography>Radio Group</Typography>
                <RadioGroup>
                  <RadioGroupItem value="option-1" id="option-1" label="Option 1" />
                  <RadioGroupItem value="option-2" id="option-2" label="Option 2" />
                  <RadioGroupItem value="option-3" id="option-3" label="Option 3" />
                </RadioGroup>
              </div>
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Data Display">
            <ComponentDemo title="Cards">
              <Card>
                <CardHeader title="Card Title" icon={IceCream} />
                <CardContent>
                  <Typography variant="body-medium">Card content goes here</Typography>
                </CardContent>
              </Card>
            </ComponentDemo>

            <ComponentDemo title="Badges">
              <Badge variant="default" label="Default" />
              <Badge variant="brand" label="Brand" />
              <Badge variant="warning" label="Warning" />
              <Badge variant="info" label="Info" />
              <Badge variant="negative" label="Negative" />
              <Badge variant="positive" label="Positive" />
            </ComponentDemo>

            <ComponentDemo title="Avatar">
              <AvatarGroup
                size="md"
                avatars={[
                  { src: 'https://i.pravatar.cc/300?img=1', alt: 'User 1' },
                  { src: 'https://i.pravatar.cc/300?img=2', alt: 'User 2' },
                  { src: 'https://i.pravatar.cc/300?img=3', alt: 'User 3' },
                ]}
              />
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Navigation">
            <ComponentDemo title="Tabs" className="col-span-2">
              <Tabs defaultValue="tab1">
                <TabsList>
                  <TabsTrigger
                    value="tab1"
                    leftIcon={User}
                    label="Tab 1"
                    rightIcon={<Badge label="1" variant="warning" />}
                  />
                  <TabsTrigger
                    value="tab2"
                    leftIcon={User}
                    label="Tab with Icon"
                    rightIcon={<Badge label="2" variant="warning" />}
                  />
                  <TabsTrigger
                    value="tab3"
                    leftIcon={User}
                    label="Tab 3"
                    rightIcon={<Badge label="3" variant="warning" />}
                  />
                </TabsList>
                <TabsContent value="tab1">Tab 1 content</TabsContent>
                <TabsContent value="tab2">Tab 2 content</TabsContent>
                <TabsContent value="tab3">Tab 3 content</TabsContent>
              </Tabs>
            </ComponentDemo>

            <ComponentDemo title="Navigation">
              <Navigation>Navitation</Navigation>
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Feedback">
            <ComponentDemo title="Loading States">
              <Loading />
              <Skeleton className="h-4 w-full" />
              <ProgressBar progressPercentage={75} />
            </ComponentDemo>

            <ComponentDemo title="Banners">
              <Banner variant="info" description="This is an info banner" />
              <Banner variant="positive" description="This is a success banner" />
              <Banner variant="warning" description="This is a warning banner" />
              <Banner variant="negative" description="This is an error banner" />
            </ComponentDemo>

            <ComponentDemo title="Empty State">
              <EmptyState
                graphic={<div className="w-[150px] h-[150px] bg-gray-200" />}
                title="No data found"
                description="There are no items to display"
              />
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Overlays">
            <ComponentDemo title="Interactive Elements">
              <GeneralToolTip title="This is a tooltip">
                <Button>Hover me</Button>
              </GeneralToolTip>
              <Dialog>
                <Button>Open Dialog</Button>
              </Dialog>
              <Popover>
                <Button>Open Popover</Button>
              </Popover>
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Data Entry">
            <ComponentDemo title="Advanced Inputs">
              <Calendar />
              <Command />
              {/* <Dropzone
                file={null}
                processing={false}
                onDropFile={(file) => console.log('File dropped:', file)}
                onRemoveFile={() => console.log('Remove file')}
                accept={{
                  'image/*': ['.png', '.jpg', '.jpeg'],
                  'application/pdf': ['.pdf']
                }}
              /> */}
            </ComponentDemo>

            <ComponentDemo title="Controls">
              <Slider defaultValue={[50]} max={100} step={1} />
              <SegmentPicker
                options={[
                  { value: 'Option 1', label: 'Option 1' },
                  { value: 'Option 2', label: 'Option 2' },
                  { value: 'Option 3', label: 'Option 3' },
                ]}
                value={'Option 1'}
                onClick={function (value: 'Option 1' | 'Option 2' | 'Option 3'): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </ComponentDemo>
          </ComponentSection>

          <ComponentSection title="Layout">
            <ComponentDemo title="Accordion">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger label="Accordion Item 1" />
                </AccordionItem>
              </Accordion>
            </ComponentDemo>

            <ComponentDemo title="Sheet">
              <Sheet>
                <Button>Open Sheet</Button>
              </Sheet>
            </ComponentDemo>
          </ComponentSection>

          {/* <ComponentSection title="Data Display">
            <ComponentDemo title="Table">
              <Table>
                <thead>
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Role</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">John Doe</td>
                    <td className="p-2 border">john@example.com</td>
                    <td className="p-2 border">Admin</td>
                  </tr>
                </tbody>
              </Table>
            </ComponentDemo>
          </ComponentSection> */}
        </div>
      </div>
    </div>
  );
}
