export const changeDocumentTitle = (
  titleValue?: string,
  defaultValue?: string
) => {
  const title = titleValue || defaultValue;
  if (title) {
    document.title = title;
  } else {
    document.title = 'Chacha Notoin';
  }
};
