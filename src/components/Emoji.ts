import { Component } from '@core';
import {
  getEmojiCategory,
  getInfiniteEmoji,
} from '@notion/services/emojiService';
import { store, emojiData, infiniteEmojiData } from '@notion/store';
import { EmojiData, InfiniteEmojiData } from '@notion/types';
import { observeIntersector } from '@notion/utils';

class Emoji extends Component {
  created(): void {
    store.subscribe([emojiData], () => this.render());
  }
  mounted(): void {
    getEmojiCategory();

    const setInfiniteEmojiData =
      store.setData<InfiniteEmojiData>(infiniteEmojiData);
    setInfiniteEmojiData((prev) => ({
      ...prev,
      scrollTop: 0,
    }));

    this.addEvent('click', ({ tagName, innerHTML }) => {
      if (tagName !== 'BUTTON') return;
      console.log(innerHTML);
    });
  }

  rendered(): void {
    const [{ scrollTop }, setInfiniteEmojiData] =
      store.useData<InfiniteEmojiData>(infiniteEmojiData);

    const rootEl = this.findElement<HTMLElement>('.emoji');
    rootEl.scrollTo({ top: scrollTop });

    const intersectorEl = this.findElement<HTMLDivElement>('.intersector');
    observeIntersector(intersectorEl, () => {
      getInfiniteEmoji();
      setInfiniteEmojiData((prev) => ({
        ...prev,
        scrollTop: rootEl.scrollTop,
      }));
    });
  }

  template(): string {
    const { emojiMap } = store.getData<EmojiData>(emojiData);
    const { done, cursor, categories } =
      store.getData<InfiniteEmojiData>(infiniteEmojiData);

    return `
    <div class='emoji-container'>
      <div class='emoji'>
      ${Object.entries(emojiMap)
        .map(
          ([category, emojiList]) => `
          <div>
            <div class='category-name'>${category}</div>
            <div class='emoji-list'>
              ${emojiList.map((emoji) => `<button>${emoji}</button>`).join('')}
            </div>
          </div>
        `
        )
        .join('')}
        ${
          done || !categories.length
            ? ''
            : `<div class="intersector category-name">${categories[cursor]}</div>`
        }
      </div>
    </div>
    `;
  }
}

export default Emoji;
