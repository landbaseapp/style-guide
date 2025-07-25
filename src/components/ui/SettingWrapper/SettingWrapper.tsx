import React from 'react';
import { SettingHeaderProps, SettingHeader } from './SettingHeader';
import { Loading } from '../Loading/Loading';
export interface SettingWrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SettingHeaderProps {
  className?: string;
  isLoading?: boolean;
}

export const SettingWrapper = React.forwardRef<HTMLDivElement, SettingWrapperProps>(
  ({ label, className, children, mainAction, isLoading, ...divProps }, ref) => {
    const settingHeaderProps = { mainAction, label };

    return (
      <div ref={ref} className={className} {...divProps}>
        <SettingHeader {...settingHeaderProps} />
        <div className="flex flex-col gap-lg mt-lg">
          {isLoading ? (
            <div className="flex justify-center items-center h-full min-h-full pt-lg">
              <Loading size={40} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    );
  }
);
SettingWrapper.displayName = 'SettingWrapper';
