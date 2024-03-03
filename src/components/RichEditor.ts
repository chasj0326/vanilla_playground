import { Component, createDOMElement } from "@core";

const textTagMap = ["h1", "h2", "h3", "h4", "code", "q"];
const placeholderMap: {
  [key: string]: string;
} = {
  h1: "제목1",
  h2: "제목2",
  h3: "제목3",
  h4: "제목4",
  q: "인용",
  div: "내용을 입력하세요, 명령어는 '/'",
};

class RichEditor extends Component {
  addKeyEvent(key: string | null, listener: (e: KeyboardEvent) => void): void {
    this.$target.addEventListener("keydown", (e) => {
      if (e.key !== key || e.isComposing) return;
      listener(e);
    });
  }

  mounted(): void {
    const $editor = this.findElement<HTMLDivElement>("#rich-editor");
    if (!$editor.innerHTML) {
      const selection = window.getSelection();
      const $block = createNewBlock();
      $editor.append($block);
      selection?.setPosition($block, 0);
    }

    this.addEvent("keyup", () => {
      addClassToCurrentBlock();
    });

    this.addEvent("pointerup", () => {
      addClassToCurrentBlock();
    });

    this.addKeyEvent("Enter", (e) => {
      if (e.shiftKey) return;

      const $editor = e.target as HTMLElement;
      const $block = getCurrentBlock();
      if (!$block) return;

      if (textTagMap.includes($block.innerText.substring(1))) {
        handleShortcut($block);
      } else {
        const { selection, range } = getCursorInfo();
        if (!(range && selection)) return;

        range.deleteContents();
        range.insertNode(
          createDOMElement({
            tag: "span",
            attributes: {
              id: "tmpcursor",
            },
          }),
        );

        const [beforeCursor, afterCursor] = $block.innerHTML.split(
          '<span id="tmpcursor"></span>',
        );

        $block.innerHTML = beforeCursor;
        const $newBlock = createNewBlock("div", afterCursor, false);

        $editor.insertBefore($newBlock, $block.nextSibling);
        selection.setPosition($newBlock, 0);
      }
      e.preventDefault();
    });

    this.addKeyEvent("Backspace", (e) => {
      const $block = getCurrentBlock();
      if (!$block) return;

      const { range, selection } = getCursorInfo();
      if (!range || !selection) return;
      if (
        range.startOffset === 0 &&
        range.endOffset === 0 &&
        (range.startContainer.previousSibling === null ||
          $block.innerHTML === "")
      ) {
        const $prevBlock = $block.previousElementSibling;
        if ($prevBlock) {
          const contents = $block.childNodes;
          $block.remove();
          const $cursor = createDOMElement(
            {
              tag: "span",
              attributes: {
                id: "tmpcursor",
              },
            },
            "cursor",
          );
          $prevBlock.append($cursor);
          selection.setPosition($cursor, 1);
          $prevBlock.append(...contents);
          $cursor.remove();
        } else if ($block.tagName !== "div") {
          const $newBlock = createNewBlock("div", $block.innerHTML);
          $block.replaceWith($newBlock);
        }
        e.preventDefault();
      }
    });
  }

  template(): string {
    return `
    <div class='rich-editor-container'>
      <h1>RichEditor</h1>
      <div id='rich-editor' contenteditable='true'></div>
    </div>
    `;
  }
}

export default RichEditor;

const createNewBlock = (
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

const handleShortcut = ($block: HTMLElement) => {
  const newTag = $block.innerText.substring(1);
  const $newBlock = createNewBlock(newTag as keyof HTMLElementTagNameMap);
  $block.replaceWith($newBlock);
};

const getCursorInfo = () => {
  const selection = window.getSelection();
  return {
    selection,
    range: selection ? selection.getRangeAt(0) : null,
  };
};

const getCurrentBlock = () => {
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

const addClassToCurrentBlock = () => {
  const $block = getCurrentBlock();
  if (!$block) return;
  document.querySelectorAll("#block").forEach(($block) => {
    $block.classList.remove("current");
  });
  $block?.classList.add("current");
  if ($block?.innerHTML === "<br>") $block.innerHTML = "";
};
