import { Component } from '@core';
import { PLACEHOLDER } from '@notion/constants';
import { router } from '@notion/main';
import { notionService as notion } from '@notion/services';
import { editorData, store } from '@notion/store';
import { EditorData } from '@notion/types';
import { debounce } from '@notion/utils';

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
    }, 500);

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
      <textarea id='title' placeholder='${
        PLACEHOLDER.DOCUMENT_TITLE
      }'>${title}</textarea>
      <br/>
      <textarea id='content' placeholder='${
        PLACEHOLDER.DOCUMENT_CONTNET
      }'>${content || ''}</textarea>
    `;
  }

  rendered() {
    // TODO : 시간 비교해서 title 또는 content 포커싱
    const { title } = store.getData<EditorData>(editorData);
    const titleEl = this.findElement<HTMLTextAreaElement>('#title');

    titleEl.focus();
    titleEl.value = '';
    titleEl.value = title;
  }
}

export default Editor;
