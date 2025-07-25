import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  override: { theme: { spacing: ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
