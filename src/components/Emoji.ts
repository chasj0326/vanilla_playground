import { Component } from '@core';
import { getAllEmoji } from '@notion/services/emojiService';

class Emoji extends Component {
  mounted(): void {
    getAllEmoji();
  }
  template(): string {
    return 'EMOJI';
  }
}

export default Emoji;
