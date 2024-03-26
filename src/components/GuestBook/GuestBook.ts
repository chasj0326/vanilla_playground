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

      if (!(id && target.tagName === "BUTTON")) {
        return;
      }

      const guestContent = store.getData<GuestBookData>(guestBookData)[id];
      this.addComponent(WriteForm, {
        selector: `#_${id}`,
        props: {
          forNew: false,
          onSubmit: (newContent: GuestContent) =>
            this.handleSubmit(newContent, id),
          onCancel: () => {
            this.removeComponent(`#_${id}`);
            this.render();
          },
          initial: { ...guestContent, password: "" },
        },
      });
    });
  }

  rendered() {
    this.removeComponent(".add-item");
    this.addComponent(WriteForm, {
      selector: ".add-item",
      props: {
        forNew: true,
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
          ([id, { username, content, updateAt }]) => `
          <li id='_${id}' class='guest-book-item'>
            <div class='item-header'>
              <div class='info-block'>
                <div class='profile'></div>
                <div class='info'>
                  <div class='username'>${username}</div>
                  <div class='date'>${updateAt}</div>
                </div>
              </div>
              <button class='update'>삭제/수정</button>
            </div>
            <div class='item-footer'>
              <div class='content'>${content}</div>
            </div>
          </li>
        `,
        )
        .join("")}
      </ul>
    `;
  }
}

export default GuestBook;
