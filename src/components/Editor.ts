import { Component } from '@core';
import { PLACEHOLDER } from '@notion/constants';
import { router } from '@notion/main';
import { notionService as notion } from '@notion/services';
import { editorData, store } from '@notion/store';
import { EditorData } from '@notion/types';
import {
  debounce,
  resizeTextArea,
  joinTitleWithEmoji,
  splitTitleWithEmoji,
} from '@notion/utils';
import Emoji from './Emoji';

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

    const handleInput = (id: string) => {
      const titleEl = this.findElement<HTMLTextAreaElement>('#title');
      const contentEl = this.findElement<HTMLTextAreaElement>('#content');
      const emojiEl = this.findElement<HTMLButtonElement>('#emoji');
      resizeTextArea(['#title', '#content']);
      updateWithDebounce(id, {
        title: joinTitleWithEmoji(emojiEl.innerText, titleEl.value),
        content: contentEl.value,
      });
    };

    this.addEvent('input', ({ id }) => {
      handleInput(id);
    });

    this.addEvent('click', (target) => {
      if (target.id !== 'emoji') return;
      const emojiSelector = '.select-emoji';
      const container = this.findElement<HTMLElement>(
        '.select-emoji-container'
      );

      this.addComponent(Emoji, {
        selector: emojiSelector,
        props: {
          onSelect: (emoji: string) => {
            target.innerHTML = emoji;
            this.removeComponent(emojiSelector);
            handleInput(target.id);
          },
          onBlur: () => this.removeComponent(emojiSelector),
          container,
        },
      });
    });
  }

  rendered(): void {
    resizeTextArea(['#title', '#content']);
  }

  template(): string {
    const { title, content } = store.getData<EditorData>(editorData);
    const [emojiValue, titleValue] = splitTitleWithEmoji(title);
    return `
      <div class='select-emoji-container'>
        <button id='emoji'>${emojiValue}</button>
        <div class='select-emoji'></div>
      </div>
      <textarea id='title' placeholder='${
        PLACEHOLDER.DOCUMENT_TITLE
      }' rows='1'>${titleValue}</textarea>
      <textarea id='content' placeholder='${
        PLACEHOLDER.DOCUMENT_CONTNET
      }' rows='1'>${content || ''}</textarea>
    `;
  }
}

export default Editor;
