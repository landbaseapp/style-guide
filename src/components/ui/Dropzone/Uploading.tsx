import { Typography } from '../Typography';
import { ProgressBar } from '../ProgressBar';

interface UploadingProps {
  fileName: string;
}

export const Uploading = ({ fileName }: UploadingProps) => {
  return (
    <div className="flex flex-col items-center max-w-full gap-md">
      <div className="w-full text-center flex flex-wrap items-center justify-center gap-x-1">
        <Typography
          variant="body-medium"
          className="inline-block whitespace-nowrap text-on-surface"
        >
          uploading{' '}
        </Typography>
        <Typography
          variant="label-large-prominent"
          className="inline-block truncate text-on-surface"
        >
          {fileName}
        </Typography>
      </div>
      <ProgressBar size="sm" className="w-full" type="indeterminate" />
    </div>
  );
};
