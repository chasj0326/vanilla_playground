const seperator = import.meta.env.VITE_EMOJI_SEPERATOR;

export const joinTitleWithEmoji = (emoji: string, title: string) =>
  [emoji, title].join(seperator);

export const splitTitleWithEmoji = (title: string) => {
  const [emojiValue, titleValue] = title.split(seperator);
  return [emojiValue || '', titleValue || ''] as const;
};
