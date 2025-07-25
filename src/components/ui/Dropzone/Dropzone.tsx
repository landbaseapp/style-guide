import { useMemo } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import { cn } from 'src/utils/tw.utils';
import { Upload } from './Upload';
import { Uploading } from './Uploading';
import { Uploaded } from './Uploaded';

interface DropzoneProps {
  file: File | null;
  processing: boolean;
  onDropFile: (file: File) => void;
  onRemoveFile: () => void;
  accept: Accept;
}

export const Dropzone = ({ onDropFile, onRemoveFile, processing, file, accept }: DropzoneProps) => {
  const onDropSingleFile = (files: File[]) => {
    onDropFile(files[0]);
  };

  const supportedFiles = useMemo(() => Object.values(accept).flat(), [accept]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropSingleFile,
    disabled: !!file,
    accept,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative flex items-center justify-center w-full px-2xl py-lg min-h-[120px]',
        'bg-primary-container border border-dashed rounded-lg',
        isDragActive ? 'border-info' : 'border-outline-variant'
      )}
    >
      <input {...getInputProps()} />
      {!file && <Upload isDragActive={isDragActive} supportedFiles={supportedFiles} />}
      {file && processing && <Uploading fileName={file.name} />}
      {file && !processing && (
        <Uploaded fileName={file.name} fileSize={file.size} onRemoveFile={onRemoveFile} />
      )}
    </div>
  );
};
