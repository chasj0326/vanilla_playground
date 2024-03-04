import { createDOMElement } from "@core";

export const shortcupMap: Record<string, string> = {
  "/h1": "h1",
  "/h2": "h2",
  "/h3": "h3",
  "/h4": "h4",
  "/q": "q",
  "/callout": "aside",
};
export const placeholderMap: Record<string, string> = {
  h1: "제목1",
  h2: "제목2",
  h3: "제목3",
  h4: "제목4",
  q: "인용",
  div: "내용을 입력하세요, 명령어는 '/'",
  aside: "내용을 입력하세요, 명령어는 '/'",
};

export const createNewBlock = (
  tag: keyof HTMLElementTagNameMap = "div",
  innerHTML = "",
  isCurrent = true,
) => {
  const $block = createDOMElement(
    {
      tag,
      attributes: {
        id: "block",
        placeholder: placeholderMap[tag],
      },
    },
    innerHTML,
  );
  if (isCurrent) $block.classList.add("current");
  return $block;
};

export const handleShortcut = ($block: HTMLElement) => {
  const newTag = shortcupMap[$block.innerText];
  const $newBlock = createNewBlock(newTag as keyof HTMLElementTagNameMap);
  $block.replaceWith($newBlock);
};

export const getCursorInfo = () => {
  const selection = window.getSelection();
  return {
    selection,
    range: selection ? selection.getRangeAt(0) : null,
  };
};

export const getCurrentBlock = () => {
  const { range } = getCursorInfo();
  if (!range) return null;

  const currentElement = (
    range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? range.commonAncestorContainer
      : range.commonAncestorContainer.parentElement
  ) as HTMLElement;

  const $block = currentElement.closest("#block");
  if ($block instanceof HTMLElement) {
    return currentElement.closest("#block") as HTMLElement;
  }
  return null;
};

export const addClassToCurrentBlock = () => {
  const $block = getCurrentBlock();
  if (!$block) return;

  document.querySelectorAll("#block").forEach(($block) => {
    $block.classList.remove("current");
  });
  $block.classList.add("current");
  if ($block.innerHTML === "<br>") $block.innerHTML = "";
};

export const initEditor = ($editor: HTMLElement) => {
  if (!$editor.innerHTML) {
    const selection = window.getSelection();
    const $block = createNewBlock();
    $editor.append($block);
    selection?.setPosition($block, 0);
  }
};
