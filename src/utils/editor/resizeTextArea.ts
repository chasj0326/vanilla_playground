export const resizeTextArea = (selector: string) => {
  const $textarea = document.querySelector<HTMLTextAreaElement>(selector);
  if (!$textarea) return;
  $textarea.style.height = 'auto';
  $textarea.style.height = $textarea.scrollHeight + 'px';
};
