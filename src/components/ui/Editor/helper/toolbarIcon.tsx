import { ButtonView, DecoupledEditor, FileDialogButtonView } from 'ckeditor5';
import { renderToStaticMarkup } from 'react-dom/server';

import { ReactComponent as BoldIcon } from 'src/assets/icons/editor/bold.svg';
import { ReactComponent as ItalicIcon } from 'src/assets/icons/editor/italic.svg';
import { ReactComponent as UnderlineIcon } from 'src/assets/icons/editor/underline.svg';
import { ReactComponent as NumberedListIcon } from 'src/assets/icons/editor/numberedList.svg';
import { ReactComponent as BulletListIcon } from 'src/assets/icons/editor/bulletedList.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/editor/link.svg';
import { ReactComponent as ImageUploadIcon } from 'src/assets/icons/editor/imageUpload.svg';
import { ReactComponent as IndentIcon } from 'src/assets/icons/editor/indent.svg';
import { ReactComponent as OutdentIcon } from 'src/assets/icons/editor/outdent.svg';
import plainIconString from 'src/assets/icons/editor/plain.svg?raw';
import codeIconString from 'src/assets/icons/editor/format.svg?raw';

export const updateToolbarIcon = (editor: DecoupledEditor) => {
  // import icons
  const boldIconString = renderToStaticMarkup(<BoldIcon />);
  const italicIconString = renderToStaticMarkup(<ItalicIcon />);
  const underlineIconString = renderToStaticMarkup(<UnderlineIcon />);

  const linkIconString = renderToStaticMarkup(<LinkIcon />);
  const imageUploadIconString = renderToStaticMarkup(<ImageUploadIcon />);

  const bulletListIconString = renderToStaticMarkup(<BulletListIcon />);
  const numberedListIconString = renderToStaticMarkup(<NumberedListIcon />);

  const indentIconString = renderToStaticMarkup(<IndentIcon />);
  const outdentIconString = renderToStaticMarkup(<OutdentIcon />);

  // fonts
  const boldView = editor.ui.view.toolbar.items.get(2) as ButtonView;

  const italicView = editor.ui.view.toolbar.items.get(3) as ButtonView;
  const underlineView = editor.ui.view.toolbar.items.get(4) as ButtonView;

  const linkView = editor.ui.view.toolbar.items.get(6) as ButtonView;
  const imageView = editor.ui.view.toolbar.items.get(7) as FileDialogButtonView;

  const bulletListView = editor.ui.view.toolbar.items.get(9) as ButtonView;
  const numberedListView = editor.ui.view.toolbar.items.get(10) as ButtonView;

  const outdentView = editor.ui.view.toolbar.items.get(12) as ButtonView;
  const indentView = editor.ui.view.toolbar.items.get(13) as ButtonView;

  boldView.set('icon', boldIconString);
  italicView.set('icon', italicIconString);
  underlineView.set('icon', underlineIconString);

  linkView.set('icon', linkIconString);
  imageView.set('icon', imageUploadIconString);

  bulletListView.set('icon', bulletListIconString);
  numberedListView.set('icon', numberedListIconString);

  outdentView.set('icon', outdentIconString);
  indentView.set('icon', indentIconString);
};

export const resetToolbar = (
  editor: DecoupledEditor,
  isPlainTextMode: boolean,
  isRichTextDisabled?: boolean
) => {
  editor.ui.view.toolbar.items.forEach((item, idx) => {
    const btn = item as ButtonView & { defaultLabel?: string };

    // Store the default label if not already stored
    if (btn.defaultLabel === undefined) {
      btn.defaultLabel = btn.label;
    }

    if (isPlainTextMode) {
      btn.label = 'Enable rich text to start formatting';
    } else {
      // Restore the default label when switching back
      if (btn.defaultLabel !== undefined) {
        btn.label = btn.defaultLabel;
      }
    }

    if (idx !== editor.ui.view.toolbar.items.length - 1) {
      btn.isEnabled = !isPlainTextMode;
    }
    if (btn.class === 'plaintext-switch') {
      btn.label = isPlainTextMode ? 'Switch to rich text' : 'Switch to plain text';
      btn.icon = isPlainTextMode ? codeIconString : plainIconString;
      btn.tooltip = isRichTextDisabled
        ? 'Rich text is not available for AI personalized campaigns'
        : isPlainTextMode
        ? 'Enable formatting options like bold, italics, list and links'
        : 'Display only raw text';
      btn.isEnabled = !isRichTextDisabled;

      // tailwind doesn't work on the first render, so we need to set the margin-left manually
      setTimeout(() => {
        if (btn.element) {
          btn.element.style.marginLeft = 'auto';
        }
      }, 0);
    }
  });
};
