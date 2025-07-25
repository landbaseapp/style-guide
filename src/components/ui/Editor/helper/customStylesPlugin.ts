import { Plugin } from 'ckeditor5';

export const getCustomStylesPlugin = ({
  rootCustomStyles,
}: {
  rootCustomStyles?: Record<string, string>;
}) => {
  return class CustomStylesPlugin extends Plugin {
    init() {
      const rootElement = this.editor.editing.view.document.getRoot();
      if (rootElement) {
        if (rootCustomStyles) {
          this.editor.editing.view.change((writer) => {
            Object.entries(rootCustomStyles).forEach(([key, value]) => {
              writer.setStyle(key, value, rootElement);
            });
          });
        }
      }

      // Display divs instead of <p> tags in order to browser not add margins
      // If there are p elements, this means that the content is legacy from DB and should be displayed as <p>
      // this.editor.conversion.for('downcast').elementToElement({
      //   model: 'paragraph',
      //   view: (modelElement, { writer }) => {
      //     if (modelElement.getAttribute('isLegacy')) {
      //       return writer.createContainerElement('p');
      //     }
      //
      //     return writer.createContainerElement('p');
      //   },
      //   converterPriority: 'high',
      // });

      this.editor.conversion.for('upcast').elementToElement({
        model: (_, { writer }) => {
          return writer.createElement('paragraph', { isLegacy: true });
        },
        view: 'p',
        converterPriority: 'high',
      });

      this.editor.conversion.for('upcast').elementToElement({
        model: 'paragraph',
        view: 'div',
        converterPriority: 'high',
      });

      // Apply styles to image blocks in order to resize applied in the email
      this.editor.conversion.for('downcast').add((dispatcher) => {
        dispatcher.on('insert:imageBlock', (_, data, conversionApi) => {
          const viewElement = conversionApi?.mapper?.toViewElement(data?.item);
          const img = viewElement?._children?.find((x: { name: string }) => x.name === 'img');

          if (img) {
            conversionApi.writer.setAttribute(
              'style',
              'display: block; margin: 0 auto; max-width: 100%; min-width: 100%; height: auto;',
              img
            );
          }
        });
      });
    }
  };
};
