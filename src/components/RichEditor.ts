// 블럭 생성 = div 안에 input 넣기
// 엔터 누름 = 그 블럭으로 createDOMElement, 다음 블럭 생성
// editable div 누름 => input 으로 바뀜
import { Component, createDOMElement } from "@core";

const textTagMap = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "b", "mark"];

class RichEditor extends Component {
  createNewBlock() {
    const $richEditor = this.findElement<HTMLDivElement>("#rich-editor");
    const $input = createDOMElement({
      tag: "input",
      attributes: {
        id: "block",
        class: "p",
        placeholder: "내용을 입력하세요",
      },
    });
    $richEditor.append($input);
    $input.focus();
  }

  changeBlockToInput($block: HTMLElement) {
    const $input = createDOMElement({
      tag: "input",
      attributes: {
        id: "block",
        class: $block.tagName.toLowerCase(),
        placeholder: "내용을 입력하세요",
        value: $block.innerText,
      },
    });
    $block.replaceWith($input);
    $input.focus();
    const length = ($input as HTMLInputElement).value.length;
    ($input as HTMLInputElement).setSelectionRange(length, length);
  }

  mounted(): void {
    // 비어있으면 기본 블럭 생성!
    const $richEditor = this.findElement<HTMLDivElement>("#rich-editor");
    if (!$richEditor.innerHTML) {
      this.createNewBlock();
    }

    this.$target.addEventListener("keydown", (e) => {
      if (e.key !== "Backspace") return;
      if (e.isComposing) return;
      const $deleting = e.target as HTMLInputElement;
      if ($deleting.selectionStart === 0 && $deleting.selectionEnd === 0) {
        e.preventDefault(); // 기본 backspace 행동 막기
        // 이전 element 찾기
        const $previousSibling = $deleting.previousElementSibling;
        // $deleting element 삭제
        $deleting.remove();
        // 이전 element가 존재하면서 포커스 가능한 경우, 포커스를 이전 element로 이동
        if (
          $previousSibling &&
          $previousSibling instanceof HTMLDivElement &&
          $previousSibling.focus
        ) {
          $previousSibling.focus();
        } else {
          this.createNewBlock();
        }
      }
    });

    this.$target.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      if (e.isComposing) return;
      const $editing = e.target as HTMLElement;

      // input 에서 엔터를 쳤다.
      if ($editing.tagName === "INPUT") {
        const $input = $editing as HTMLInputElement;
        const value = $input.value;
        const newTagName = value.substring(1);

        if (textTagMap.includes(newTagName)) {
          // 단축키를 입력했다.
          $input.className = newTagName;
          $input.value = "";
        } else {
          // 내용을 다 입력하고 엔터를 쳤다.
          const newTagName = $editing.className;
          const $block = createDOMElement(
            {
              tag: newTagName as keyof HTMLElementTagNameMap,
              attributes: {
                id: "block",
                contenteditable: "true",
              },
            },
            $input.value,
          );
          $input.replaceWith($block);
          $block.addEventListener("focus", (e) =>
            this.changeBlockToInput(e.target as HTMLElement),
          );
          this.createNewBlock();
        }
      } else {
        // 텍스트 블럭을 치다가 엔터를 쳤다.
      }
    });
  }
  template() {
    return `
    <div class="rich-editor-container">
      <h1>RichEditor</h1>
      <div id="rich-editor"></div>
    </div>
    `;
  }
}

export default RichEditor;
