import { cn } from 'src/utils/tw.utils';
import { Typography } from '../Typography';
import { Link } from '../Link';
import { ReactComponent as UploadIcon } from './icons/upload.svg';

interface UploadProps {
  isDragActive: boolean;
  supportedFiles: string[];
}

export const Upload = ({ isDragActive, supportedFiles }: UploadProps) => {
  return (
    <>
      {isDragActive && (
        <Typography variant="label-large" className="text-on-surface">
          Drop the files here ...
        </Typography>
      )}
      <div className={cn('flex items-center', isDragActive ? 'hidden' : 'visible')}>
        <div className="mr-4">
          <UploadIcon />
        </div>
        <Typography variant="label-large" className="text-on-surface">
          Drag and drop or <Link size="lg">choose a file</Link> from your computer.
          {supportedFiles.length < 2
            ? ` Only ${supportedFiles[0]} file type is supported.`
            : ` All ${supportedFiles.join(', ')} file types are supported`}
        </Typography>
      </div>
    </>
  );
};
