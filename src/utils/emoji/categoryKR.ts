import { EMOJI_CATEGORY } from "@notion/constants";

export const categoryKR = (category: string) => {
  if (category in EMOJI_CATEGORY) return EMOJI_CATEGORY[category];
  return category;
};
