import { ButtonView, Plugin } from 'ckeditor5';
import plainIconString from 'src/assets/icons/editor/plain.svg?raw';
import codeIconString from 'src/assets/icons/editor/format.svg?raw';

export const getPlainTextSwitchPlugin = (
  isPlainTextMode: boolean,
  onChangePlainTextMode: () => void,
  isRichTextDisabled?: boolean
) => {
  return class PlainTextSwitchPlugin extends Plugin {
    init() {
      const editor = this.editor;
      // The button must be registered among the UI components of the editor
      // to be displayed in the toolbar.

      editor.ui.componentFactory.add('plaintextSwitch', () => {
        // The button will be an instance of ButtonView.
        const button = new ButtonView();

        button.set({
          label: isPlainTextMode ? 'Switch to rich text' : 'Switch to plain text',
          labelStyle: `color: var(--on-surface-muted); line-height: 30px`,
          withText: true,
          icon: isPlainTextMode ? codeIconString : plainIconString,
          class: 'plaintext-switch',
          isEnabled: !isRichTextDisabled,
          tooltip: isRichTextDisabled
            ? 'Personalized AI messages are only available as plain text'
            : isPlainTextMode
            ? 'Enable formatting options like bold, italics, list and links'
            : 'Display only raw text',
        });

        button.on('execute', () => {
          if (!isRichTextDisabled) {
            onChangePlainTextMode();
          }
        });

        return button;
      });
    }
  };
};
