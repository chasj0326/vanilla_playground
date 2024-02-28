import { Component } from 'core';
import Emoji from './Emoji';

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
        target.innerHTML = '⭐️';
        this.props?.onInput();
        target.classList.remove('empty');
      }

      this.addComponent(Emoji, {
        selector: emojiSelector,
        props: {
          onSelect: (emoji: string) => {
            target.innerHTML = emoji;
            this.removeComponent(emojiSelector);
            this.props?.onInput();
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
