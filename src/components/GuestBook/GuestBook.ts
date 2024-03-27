import WriteForm from "./WriteForm";
import { makeImageSrc } from "./utils";
import { Component } from "@notion/core";
import { guestBookData, store } from "@notion/store";
import { guestBook } from "@notion/services";
import { GuestBookData, GuestContent } from "@notion/types";
import { STORE_KEY } from "@notion/constants";
import { PLACEHOLDER } from "@notion/constants";

interface GuestBookState {
  editingId: string;
}

class GuestBook extends Component<{}, GuestBookState> {
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
      if (!(id && target.tagName === "BUTTON")) return;

      const { action = "" } = target.dataset;
      if (action === "submit") return;
      this.setState({ editingId: action === "update" ? id : "" });
    });

    this.$target.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as HTMLFormElement;

      const guestBooks = store.getData<GuestBookData>(guestBookData);
      const { editingId = "" } = this.state ?? {};

      const { password } = guestBooks[editingId];
      const passwordValue = target.querySelector("input")?.value;
      if (
        password !== passwordValue &&
        import.meta.env.VITE_MASTER_PASSWORD !== passwordValue
      ) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      this.addComponent(WriteForm, {
        selector: `#_${editingId}`,
        props: {
          forNew: false,
          onSubmit: (newContent: GuestContent) => {
            this.handleSubmit({ ...newContent, password }, editingId);
            this.setState({ editingId: "" });
          },
          onCancel: () => {
            this.removeComponent(`#_${editingId}`);
            this.setState({ editingId: "" });
          },
          onDelete: () => {
            guestBook.deleteGuestBook(editingId);
          },
        },
        state: {
          warning: "",
          formContent: { ...guestBooks[editingId], password: "" },
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
    const { editingId } = this.state ?? {};

    return `
      <ul class='guest-book-list'>${Object.entries(guestBooks)
        .map(
          ([id, { username, content, updateAt, profile }]) => `
          <li id='_${id}' class='guest-book-item'>
            <div class='item-header'>
              <div class='info-block'>
                <div class='profile'>
                  <img src="${makeImageSrc(profile.charactor, profile.background)}"/>
                </div>
                <div class='info'>
                  <div class='username'>${username}</div>
                  <div class='date'>${updateAt}</div>
                </div>
              </div>
              ${
                id === editingId
                  ? `
                    <form class='password-container'>
                      <input type="password" name="password" value="" placeholder="${PLACEHOLDER.GUEST_PW}"/>
                      <button data-action="submit" type="submit">완료</button>
                      <button data-action="cancel" type="button">취소</button>
                    </form>`
                  : `<button data-action="update">삭제/수정</button>`
              }
            </div>
            <div class='item-footer'>
              <div class='content'>${content}</div>
            </div>
          </li>
        `,
        )
        .join("")}
      </ul>
      <div class="add-item"></div>
    `;
  }
}

export default GuestBook;
