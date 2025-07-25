import type { Meta, StoryObj } from '@storybook/react';
import {
  TagSelect,
  TagSelectContent,
  TagSelectItem,
  TagSelectTrigger,
  TagSelectValue,
} from './TagSelect';
import { useRef, useState } from 'react';

const meta = {
  title: 'Components/TagSelect',
  component: TagSelect,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TagSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const Example = () => {
      const [selected, setSelected] = useState<string | undefined>(undefined);
      const triggerRef = useRef<HTMLButtonElement>(null);

      return (
        <div className="flex flex-col gap-2 h-[300px]">
          <TagSelect onValueChange={setSelected}>
            <TagSelectTrigger className="w-[200px]" triggerRef={triggerRef}>
              <TagSelectValue placeholder="Select a tag..." />
            </TagSelectTrigger>
            <TagSelectContent triggerRef={triggerRef} className="w-[200px] w-full">
              <TagSelectItem value="red" selected={selected === 'red'}>
                Red
              </TagSelectItem>
              <TagSelectItem value="blue" selected={selected === 'blue'}>
                Blue
              </TagSelectItem>
              <TagSelectItem value="green" selected={selected === 'green'}>
                Green
              </TagSelectItem>
              <TagSelectItem value="yellow" selected={selected === 'yellow'}>
                Yellow
              </TagSelectItem>
            </TagSelectContent>
          </TagSelect>

          <p>Selected: &quot;{selected}&quot;</p>
        </div>
      );
    };
    return <Example />;
  },
};
