export const editorTailwindStyles = [
  // toolbar
  '[&_.ck.ck-toolbar]:border-on-primary',
  '[&_.ck.ck-toolbar]:border-l-0 [&_.ck.ck-toolbar]:border-r-0 [&_.ck.ck-toolbar]:border-t-0 [&_.ck.ck-toolbar]:rounded-none [&_.ck.ck-toolbar]:relative',

  // content area
  '[&_.ck-content]:border-on-primary [&_.ck-content]:rounded-none [&_.ck-content]:border-l-0 [&_.ck-content]:border-r-0 [&_.ck-content]:border-b-0',

  // placeholder
  '[&_.ck-placeholder]:border-outline-dark [&_.ck-placeholder]:opacity-38 [&_.ck-placeholder]:font-normal',

  // editable remove border-radius
  '[&_.ck.ck-editor__editable.ck-rounded-corners:not(.ck-editor__nested-editable)]:rounded-none',
  '[&_.ck-rounded-corners_.ck.ck-editor__editable:not(.ck-editor__nested-editable)]:rounded-none',

  // focus remove border
  '[&_.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable)]:border-0',

  // remove toolbar border
  '[&_.ck.ck-toolbar.ck-toolbar_grouping]:border-0',

  // Switch button only on the right
  '[&_.ck-toolbar__items]:relative',
  '[&_.ck-toolbar__items>.ck-button_with-text]:absolute [&_.ck-toolbar__items>.ck-button_with-text]:right-3',

  // adjust icon size
  '[&_.ck-button__icon]:w-4 [&_.ck-button__icon]:h-4',
];
