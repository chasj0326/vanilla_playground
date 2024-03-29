import {
  addClassToCurrentBlock,
  createNewBlock,
  enterShortcutMap,
  getCurrentBlock,
  getCursorInfo,
  handleShortcut,
  initEditor,
  spaceShortcutMap,
} from "./utils";
import { Component, createDOMElement } from "@core";

interface RichEditorProps {
  initial: string;
  onInput: (innerHTML: string) => void;
}

class RichEditor extends Component<RichEditorProps> {
  addKeyEvent(key: string, listener: (e: KeyboardEvent) => void): void {
    this.$target.addEventListener("keydown", (e) => {
      if (e.key !== key || e.isComposing) return;
      listener(e);
    });
  }

  mounted(): void {
    const $editor = this.findElement<HTMLDivElement>("#rich-editor");
    if (this.props?.initial) {
      $editor.innerHTML = this.props?.initial;
    } else {
      initEditor($editor);
    }

    this.addEvent("keydown", () => {
      this.props?.onInput($editor.innerHTML);
    });

    this.addEvent("keyup", () => {
      initEditor($editor);
      addClassToCurrentBlock();
    });

    this.addEvent("pointerup", () => {
      addClassToCurrentBlock();
    });

    this.addKeyEvent(" ", (e) => {
      const $block = getCurrentBlock();
      if (!$block) return;
      if ($block.innerText in spaceShortcutMap) {
        handleShortcut($block);
        e.preventDefault();
      }
    });

    this.addKeyEvent("Enter", (e) => {
      if (e.shiftKey) return;

      const $editor = e.target as HTMLElement;
      const $block = getCurrentBlock();
      if (!$block) return;

      if ($block.innerText in enterShortcutMap) {
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
      const { range, selection } = getCursorInfo();
      if (!($block && range && selection)) return;

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

    this.$target.addEventListener("paste", (e) => {
      const { selection, range } = getCursorInfo();
      if (!(range && selection)) return;
      if (range.startContainer === range.endContainer) {
        const pastedText = e.clipboardData?.getData("text") ?? "";
        const urlRegex = /(http(s)?:\/\/[^\s]+)/g;
        if (urlRegex.test(pastedText)) {
          e.preventDefault();
          const $link = createDOMElement(
            {
              tag: "a",
              attributes: {
                href: pastedText,
                contenteditable: "false",
                title: pastedText,
                target: "_blank",
              },
            },
            selection.toString(),
          );
          range.deleteContents();
          range.insertNode($link);
        }
      }
    });
  }

  template(): string {
    return `
      <div id='rich-editor' contenteditable='true'></div>
    `;
  }
}

export default RichEditor;
