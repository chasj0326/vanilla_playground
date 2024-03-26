import WriteForm from "./WriteForm";
import { Component } from "@notion/core";
import { guestBookData, store } from "@notion/store";
import { guestBook } from "@notion/services";
import { GuestBookData, GuestContent } from "@notion/types";
import { STORE_KEY } from "@notion/constants";

class GuestBook extends Component {
  created(): void {
    store.subscribe([guestBookData], {
      key: STORE_KEY.GUESTBOOK,
      func: () => this.render(),
    });
  }

  handleSubmit(guestContent: GuestContent, id?: string) {
    if (!id) guestBook.createGuestBook(guestContent);
    else guestBook.updateGuestBook(id, guestContent);
  }

  mounted(): void {
    guestBook.getGuestBooks();

    this.addEvent("click", (target) => {
      const id = (target.closest("li")?.id ?? "").substring(1);
      const action = target.closest("button")?.dataset.action;

      if (!id) return;
      const guestContent = store.getData<GuestBookData>(guestBookData)[id];

      switch (action) {
        case "update": {
          this.addComponent(WriteForm, {
            selector: `#_${id}`,
            props: {
              onSubmit: (newContent: GuestContent) =>
                this.handleSubmit(newContent, id),
              onCancel: () => this.render(),
              onDelete: () => guestBook.deleteGuestBook(id),
              initial: { ...guestContent, password: "" },
            },
          });
          break;
        }
        default: {
        }
      }
    });
  }

  rendered() {
    this.addComponent(WriteForm, {
      selector: ".add-item",
      props: {
        onSubmit: (newContent: GuestContent) => this.handleSubmit(newContent),
        onCancel: () => this.render(),
      },
    });
  }

  template(): string {
    const guestBooks = store.getData<GuestBookData>(guestBookData);
    return `
      <div class="add-item"></div>
      <ul class='guest-book-list'>${Object.entries(guestBooks)
        .map(
          ([id, { username, content }]) => `
          <li id='_${id}' class='guest-book-item'>
            <span>${username}</span>:
            <span>${content}</span>
            <button data-action="update">삭제/수정</button>
          </li>
        `,
        )
        .join("")}
      </ul>
    `;
  }
}

export default GuestBook;
