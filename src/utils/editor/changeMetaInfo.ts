export const changeDocumentTitle = (
  titleValue?: string,
  defaultValue?: string,
) => {
  const title = titleValue || defaultValue;
  if (title) {
    document.title = title;
  } else {
    document.title = "Chacha Notoin";
  }
};

const faviconHref = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2280%22>${emoji}</text></svg>`;

export const changeFavicon = (emoji?: string) => {
  const link: HTMLLinkElement =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");

  link.type = emoji ? "image/svg+xml" : "image/x-icon";
  link.rel = "shorcut icon";
  link.href = emoji ? faviconHref(emoji) : "/favicon.ico";
  document.head.appendChild(link);
};
