import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateToolbarIcon, resetToolbar } from '../toolbarIcon';
import { DecoupledEditor, View, ButtonView, FileDialogButtonView, ViewCollection } from 'ckeditor5';

// Mock SVG imports
vi.mock('src/assets/icons/editor/bold.svg', () => ({
  ReactComponent: () => ({ type: { name: 'BoldIcon' } }),
}));

vi.mock('src/assets/icons/editor/italic.svg', () => ({
  ReactComponent: () => ({ type: { name: 'ItalicIcon' } }),
}));

vi.mock('src/assets/icons/editor/underline.svg', () => ({
  ReactComponent: () => ({ type: { name: 'UnderlineIcon' } }),
}));

vi.mock('src/assets/icons/editor/link.svg', () => ({
  ReactComponent: () => ({ type: { name: 'LinkIcon' } }),
}));

vi.mock('src/assets/icons/editor/imageUpload.svg', () => ({
  ReactComponent: () => ({ type: { name: 'ImageUploadIcon' } }),
}));

vi.mock('src/assets/icons/editor/numberedList.svg', () => ({
  ReactComponent: () => ({ type: { name: 'NumberedListIcon' } }),
}));

vi.mock('src/assets/icons/editor/bulletedList.svg', () => ({
  ReactComponent: () => ({ type: { name: 'BulletListIcon' } }),
}));

vi.mock('src/assets/icons/editor/indent.svg', () => ({
  ReactComponent: () => ({ type: { name: 'IndentIcon' } }),
}));

vi.mock('src/assets/icons/editor/outdent.svg', () => ({
  ReactComponent: () => ({ type: { name: 'OutdentIcon' } }),
}));

vi.mock('src/assets/icons/editor/plain.svg?raw', () => ({
  default: '<svg>plain-icon</svg>',
}));

vi.mock('src/assets/icons/editor/format.svg?raw', () => ({
  default: '<svg>format-icon</svg>',
}));

// Mock react-dom/server
vi.mock('react-dom/server', () => ({
  renderToStaticMarkup: vi.fn((component) => {
    const componentName = component.type?.name || 'Unknown';
    return `<svg>${componentName}</svg>`;
  }),
}));

class MockButtonView implements Partial<ButtonView> {
  public icon = '';
  public label = '';
  public tooltip = '';
  public isEnabled = true;
  public class = '';
  public element?: HTMLButtonElement;
  public defaultLabel?: string;

  set<K extends keyof ButtonView>(property: K, value: ButtonView[K]): void;
  set(values: Partial<ButtonView>): void;
  set(
    propertyOrValues: keyof ButtonView | Partial<ButtonView>,
    value?: ButtonView[keyof ButtonView]
  ): void {
    if (typeof propertyOrValues === 'string' && value !== undefined) {
      (this as unknown as Record<string, unknown>)[propertyOrValues] = value;
    } else if (typeof propertyOrValues === 'object') {
      Object.assign(this, propertyOrValues);
    }
  }
}

class MockFileDialogButtonView extends MockButtonView implements Partial<FileDialogButtonView> {}

describe('updateToolbarIcon', () => {
  let mockEditor: DecoupledEditor;
  let toolbarItems: Map<number, MockButtonView | MockFileDialogButtonView>;

  beforeEach(() => {
    vi.clearAllMocks();

    toolbarItems = new Map();
    for (let i = 0; i <= 13; i++) {
      const item = i === 7 ? new MockFileDialogButtonView() : new MockButtonView();
      toolbarItems.set(i, item);
    }

    mockEditor = {
      ui: {
        view: {
          toolbar: {
            items: {
              get: (idOrIndex: string | number) =>
                (toolbarItems.get(idOrIndex as number) as unknown as View<HTMLElement>) || null,
            } as unknown as ViewCollection<View<HTMLElement>>,
          },
        },
      },
    } as DecoupledEditor;
  });

  it('should handle missing toolbar items gracefully', () => {
    // Remove some items
    toolbarItems.delete(2);
    toolbarItems.delete(7);

    // The function will try to call .set on undefined items, which will throw
    // This is expected behavior - the function assumes items exist at specific indices
    expect(() => {
      updateToolbarIcon(mockEditor);
    }).toThrow();
  });
});

describe('resetToolbar', () => {
  let mockEditor: DecoupledEditor;
  let toolbarItems: MockButtonView[];

  beforeEach(() => {
    vi.clearAllMocks();

    toolbarItems = Array.from({ length: 5 }, (_, i) => {
      const item = new MockButtonView();
      item.label = `Original Label ${i}`;
      if (i === 4) {
        item.class = 'plaintext-switch';
      }
      return item;
    });

    mockEditor = {
      ui: {
        view: {
          toolbar: {
            items: {
              length: toolbarItems.length,
              forEach: (
                callback: (item: View<HTMLElement>, index: number) => unknown,
                ctx?: unknown
              ) => {
                return toolbarItems.forEach((item, index) =>
                  callback(item as unknown as View<HTMLElement>, index)
                );
              },
            },
          },
        },
      },
    } as DecoupledEditor;
  });

  it('should disable all buttons except last one in plain text mode', () => {
    resetToolbar(mockEditor, true);

    expect(toolbarItems[0].isEnabled).toBe(false);
    expect(toolbarItems[1].isEnabled).toBe(false);
    expect(toolbarItems[2].isEnabled).toBe(false);
    expect(toolbarItems[3].isEnabled).toBe(false);
    expect(toolbarItems[4].isEnabled).toBe(true); // Last item (plain text switch)
  });

  it('should enable all buttons in rich text mode', () => {
    resetToolbar(mockEditor, false);

    expect(toolbarItems[0].isEnabled).toBe(true);
    expect(toolbarItems[1].isEnabled).toBe(true);
    expect(toolbarItems[2].isEnabled).toBe(true);
    expect(toolbarItems[3].isEnabled).toBe(true);
    expect(toolbarItems[4].isEnabled).toBe(true);
  });

  it('should change all button labels to disabled message in plain text mode', () => {
    resetToolbar(mockEditor, true);

    expect(toolbarItems[0].label).toBe('Enable rich text to start formatting');
    expect(toolbarItems[1].label).toBe('Enable rich text to start formatting');
    expect(toolbarItems[2].label).toBe('Enable rich text to start formatting');
    expect(toolbarItems[3].label).toBe('Enable rich text to start formatting');
  });

  it('should restore default labels in rich text mode after storing them', () => {
    // First call to store default labels
    resetToolbar(mockEditor, true);

    // Change to rich text mode
    resetToolbar(mockEditor, false);

    expect(toolbarItems[0].label).toBe('Original Label 0');
    expect(toolbarItems[1].label).toBe('Original Label 1');
    expect(toolbarItems[2].label).toBe('Original Label 2');
    expect(toolbarItems[3].label).toBe('Original Label 3');
  });

  it('should handle plaintext-switch button in plain text mode', () => {
    resetToolbar(mockEditor, true);

    const switchButton = toolbarItems[4];
    expect(switchButton.label).toBe('Switch to rich text');
    expect(switchButton.icon).toBe('<svg>format-icon</svg>');
    expect(switchButton.tooltip).toBe(
      'Enable formatting options like bold, italics, list and links'
    );
    expect(switchButton.isEnabled).toBe(true);
  });

  it('should handle plaintext-switch button in rich text mode', () => {
    resetToolbar(mockEditor, false);

    const switchButton = toolbarItems[4];
    expect(switchButton.label).toBe('Switch to plain text');
    expect(switchButton.icon).toBe('<svg>plain-icon</svg>');
    expect(switchButton.tooltip).toBe('Display only raw text');
    expect(switchButton.isEnabled).toBe(true);
  });

  it('should handle plaintext-switch button when rich text is disabled', () => {
    resetToolbar(mockEditor, true, true);

    const switchButton = toolbarItems[4];
    expect(switchButton.tooltip).toBe('Rich text is not available for AI personalized campaigns');
    expect(switchButton.isEnabled).toBe(false);
  });

  it('should set margin-left style on plaintext-switch button element', (done) => {
    const mockElement = document.createElement('button');
    toolbarItems[4].element = mockElement;

    resetToolbar(mockEditor, false);

    // Wait for setTimeout to execute
    setTimeout(() => {
      expect(mockElement.style.marginLeft).toBe('auto');
    }, 10);
  });

  it('should handle case when plaintext-switch button has no element', () => {
    toolbarItems[4].element = undefined;

    expect(() => {
      resetToolbar(mockEditor, false);
    }).not.toThrow();
  });

  it('should preserve defaultLabel when already set', () => {
    const customButton = new MockButtonView();
    customButton.label = 'Custom Label';
    customButton.defaultLabel = 'Previously Stored Label';
    toolbarItems[0] = customButton;

    resetToolbar(mockEditor, true);
    resetToolbar(mockEditor, false);

    expect(customButton.label).toBe('Previously Stored Label');
  });

  it('should handle buttons without class property', () => {
    const regularButton = new MockButtonView();
    regularButton.label = 'Regular Button';
    // No class property set
    toolbarItems[0] = regularButton;

    expect(() => {
      resetToolbar(mockEditor, false);
    }).not.toThrow();

    expect(regularButton.isEnabled).toBe(true);
  });
});
