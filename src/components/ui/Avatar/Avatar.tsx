import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from 'src/utils/tw.utils';
import { Icon } from '@phosphor-icons/react';
import { unwrapIcon } from '../Icon';

const avatarSizes = {
  xl: {
    dimensions: 'h-[56px] w-[56px] customtext-title-large',
    border: 'border-[4px]',
    groupSpacing: '-space-x-[20px]',
    iconSize: 24,
  },
  lg: {
    dimensions: 'h-[48px] w-[48px] customtext-title-medium',
    border: 'border-[4px]',
    groupSpacing: '-space-x-[16px]',
    iconSize: 20,
  },
  md: {
    dimensions: 'h-[40px] w-[40px] customtext-label-large',
    border: 'border-[3px]',
    groupSpacing: '-space-x-[12px]',
    iconSize: 16,
  },
  sm: {
    dimensions: 'h-[32px] w-[32px] customtext-label-medium',
    border: 'border-[2px]',
    groupSpacing: '-space-x-[8px]',
    iconSize: 12,
  },
  xs: {
    dimensions: 'h-[24px] w-[24px] customtext-label-small',
    border: 'border-[1px]',
    groupSpacing: '-space-x-[4px]',
    iconSize: 12,
  },
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    className?: string;
    size: keyof typeof avatarSizes;
  }
>(({ className, size = 'md', ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex shrink-0 overflow-hidden rounded-full bg-info-container',
      avatarSizes[size].dimensions,
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarIcon = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
    className?: string;
    icon: Icon;
    size: keyof typeof avatarSizes;
  }
>(({ className, icon, size = 'md', ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-info-container text-on-info-container',
      className
    )}
    {...props}
  >
    {unwrapIcon(icon, avatarSizes[size].iconSize)}
  </AvatarPrimitive.Fallback>
));
AvatarIcon.displayName = AvatarPrimitive.Fallback.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-info-container text-on-info-container',
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface Avatars {
  src?: string;
  alt?: string;
  icon?: Icon;
  fallback?: string | React.ReactNode;
}

const AvatarGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    className?: string;
    size: keyof typeof avatarSizes;
    avatars: Avatars[];
    maxAvatarsToShow?: number;
  }
>(({ className, size = 'md', avatars, maxAvatarsToShow = 3, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex', avatarSizes[size].groupSpacing, className)} {...props}>
      {avatars.slice(0, maxAvatarsToShow).map((avatar, index) => (
        <Avatar key={index} size={size} className={cn('border-white', avatarSizes[size].border)}>
          {avatar.src && <AvatarPrimitive.AvatarImage src={avatar.src} alt={avatar.alt} />}
          {avatar.icon && !avatar.src && <AvatarIcon icon={avatar.icon} size={size} />}
          {avatar.fallback && <AvatarFallback>{avatar.fallback}</AvatarFallback>}
        </Avatar>
      ))}
      {avatars.length > maxAvatarsToShow && (
        <Avatar size={size} className={cn('border-white', avatarSizes[size].border)}>
          <AvatarFallback>{`+${avatars.length - maxAvatarsToShow}`}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
});
AvatarGroup.displayName = 'AvatarGroup';

export { Avatar, AvatarImage, AvatarIcon, AvatarFallback, AvatarGroup };
