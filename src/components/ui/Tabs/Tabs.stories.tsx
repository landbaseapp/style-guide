import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { GeneralTabs, TabConfig } from './GeneralTabs';
import { User, ChartBar, Users, EnvelopeSimple } from '@phosphor-icons/react';
import { Badge } from '../Badge';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'UI/Tabs',
  component: GeneralTabs,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof GeneralTabs>;

export default meta;
type Story = StoryObj<typeof GeneralTabs>;

const tabsConfig: TabConfig[] = [
  {
    value: '1',
    leftIcon: ChartBar,
    label: 'Overview',
    panelComponent: <div>Overview content</div>,
  },
  {
    value: '2',
    leftIcon: Users,
    label: 'Contacts',
    panelComponent: <div>Contacts content</div>,
  },
  {
    value: '3',
    leftIcon: EnvelopeSimple,
    label: 'Email',
    panelComponent: <div>Email content</div>,
  },
];

export const GeneralTabsExample: Story = {
  args: {
    tabConfigs: tabsConfig,
  },
};

export const GeneralTabsExampleWithBackground: Story = {
  args: {
    tabConfigs: tabsConfig.map((tab) => ({
      ...tab,
      hasBackground: true,
    })),
  },
};

export const SampleTabsTrigger: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" {...args}>
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
  ),
};

export const ScrollableTabsTrigger: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList className="overflow-x-auto max-w-[400px]">
        <TabsTrigger value="tab1" label="Tab 1" leftIcon={User} />
        <TabsTrigger value="tab2" label="Tab 2" leftIcon={User} />
        <TabsTrigger value="tab3" label="Tab 3" leftIcon={User} />
        <TabsTrigger value="tab4" label="Tab 4" leftIcon={User} />
        <TabsTrigger value="tab5" label="Tab 5" leftIcon={User} />
        <TabsTrigger value="tab6" label="Tab 6" leftIcon={User} />
        <TabsTrigger value="tab7" label="Tab 7" leftIcon={User} />
        <TabsTrigger value="tab8" label="Tab 8" leftIcon={User} />
        <TabsTrigger value="tab9" label="Tab 9" leftIcon={User} />
      </TabsList>
      <TabsContent value="tab1">Tab 1 content</TabsContent>
      <TabsContent value="tab2">Tab 2 content</TabsContent>
      <TabsContent value="tab3">Tab 3 content</TabsContent>
      <TabsContent value="tab4">Tab 4 content</TabsContent>
      <TabsContent value="tab5">Tab 5 content</TabsContent>
      <TabsContent value="tab6">Tab 6 content</TabsContent>
      <TabsContent value="tab7">Tab 7 content</TabsContent>
      <TabsContent value="tab8">Tab 8 content</TabsContent>
      <TabsContent value="tab9">Tab 9 content</TabsContent>
    </Tabs>
  ),
};

export const VerticalTabs: Story = {
  render: (args) => (
    <Tabs defaultValue="tab1" {...args}>
      <TabsList className="overflow-x-auto max-w-[400px]">
        <TabsTrigger value="tab1" vertical label="Tab 1" leftIcon={User} />
        <TabsTrigger value="tab2" vertical label="Tab 2" leftIcon={User} />
        <TabsTrigger value="tab3" vertical label="Tab 3" leftIcon={User} />
        <TabsTrigger value="tab4" vertical label="Tab 4" leftIcon={User} />
      </TabsList>
      <TabsContent value="tab1">Tab 1 content</TabsContent>
      <TabsContent value="tab2">Tab 2 content</TabsContent>
      <TabsContent value="tab3">Tab 3 content</TabsContent>
      <TabsContent value="tab4">Tab 4 content</TabsContent>
    </Tabs>
  ),
};
