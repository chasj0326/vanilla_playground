import { EMOJI_FOR_RANDOM } from '@notion/mocks/data';

export const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * EMOJI_FOR_RANDOM.length);
  return EMOJI_FOR_RANDOM[randomIndex];
};
