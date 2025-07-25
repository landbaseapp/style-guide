import { X } from '@phosphor-icons/react';
import { Typography } from '../Typography';
import { IconButton } from '../Button';
import { ReactComponent as UploadedIcon } from './icons/uploaded.svg';

interface UploadedProps {
  onRemoveFile: () => void;
  fileName: string;
  fileSize: number;
}

export const Uploaded = ({ fileName, fileSize, onRemoveFile }: UploadedProps) => {
  return (
    <div className="flex items-center max-w-full">
      <IconButton
        icon={X}
        onClick={onRemoveFile}
        color="inherit"
        className="absolute top-2 right-2"
      />
      <div className="mr-md">
        <UploadedIcon />
      </div>
      <Typography variant="label-large" className="max-w-full truncate text-on-surface">
        File {fileName} uploaded: {fileSize}
      </Typography>
    </div>
  );
};
