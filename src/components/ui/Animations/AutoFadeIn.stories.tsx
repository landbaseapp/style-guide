import type { Meta, StoryObj } from '@storybook/react';
import { AutoFadeInProvider, AutoFadeInAnimation } from './AutoFadeIn';

const meta: Meta<typeof AutoFadeInAnimation> = {
  title: 'UI/Animations/AutoFadeInWrapper',
  component: AutoFadeInAnimation,
  decorators: [
    (Story) => (
      <AutoFadeInProvider enabled>
        <Story />
      </AutoFadeInProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AutoFadeInAnimation>;

export const Default: Story = {
  render: () => (
    <div>
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Replay Animation
        </button>
      </div>
      <AutoFadeInAnimation viewId="first" animationDelayMs={200}>
        <div>First item fades in</div>
      </AutoFadeInAnimation>
      <AutoFadeInAnimation viewId="second" animationDelayMs={200}>
        <div>Second item fades in with delay</div>
      </AutoFadeInAnimation>
      <AutoFadeInAnimation viewId="third" animationDelayMs={200}>
        <div>Third item fades in with more delay</div>
      </AutoFadeInAnimation>
    </div>
  ),
};
