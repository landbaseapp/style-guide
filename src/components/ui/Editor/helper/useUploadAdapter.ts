import { Editor } from 'ckeditor5';
import { useFileUpload } from 'src/data/hooks/useFileUpload';

export const useUploadAdapter = () => {
  const { useUploadPublicFile } = useFileUpload();
  const { mutateAsync: upload } = useUploadPublicFile();
  function uploadAdapter(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return {
        upload: async () => {
          try {
            const file = await loader.file;
            if (!file) {
              return Promise.reject('File not provided');
            }
            const publicUrl = await upload({ file });
            return {
              default: publicUrl,
            };
          } catch {
            return Promise.reject('File upload failure');
          }
        },
      };
    };
  }

  return uploadAdapter;
};
