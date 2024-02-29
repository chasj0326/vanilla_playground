import { Component } from "@core";
import { editorData, store } from "@notion/store";
import { notion } from "@notion/services";
import { EmojiInput } from "@notion/components";
import { EditorData } from "@notion/types";
import {
  changeDocumentTitle,
  changeFavicon,
  debounce,
  joinTitleWithEmoji,
  resizeTextArea,
  splitTitleWithEmoji,
} from "@notion/utils";
import { PLACEHOLDER, STORE_KEY } from "@notion/constants";

interface EditorProps {
  documentId: number;
}

class Editor extends Component<EditorProps> {
  editorValue() {
    const titleEl = this.findElement<HTMLTextAreaElement>("#title");
    const contentEl = this.findElement<HTMLTextAreaElement>("#content");
    const emojiEl = this.findElement<HTMLButtonElement>("#emoji");
    const isEmojiEmpty = emojiEl.classList.contains("empty");
    return {
      title: joinTitleWithEmoji(
        isEmojiEmpty ? "" : emojiEl.innerText,
        titleEl.value,
      ),
      content: contentEl.value,
    };
  }

  created(): void {
    store.subscribe([editorData], {
      key: STORE_KEY.EDITOR,
      func: () => this.render(),
    });
  }

  mounted(): void {
    const documentId = this.props?.documentId ?? 0;
    notion.getDetailDocument(documentId);

    const updateWithDebounce = debounce((target, body) => {
      notion.updateDocument(documentId, target, body);
    }, 300);

    this.addEvent("input", ({ id }) => {
      resizeTextArea(["#title", "#content"]);
      updateWithDebounce(id, this.editorValue());
    });
  }

  rendered(): void {
    resizeTextArea(["#title", "#content"]);

    const documentId = this.props?.documentId ?? 0;
    const { title } = store.getData<EditorData>(editorData);
    const [emojiValue, titleValue] = splitTitleWithEmoji(title);

    changeDocumentTitle(titleValue, PLACEHOLDER.DOCUMENT_TITLE);
    changeFavicon(emojiValue);

    this.addComponent(EmojiInput, {
      selector: ".select-emoji-container",
      props: {
        onInput: () =>
          notion.updateDocument(documentId, "emoji", this.editorValue()),
        value: emojiValue,
      },
    });
  }

  template(): string {
    const { title, content } = store.getData<EditorData>(editorData);
    const [_, titleValue] = splitTitleWithEmoji(title);

    return `
      <div class='title-container'>
        <div class='select-emoji-container'>
        </div>
        <textarea id='title' placeholder='${
          PLACEHOLDER.DOCUMENT_TITLE
        }' rows='1'>${titleValue}</textarea>
      </div>
      <textarea id='content' placeholder='${
        PLACEHOLDER.DOCUMENT_CONTNET
      }' rows='1'>${content || ""}</textarea>
    `;
  }
}

export default Editor;
