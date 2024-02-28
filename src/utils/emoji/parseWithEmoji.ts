export const joinTitleWithEmoji = (emoji: string, title: string) =>
  [emoji, title].join('@@@');

export const splitTitleWithEmoji = (title: string) => {
  const [emojiValue, titleValue] = title.split('@@@');
  return [emojiValue || '', titleValue || ''] as const;
};
