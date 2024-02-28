import { Component } from '@core';
import {
  getEmojiCategory,
  getInfiniteEmoji,
  storeEmoji,
  getStoredEmoji,
} from '@notion/services/emojiService';
import { store, emojiData, infiniteEmojiData } from '@notion/store';
import { EmojiData, InfiniteEmojiData } from '@notion/types';
import { observeIntersector, categoryKR } from '@notion/utils';

interface EmojiProps {
  container: HTMLElement;
  onSelect: (emoji: string) => void;
  onBlur: VoidFunction;
}

class Emoji extends Component<EmojiProps> {
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

    this.addEvent(
      'click',
      ({ tagName, id, innerHTML }) => {
        if (tagName !== 'BUTTON') return;
        if (id === 'remove') {
          this.props?.onSelect('');
        } else {
          storeEmoji(innerHTML);
          this.props?.onSelect(innerHTML);
        }
      },
      { once: true }
    );

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const emojiSelector = this.props?.container;
      if (emojiSelector && emojiSelector.contains(target)) {
        return;
      }
      this.props?.onBlur();
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
      <header>
        <h3>이모지 선택</h3>
        <button id='remove'>제거</button>
      </header>
      <div class='emoji'>
      ${Object.entries({ ...getStoredEmoji(), ...emojiMap })
        .map(([category, emojiList]) =>
          emojiList.length
            ? `<div>
                <div class='category-name'>${categoryKR(category)}</div>
                <div class='emoji-list'>
                  ${emojiList
                    .map((emoji) => `<button>${emoji}</button>`)
                    .join('')}
                </div>
              </div>`
            : ''
        )
        .join('')}
        ${
          done || !categories.length
            ? ''
            : `<div class="intersector category-name">
              ${categoryKR(categories[cursor])}</div>`
        }
      </div>
    </div>
    `;
  }
}

export default Emoji;
