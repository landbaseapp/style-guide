import { Typography } from '../Typography';

export interface SettingHeaderProps {
  label?: string;
  mainAction?: React.ReactNode;
}

export const SettingHeader = ({ label, mainAction }: SettingHeaderProps) => {
  if (!label && !mainAction) {
    return null;
  }

  if (!label && mainAction) {
    return <div className="flex justify-end">{mainAction}</div>;
  }

  return (
    <div className="flex justify-between items-center pb-sm border-b border-outline-variant">
      <div>
        <Typography variant="headline-medium" className="truncate max-w-full text-on-surface">
          {label}
        </Typography>
      </div>
      <div>{mainAction}</div>
    </div>
  );
};
SettingHeader.displayName = 'SettingHeader';
