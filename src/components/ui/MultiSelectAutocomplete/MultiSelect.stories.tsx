import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';
import { SelectOption } from './utils';
import { Typography } from '../Typography/Typography';
import { useState } from 'react';
import { fn } from '@storybook/test';

const FRAMEWORKS = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
  {
    value: 'wordpress',
    label: 'WordPress',
  },
  {
    value: 'express.js',
    label: 'Express.js',
  },
  {
    value: 'nest.js',
    label: 'Nest.js',
  },
] satisfies SelectOption[];

const meta = {
  title: 'Composite-UI/MultiSelect',
  component: MultiSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: FRAMEWORKS,
    initialSearchValue: '',
    showMaxSelected: 3,
    selectedOptions: [FRAMEWORKS[0]],
    setSelectedOptions: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([FRAMEWORKS[0]]);
      return (
        <div className="w-[300px] h-[300px] gap-2xs flex flex-col">
          <Typography variant="label-large">Width can be set on the parent element</Typography>
          <code>
            <Typography variant="label-medium">
              Selected State: {selected.map((s) => s.label).join(', ')}
            </Typography>
          </code>
          <MultiSelect
            options={FRAMEWORKS}
            initialSearchValue=""
            selectedOptions={selected}
            setSelectedOptions={setSelected}
            showMaxSelected={3}
          />
        </div>
      );
    };
    return <Example />;
  },
};

export const FreeSolo: Story = {
  args: {
    options: FRAMEWORKS,
    initialSearchValue: '',
    showMaxSelected: 3,
    freeSolo: true,
    selectedOptions: [],
    setSelectedOptions: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      return (
        <div className="w-[300px]">
          <Typography variant="label-large">
            Free solo input can be used to mix free options and pre-selected options
          </Typography>
          <MultiSelect
            freeSolo
            options={FRAMEWORKS}
            initialSearchValue=""
            selectedOptions={selected}
            setSelectedOptions={setSelected}
            showMaxSelected={3}
          />
        </div>
      );
    };
    return <Example />;
  },
};

export const Loading: Story = {
  args: {
    options: [],
    initialSearchValue: '',
    showMaxSelected: 3,
    loading: true,
    selectedOptions: [],
    setSelectedOptions: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      return (
        <div className="w-[300px]">
          <Typography variant="label-large">
            Free solo input can be used to mix free options and pre-selected options
          </Typography>
          <MultiSelect
            options={[]}
            loading
            initialSearchValue=""
            selectedOptions={selected}
            setSelectedOptions={setSelected}
            showMaxSelected={3}
          />
        </div>
      );
    };
    return <Example />;
  },
};

export const MultiSelectWithSameLabel: Story = {
  args: {
    options: [],
    initialSearchValue: '',
    showMaxSelected: 3,
    loading: true,
    selectedOptions: [],
    setSelectedOptions: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      return (
        <div className="w-[300px]">
          <Typography variant="label-large">
            Free solo input can be used to mix free options and pre-selected options
          </Typography>
          <MultiSelect
            options={[
              {
                value: '1',
                label: 'Tag',
              },
              {
                value: '2',
                label: 'Tag',
              },
              {
                value: '3',
                label: 'Tag',
              },
            ]}
            loading
            initialSearchValue=""
            selectedOptions={selected}
            setSelectedOptions={setSelected}
            showMaxSelected={3}
          />
        </div>
      );
    };
    return <Example />;
  },
};
