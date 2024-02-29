import { Component } from "core";
import { Emoji } from "@notion/components";
import { getRandomEmoji } from "@notion/utils";

interface EmojiInputProps {
  onInput: VoidFunction;
  value: string;
}

class EmojiInput extends Component<EmojiInputProps> {
  mounted(): void {
    this.addEvent("click", (target) => {
      const $emoji = target.closest<HTMLButtonElement>("#emoji");
      if (!$emoji) return;

      const emojiSelector = ".select-emoji";
      if ($emoji.classList.contains("empty")) {
        $emoji.classList.remove("empty");
        $emoji.innerHTML = getRandomEmoji();
        this.props?.onInput();
      }

      this.addComponent(Emoji, {
        selector: emojiSelector,
        props: {
          onSelect: (emoji: string) => {
            if (!emoji) {
              $emoji.classList.add("empty");
            } else {
              $emoji.innerHTML = emoji;
            }
            this.removeComponent(emojiSelector);
            this.props?.onInput();
            $emoji.innerHTML =
              emoji || '<i class="fa-solid fa-face-smile"></i>아이콘 추가';
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
      <button id='emoji' class='${emojiValue ? "" : "empty"}'>
        ${emojiValue || '<i class="fa-solid fa-face-smile"></i>아이콘 추가'}
      </button>
      <div class='select-emoji'></div>
    `;
  }
}

export default EmojiInput;
