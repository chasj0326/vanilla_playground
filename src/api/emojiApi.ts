import { emojiApiClient } from "./apiClient";

const emojiApi = {
  getCategories: async () =>
    await emojiApiClient.get(
      `/categories?access_key=${import.meta.env.VITE_EMOJI_KEY}`,
    ),
  getEmojiByCategory: async (category: string) =>
    await emojiApiClient.get(
      `/categories/${category}?access_key=${import.meta.env.VITE_EMOJI_KEY}`,
    ),
};

export default emojiApi;
