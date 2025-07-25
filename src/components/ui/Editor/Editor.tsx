import { Ref, useEffect, useMemo, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  DecoupledEditor,
  EditorConfig,
  Enter,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  SimpleUploadAdapter,
  TextTransformation,
  Underline,
  Undo,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { useUploadAdapter } from './helper/useUploadAdapter';
import { resetToolbar, updateToolbarIcon } from './helper/toolbarIcon';
import { getCustomStylesPlugin } from './helper/customStylesPlugin';
import { getPlainTextSwitchPlugin } from './helper/plainTextSwitchPlugin';
import { overrideDropdownPositionsToNorth } from './helper/dropdownPosition';
import { Banner } from '../Banner';
import { cn } from 'src/utils/tw.utils';
import { editorTailwindStyles } from './style';
import './styles.css';

export type EditorProps = Omit<
  React.ComponentProps<typeof CKEditor<DecoupledEditor>>,
  'editor' | 'ref' | 'config'
> & {
  placeholder?: string;
  rootCustomStyles?: Record<string, string>;
  editorRef?: Ref<CKEditor<DecoupledEditor>>;
  plainText: boolean;
  onChangePlainText: () => void;
  onlyPlainTextAllowed?: boolean;
};

export const Editor = ({
  placeholder,
  editorRef,
  rootCustomStyles,
  plainText,
  onChangePlainText,
  onlyPlainTextAllowed,
  data = '',
  ...rest
}: EditorProps) => {
  const uploadAdapter = useUploadAdapter();
  const editorInstanceRef = useRef<DecoupledEditor>();
  const editorToolbarRef = useRef<HTMLDivElement>(null);

  const [showWarning, setShowWarning] = useState(!plainText);

  useEffect(() => {
    if (editorInstanceRef.current) {
      resetToolbar(editorInstanceRef.current, plainText, onlyPlainTextAllowed);
      setShowWarning(!plainText);
    }
  }, [onlyPlainTextAllowed, plainText]);

  const editorConfig = useMemo(
    () =>
      ({
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'uploadImage',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            'plaintextSwitch',
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          AccessibilityHelp,
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BlockQuote,
          Bold,
          Essentials,
          GeneralHtmlSupport,
          Heading,
          Image,
          ImageCaption,
          ImageResize,
          ImageStyle,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          Paragraph,
          SelectAll,
          SimpleUploadAdapter,
          TextTransformation,
          Enter,
          Underline,
          PasteFromOffice,
          Undo,
          Enter,
        ],
        extraPlugins: [
          uploadAdapter,
          getCustomStylesPlugin({ rootCustomStyles }),
          getPlainTextSwitchPlugin(plainText, onChangePlainText, onlyPlainTextAllowed),
        ],
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage',
          ],
        },
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            {
              model: 'heading1',
              title: 'Heading 1',
              class: 'ck-heading_heading1',
              view: {
                name: 'h2',
                classes: 'ck-heading_heading1',
              },
            },
            {
              model: 'heading2',
              title: 'Heading 2',
              class: 'ck-heading_heading2',
              view: {
                name: 'h3',
                classes: 'ck-heading_heading2',
              },
            },
            {
              model: 'heading3',
              title: 'Heading 3',
              class: 'ck-heading_heading3',
              view: {
                name: 'h4',
                classes: 'ck-heading_heading3',
              },
            },
          ],
        },
        placeholder,
      } as EditorConfig),
    [uploadAdapter, rootCustomStyles, plainText, onChangePlainText, placeholder]
  );

  return (
    <div className={cn(...editorTailwindStyles)}>
      <div>
        <CKEditor
          {...rest}
          data={data}
          ref={editorRef}
          editor={DecoupledEditor}
          config={editorConfig}
          onReady={(editor) => {
            editorInstanceRef.current = editor;

            if (editorToolbarRef.current) {
              editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element as Node);
              updateToolbarIcon(editor);

              const editorToolbar = editor.ui.view.toolbar;
              overrideDropdownPositionsToNorth(editor, editorToolbar);

              editor.on('plaintextSwitch', (_event, value) => {
                resetToolbar(editor, value, onlyPlainTextAllowed);
              });

              resetToolbar(editor, plainText, onlyPlainTextAllowed);
            }
          }}
          onAfterDestroy={() => {
            if (editorToolbarRef.current) {
              Array.from(editorToolbarRef.current.children).forEach((child) => child.remove());
            }
          }}
        />
      </div>
      {showWarning && (
        <div className="px-sm py-2xs">
          <Banner
            variant="info"
            description="Rich text messages may affect delivery performance."
            onClose={() => setShowWarning(false)}
            border="bottom"
            className="w-full rounded-md border-none"
          />
        </div>
      )}
      <div ref={editorToolbarRef} />
    </div>
  );
};
