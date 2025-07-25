import { Icon, IconProps } from '@phosphor-icons/react';

export const unwrapIcon = (icon: Icon, size = 24, props?: IconProps) => {
  const IconComponent = icon;
  return <IconComponent size={size} className="flex-shrink-0" {...props} />;
};
