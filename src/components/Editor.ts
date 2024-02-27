import { Component } from '@core';
import { PLACEHOLDER } from '@notion/constants';
import { router } from '@notion/main';
import { notionService as notion } from '@notion/services';
import { editorData, store } from '@notion/store';
import { EditorData } from '@notion/types';
import { debounce, resizeTextArea } from '@notion/utils';

class Editor extends Component {
  created(): void {
    store.subscribe([editorData], () => this.render());
  }

  mounted(): void {
    const { params } = router.match() || {};
    const documentId = Number(params?.id);
    notion.getDetailDocument(documentId);

    const updateWithDebounce = debounce((target, body) => {
      notion.updateDocument(documentId, target, body);
    }, 300);

    this.addEvent('input', ({ id }) => {
      const titleEl = this.findElement<HTMLTextAreaElement>('#title');
      const contentEl = this.findElement<HTMLTextAreaElement>('#content');

      resizeTextArea(['#title', '#content']);

      updateWithDebounce(id, {
        title: titleEl.value,
        content: contentEl.value,
      });
    });
  }

  rendered(): void {
    resizeTextArea(['#title', '#content']);
  }

  template(): string {
    const { title, content } = store.getData<EditorData>(editorData);
    return `
      <textarea id='title' placeholder='${
        PLACEHOLDER.DOCUMENT_TITLE
      }' rows='1'>${title}</textarea>
      <textarea id='content' placeholder='${
        PLACEHOLDER.DOCUMENT_CONTNET
      }' rows='1'>${content || ''}</textarea>
    `;
  }
}

export default Editor;
