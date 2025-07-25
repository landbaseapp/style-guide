import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Color Palette',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const globalColorTokens = [
  {
    category: 'Primary Tokens',
    variables: [
      '--color-primary',
      '--color-primary-hover',
      '--color-primary-active',
      '--color-on-primary',
      '--color-primary-container',
      '--color-primary-container-hover',
      '--color-primary-container-active',
      '--color-on-primary-container',
      '--color-primary-inverse',
      '--color-primary-inverse-container',
    ],
  },
  {
    category: 'Accent Tokens',
    variables: [
      '--color-accent',
      '--color-on-accent',
      '--color-accent-container',
      '--color-on-accent-container',
      '--color-accent-hover',
      '--color-accent-active',
    ],
  },
  {
    category: 'Surface Tokens',
    variables: [
      '--color-surface',
      '--color-surface-bright',
      '--color-surface-dim',
      '--color-on-surface',
      '--color-on-surface-variant',
      '--color-on-surface-muted',
      '--color-on-surface-inverse',
      '--color-surface-container-low',
      '--color-surface-container',
      '--color-surface-container-high',
      '--color-surface-container-highest',
      '--color-surface-inverse',
    ],
  },
  {
    category: 'Outline',
    variables: [
      '--color-outline',
      '--color-outline-variant',
      '--color-outline-dark',
      '--color-outline-accent',
    ],
  },
  {
    category: 'Success',
    variables: [
      '--color-success',
      '--color-on-success',
      '--color-success-container',
      '--color-on-success-container',
    ],
  },
  {
    category: 'Error',
    variables: [
      '--color-error',
      '--color-on-error',
      '--color-error-container',
      '--color-on-error-container',
    ],
  },
  {
    category: 'Warning',
    variables: [
      '--color-warning',
      '--color-on-warning',
      '--color-warning-container',
      '--color-on-warning-container',
    ],
  },
  {
    category: 'Info',
    variables: [
      '--color-info',
      '--color-on-info',
      '--color-info-container',
      '--color-on-info-container',
    ],
  },
  {
    category: 'Scrim',
    variables: ['--color-scrim', '--color-shadow-1', '--color-shadow-2'],
  },
  {
    category: 'Brand',
    variables: [
      '--color-brand-teal',
      '--color-brand-dark-green',
      '--color-brand-light-green',
      '--color-brand-white',
      '--color-brand-secondary-yellow',
      '--color-brand-secondary-orange',
      '--color-brand-secondary-lavender',
      '--color-brand-secondary-pink',
    ],
  },
];

export function Colors() {
  const style = getComputedStyle(document.documentElement);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="customtext-headline-medium text-lg font-semibold mb-6">🎨 Color Palette</h2>
      <p className="customtext-body-large text-gray-600 mb-8">
        This palette provides a visual reference for the design system&apos;s colors.
      </p>

      {/* Global Color Tokens Section */}
      <div>
        <h3 className="customtext-headline-small text-md font-medium mb-4">Global Color Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow">
          {globalColorTokens.map(({ category, variables }) => (
            <div key={category} className="space-y-2">
              <h4 className="customtext-label-large text-sm font-semibold">{category}</h4>
              <div className="grid grid-cols-4 gap-2">
                {variables.map((varName) => {
                  const color = style.getPropertyValue(varName.substring(2)).trim();
                  return (
                    <div
                      key={varName}
                      className="flex flex-col items-center p-2 rounded-lg shadow-sm bg-gray-100"
                    >
                      <div
                        className="w-14 h-14 rounded border"
                        style={{ backgroundColor: color || `var(${varName})` }}
                      />
                      <span className="customtext-label-small text-xs mt-1">{varName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ColorPalette: Story = {
  render: () => {
    return Colors();
  },
};
