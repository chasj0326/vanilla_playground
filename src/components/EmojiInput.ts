import { Component } from 'core';
import Emoji from './Emoji';
import { getRandomEmoji } from '@notion/utils';

interface EmojiInputProps {
  onInput: VoidFunction;
  value: string;
}

class EmojiInput extends Component<EmojiInputProps> {
  mounted(): void {
    this.addEvent('click', (target) => {
      if (target.id !== 'emoji') return;
      const emojiSelector = '.select-emoji';

      if (target.classList.contains('empty')) {
        target.innerHTML = getRandomEmoji();
        this.props?.onInput();
        target.classList.remove('empty');
      }

      this.addComponent(Emoji, {
        selector: emojiSelector,
        props: {
          onSelect: (emoji: string) => {
            target.innerHTML = emoji;
            if (!emoji) {
              target.classList.add('empty');
            }
            this.removeComponent(emojiSelector);
            this.props?.onInput();
            target.innerHTML = emoji || '아이콘 추가';
          },
          onBlur: () => this.removeComponent(emojiSelector),
          container: this.$target,
        },
      });
    });
  }

  template(): string {
    const emojiValue = this.props?.value;
    return `
      <button id='emoji' class='${emojiValue ? '' : 'empty'}'>
        ${emojiValue || '아이콘 추가'}
      </button>
      <div class='select-emoji'></div>
    `;
  }
}

export default EmojiInput;