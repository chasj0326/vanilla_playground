import { Component } from '@core';
import { router } from '@notion/main';
import { notionService as notion } from '@notion/services';
import { editorData, store } from '@notion/store';
import { EditorData } from '@notion/types';

class Editor extends Component {
  created(): void {
    store.subscribe([editorData], () => this.render());
  }
  mounted(): void {
    const { params } = router.match() || {};
    notion.getDetailDocument(Number(params?.id));
  }

  template(): string {
    const { title, id } = store.getData<EditorData>(editorData);
    return `
      <h3>${id}</h3>
      <input value='${title}'/>
    `;
  }
}

export default Editor;
