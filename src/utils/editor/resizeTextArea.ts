export const resizeTextArea = (selectors: string[]) => {
  for (const selector of selectors) {
    const $textarea = document.querySelector<HTMLTextAreaElement>(selector);
    if (!$textarea) continue;
    $textarea.style.height = "auto";
    $textarea.style.height = $textarea.scrollHeight + "px";
  }
};
