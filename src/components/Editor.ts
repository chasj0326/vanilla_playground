import { Component } from '@core';
import { router } from '@notion/main';
import { notionService as notion } from '@notion/services';
import { editorData, store } from '@notion/store';
import { EditorData, UpdateDocumentRequestBody } from '@notion/types';
import { debounce } from '@notion/utils';

class Editor extends Component {
  created(): void {
    store.subscribe([editorData], () => this.render());
  }

  mounted(): void {
    const { params } = router.match() || {};
    const documentId = Number(params?.id);
    notion.getDetailDocument(documentId);

    const updateWithDebounce = debounce(
      (
        target: 'title' | 'content',
        body: UpdateDocumentRequestBody
      ) => {
        notion.updateDocument(documentId, target, body);
      },
      1000
    );

    this.addEvent('input', ({ id }) => {
      const { value: title } =
        this.findElement<HTMLTextAreaElement>('#title');
      const { value: content } =
        this.findElement<HTMLTextAreaElement>('#content');
      updateWithDebounce(id, { title, content });
    });
  }

  template(): string {
    const { title, id, content } =
      store.getData<EditorData>(editorData);
    return `
      <h3>${id}</h3>
      <textarea id='title'>${title}</textarea>
      <br/>
      <textarea id='content'>${content}</textarea>
    `;
  }
}

export default Editor;
