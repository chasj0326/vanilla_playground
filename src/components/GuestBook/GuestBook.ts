import WriteForm from "./WriteForm";
import { Component } from "@notion/core";
import { guestBookData, store } from "@notion/store";
import { guestBook } from "@notion/services";
import { GuestBookData } from "@notion/types";
import { STORE_KEY } from "@notion/constants";

class GuestBook extends Component {
  created(): void {
    store.subscribe([guestBookData], {
      key: STORE_KEY.GUESTBOOK,
      func: () => this.render(),
    });
  }

  mounted(): void {
    guestBook.getGuestBooks();

    this.addEvent("click", (target) => {
      const listElId = target.closest("li")?.id ?? "";
      const id = listElId.substring(1);
      const action = target.closest("button")?.dataset.action;

      if (!id) {
        if (action === "add") {
          guestBook.createGuestBook({
            updateAt: "",
            username: "chacha",
            content: "어렵구먼",
            password: "123",
            profile: {
              background: "",
              charactor: "",
            },
          });
        }
        return;
      }

      const targetBook = store.getData<GuestBookData>(guestBookData)[id];

      switch (action) {
        case "delete": {
          console.log("delete", id);
          guestBook.deleteGuestBook(id);
          break;
        }
        case "update": {
          console.log("update", id);
          this.addComponent(WriteForm, {
            selector: `#_${id}`,
            props: {
              onSubmit: () => {},
              onCancel: () => {},
              initial: { ...targetBook, password: "" },
            },
          });
          break;
        }
        default: {
        }
      }
    });
  }

  template(): string {
    const guestBooks = store.getData<GuestBookData>(guestBookData);
    return `
      <ul class='guest-book-list'>${Object.entries(guestBooks)
        .map(
          ([id, { username, content }]) => `
          <li id='_${id}' class='guest-book-item'>
            <span>${username}</span>:
            <span>${content}</span>
            <button data-action="delete">삭제</button>
            <button data-action="update">수정</button>
          </li>
        `,
        )
        .join("")}
      </ul>
      <button data-action="add">추가</button>
    `;
  }
}

export default GuestBook;
