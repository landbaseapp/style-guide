import { DecoupledEditor, getOptimalPosition, ToolbarView } from 'ckeditor5';
import { PanelPosition } from '@ckeditor/ckeditor5-ui/src/dropdown/dropdownpanelview';
import { DropdownView } from 'ckeditor5';

/**
 * Force all toolbar dropdown panels to use northern positions rather than southern (editor default).
 * This will position them correctly relative to the toolbar at the bottom of the editing root.
 *
 * @private
 * @param {module:core/editor/editor~Editor} editor
 * @param {module:ui/toolbar/toolbarview~ToolbarView} toolbarView
 */
export const overrideDropdownPositionsToNorth = (
  editor: DecoupledEditor,
  toolbarView: ToolbarView
) => {
  const {
    south,
    north,
    southEast,
    southWest,
    northEast,
    northWest,
    southMiddleEast,
    southMiddleWest,
    northMiddleEast,
    northMiddleWest,
  } = DropdownView.defaultPanelPositions;

  let panelPositions;

  if (editor.locale.uiLanguageDirection !== 'rtl') {
    panelPositions = [
      northEast,
      northWest,
      northMiddleEast,
      northMiddleWest,
      north,
      southEast,
      southWest,
      southMiddleEast,
      southMiddleWest,
      south,
    ];
  } else {
    panelPositions = [
      northWest,
      northEast,
      northMiddleWest,
      northMiddleEast,
      north,
      southWest,
      southEast,
      southMiddleWest,
      southMiddleEast,
      south,
    ];
  }

  for (const item of toolbarView.items) {
    if (!(item instanceof DropdownView)) {
      continue;
    }
    item.on('change:isOpen', () => {
      if (!item.isOpen) {
        return;
      }

      item.panelView.position = getOptimalPosition({
        element: item.panelView.element as HTMLElement,
        target: item.buttonView.element as HTMLElement,
        fitInViewport: true,
        positions: panelPositions,
      })?.name as PanelPosition;
    });
  }
};
