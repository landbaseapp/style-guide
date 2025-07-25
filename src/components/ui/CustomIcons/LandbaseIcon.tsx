import { IconProps } from '@phosphor-icons/react';
import { forwardRef, ForwardRefExoticComponent } from 'react';

export const LandbaseIcon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_7192_29414)">
      <path
        d="M29.9146 35.5376H26.4098L21.0413 24.3901C21.017 24.3367 20.9296 24.3376 20.9053 24.3901L15.5601 35.5376H12.0854L20.2329 18.899C20.3465 18.6667 20.5875 18.5169 20.846 18.5169H21.0967C21.359 18.5169 21.5932 18.6628 21.7088 18.8981L29.9146 35.5376ZM21.7059 0.381111C21.5903 0.145833 21.3551 0 21.0938 0H20.8431C20.5846 0 20.3436 0.149722 20.2299 0.382083L11 19.2306H14.4971L20.9014 5.87417C20.9257 5.82069 21.0131 5.82069 21.0374 5.87417L27.4689 19.2306H30.999L21.7059 0.381111Z"
        fill="#004751"
      />
      <path d="M30.4014 42.0004H11V39.0371H30.4014V42.0004Z" fill="#00A09A" />
    </g>
    <defs>
      <clipPath id="clip0_7192_29414">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
));

export const LandbaseChatIcon: ForwardRefExoticComponent<IconProps> = forwardRef((props, ref) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={'20'}
      height={'20'}
      fill="none"
      {...props}
    >
      <path
        d="M16 13H13.6411L10.0278 5.79568C10.0114 5.76112 9.95259 5.76175 9.93624 5.79568L6.33866 13H4L9.48368 2.24693C9.56019 2.09676 9.72238 2 9.89634 2H10.0651C10.2416 2 10.3993 2.09425 10.4771 2.2463L16 13Z"
        fill="#004751"
      />
      <path d="M16 17H4V15H16V17Z" fill="#00A09A" />
    </svg>
  );
});
