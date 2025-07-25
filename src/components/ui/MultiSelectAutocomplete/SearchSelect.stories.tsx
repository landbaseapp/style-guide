import type { Meta, StoryObj } from '@storybook/react';
import { SearchSelect, SelectOption } from './SearchSelect';
import { useState } from 'react';
import { Typography } from '../Typography/Typography';
import { fn } from '@storybook/test';
import { Bicycle, Bus, Car, PersonSimpleBike, Train } from '@phosphor-icons/react';

const meta = {
  title: 'Composite-UI/SearchSelect',
  component: SearchSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SearchSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
] as SelectOption[];

const withIocn = [
  { value: '1', label: 'Option 1', icon: PersonSimpleBike },
  { value: '2', label: 'Option 2', icon: Bicycle },
  { value: '3', label: 'Option 3', icon: Car },
  { value: '4', label: 'Option 4', icon: Bus },
  { value: '5', label: 'Option 5', icon: Train },
] as SelectOption[];

export const Default: Story = {
  args: {
    options,
    inputValue: '',
    setInputValue: fn(),
    onChange: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      const [inputValue, setInputValue] = useState('');

      return (
        <div className="w-[300px] h-[300px]">
          <SearchSelect
            setInputValue={setInputValue}
            inputValue={inputValue}
            options={options}
            onChange={(option) => setSelected(option ? [option] : [])}
          />
          <Typography variant="body-small">Selected: {JSON.stringify(selected)}</Typography>
        </div>
      );
    };
    return <Example />;
  },
};

export const WithLabel: Story = {
  args: {
    options,
    label: 'Select Option',
    inputValue: '',
    setInputValue: fn(),
    onChange: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      const [inputValue, setInputValue] = useState('');

      return (
        <div className="w-[300px] h-[300px]">
          <SearchSelect
            label="Select Option"
            setInputValue={setInputValue}
            inputValue={inputValue}
            options={options}
            onChange={(option) => setSelected(option ? [option] : [])}
          />
          <Typography variant="body-small">Selected: {JSON.stringify(selected)}</Typography>
        </div>
      );
    };
    return <Example />;
  },
};

export const WithIcon: Story = {
  args: {
    options,
    label: 'Select Option',
    inputValue: '',
    setInputValue: fn(),
    onChange: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      const [inputValue, setInputValue] = useState('');

      return (
        <div className="w-[300px] h-[300px]">
          <SearchSelect
            label="Select Option"
            setInputValue={setInputValue}
            inputValue={inputValue}
            options={withIocn}
            onChange={(option) => setSelected(option ? [option] : [])}
          />
          <Typography variant="body-small">Selected: {JSON.stringify(selected)}</Typography>
        </div>
      );
    };
    return <Example />;
  },
};

export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    placeholder: 'Loading options...',
    inputValue: '',
    setInputValue: fn(),
    onChange: fn(),
  },
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<SelectOption[]>([]);
      const [inputValue, setInputValue] = useState('');

      return (
        <div className="w-[300px] h-[300px]">
          <SearchSelect
            options={[]}
            loading={true}
            placeholder="Loading options..."
            setInputValue={setInputValue}
            inputValue={inputValue}
            onChange={(option) => setSelected(option ? [option] : [])}
          />
          <Typography variant="body-small">Selected: {JSON.stringify(selected)}</Typography>
        </div>
      );
    };
    return <Example />;
  },
};
