import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  CustomAccordionTrigger,
} from './Accordion';
import { Question } from '@phosphor-icons/react';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger label="Is it accessible?" icon={Question} />
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern. And it is styled with the other
          components.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger label="Is it styled?" />
        <AccordionContent>
          Yes. It comes with default styles that match the other components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <CustomAccordionTrigger>
          You can also have custom trigger with anything
        </CustomAccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger label="Can I open multiple items?" />
        <AccordionContent>Yes. Just set the type prop to &quot;multiple&quot;.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <CustomAccordionTrigger>
          You can also have custom trigger with anything
        </CustomAccordionTrigger>
        <AccordionContent>
          Maybe! Try clicking another item while keeping this one open.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
