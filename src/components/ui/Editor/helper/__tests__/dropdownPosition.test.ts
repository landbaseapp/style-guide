import { Message } from '@ckeditor/ckeditor5-utils/src/translation-service';
import { DecoupledEditor, Locale, ToolbarView, View } from 'ckeditor5';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Create mock functions and classes before importing
const mockGetOptimalPosition = vi.fn();
const mockDefaultPanelPositions = {
  south: 'south',
  north: 'north',
  southEast: 'southEast',
  southWest: 'southWest',
  northEast: 'northEast',
  northWest: 'northWest',
  southMiddleEast: 'southMiddleEast',
  southMiddleWest: 'southMiddleWest',
  northMiddleEast: 'northMiddleEast',
  northMiddleWest: 'northMiddleWest',
};

class MockDropdownView {
  static defaultPanelPositions = mockDefaultPanelPositions;

  isOpen = false;
  panelView = {
    element: document.createElement('div'),
    position: '',
  };
  buttonView = {
    element: document.createElement('button'),
  };
  // eslint-disable-next-line @typescript-eslint/ban-types
  private listeners: { [key: string]: Function[] } = {};

  // eslint-disable-next-line @typescript-eslint/ban-types
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  trigger(event: string, ...args: unknown[]) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(...args));
    }
  }
}

// Mock CKEditor5 modules
vi.mock('ckeditor5', () => ({
  getOptimalPosition: mockGetOptimalPosition,
  DropdownView: MockDropdownView,
}));

// Import after mocking
const { overrideDropdownPositionsToNorth } = await import('../dropdownPosition');

class TestButtonView {
  // Not a dropdown, should be skipped
  on = vi.fn();
}

describe('overrideDropdownPositionsToNorth', () => {
  let mockEditor: DecoupledEditor;
  let mockToolbarView: ToolbarView;
  let mockDropdown1: MockDropdownView;
  let mockDropdown2: MockDropdownView;
  let mockButton: TestButtonView;

  beforeEach(() => {
    vi.clearAllMocks();

    mockGetOptimalPosition.mockReturnValue({
      name: 'northEast',
    });

    mockDropdown1 = new MockDropdownView();
    mockDropdown2 = new MockDropdownView();
    mockButton = new TestButtonView();
    mockToolbarView = {
      items: [mockDropdown1, mockButton, mockDropdown2],
      _parentElement: null,
      destroy: vi.fn(),
      setParent: vi.fn(),
      delegate: vi.fn(),
    } as unknown as ToolbarView;
    mockEditor = {
      locale: {
        uiLanguageDirection: 'ltr',
        uiLanguage: '',
        contentLanguage: '',
        contentLanguageDirection: 'ltr',
        language: '',
        t: () => '',
        _t: undefined,
      },
    } as unknown as DecoupledEditor;
  });

  it('should call getOptimalPosition with correct LTR panel positions when dropdown opens', () => {
    overrideDropdownPositionsToNorth(mockEditor, mockToolbarView);

    mockDropdown1.isOpen = true;
    mockDropdown1.trigger('change:isOpen');

    expect(mockGetOptimalPosition).toHaveBeenCalledWith({
      element: mockDropdown1.panelView.element,
      target: mockDropdown1.buttonView.element,
      fitInViewport: true,
      positions: [
        'northEast',
        'northWest',
        'northMiddleEast',
        'northMiddleWest',
        'north',
        'southEast',
        'southWest',
        'southMiddleEast',
        'southMiddleWest',
        'south',
      ],
    });
  });
  it('should call getOptimalPosition with correct RTL panel positions when dropdown opens', () => {
    const mockEditorRTL = {
      locale: {
        uiLanguageDirection: 'rtl',
      },
    } as DecoupledEditor;
    overrideDropdownPositionsToNorth(mockEditorRTL, mockToolbarView);

    mockDropdown1.isOpen = true;
    mockDropdown1.trigger('change:isOpen');

    expect(mockGetOptimalPosition).toHaveBeenCalledWith({
      element: mockDropdown1.panelView.element,
      target: mockDropdown1.buttonView.element,
      fitInViewport: true,
      positions: [
        'northWest',
        'northEast',
        'northMiddleWest',
        'northMiddleEast',
        'north',
        'southWest',
        'southEast',
        'southMiddleWest',
        'southMiddleEast',
        'south',
      ],
    });
  });

  it('should set the panel position to the optimal position name', () => {
    overrideDropdownPositionsToNorth(mockEditor, mockToolbarView);

    mockDropdown1.isOpen = true;
    mockDropdown1.trigger('change:isOpen');

    expect(mockDropdown1.panelView.position).toBe('northEast');
  });

  it('should not call getOptimalPosition when dropdown is not open', () => {
    overrideDropdownPositionsToNorth(mockEditor, mockToolbarView);

    mockDropdown1.isOpen = false;
    mockDropdown1.trigger('change:isOpen');

    expect(mockGetOptimalPosition).not.toHaveBeenCalled();
  });

  it('should skip non-dropdown items', () => {
    overrideDropdownPositionsToNorth(mockEditor, mockToolbarView);

    expect(mockButton.on).not.toHaveBeenCalled();
  });

  it('should handle multiple dropdown items independently', () => {
    overrideDropdownPositionsToNorth(mockEditor, mockToolbarView);

    mockDropdown1.isOpen = true;
    mockDropdown2.isOpen = false;

    mockDropdown1.trigger('change:isOpen');
    mockDropdown2.trigger('change:isOpen');

    expect(mockGetOptimalPosition).toHaveBeenCalledTimes(1);
    expect(mockDropdown1.panelView.position).toBe('northEast');
    expect(mockDropdown2.panelView.position).toBe('');
  });

  it('should handle case when getOptimalPosition returns null', () => {
    mockGetOptimalPosition.mockReturnValue(null);

    overrideDropdownPositionsToNorth(mockEditor, mockToolbarView);

    mockDropdown1.isOpen = true;
    mockDropdown1.trigger('change:isOpen');

    expect(mockDropdown1.panelView.position).toBeUndefined();
  });
});
