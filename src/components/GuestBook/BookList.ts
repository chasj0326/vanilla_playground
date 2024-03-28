import WriteForm from "./WriteForm";
import { makeImageSrc } from "./utils";
import { Component } from "@notion/core";
import { guestBookData, store } from "@notion/store";
import { guestBook } from "@notion/services";
import { GuestBookData, GuestContent } from "@notion/types";
import { PLACEHOLDER, STORE_KEY } from "@notion/constants";

interface BookListState {
  editingId: string;
}

class BookList extends Component<{}, BookListState> {
  created(): void {
    store.subscribe([guestBookData], {
      key: STORE_KEY.GUESTBOOK,
      func: () => this.render(),
    });
  }

  mounted(): void {
    guestBook.getGuestBooks();

    // 수정/삭제 클릭 시 editing 으로 지정
    // editing 으로 지정되면 비밀번호폼 나타남
    this.addEvent("click", (target) => {
      if (target.tagName !== "BUTTON") return;

      const listItem = target.closest("li");
      if (!listItem) return;
      const id = listItem.id.substring(1);

      const { action = "" } = target.dataset;
      if (action === "submit") return;
      this.setState({ editingId: action === "update" ? id : "" });
    });

    // 비밀번호 입력 후 제출 시
    this.$target.addEventListener("submit", (e) => {
      e.preventDefault();

      const target = e.target as HTMLFormElement;
      const inputEl = target.querySelector("input");
      const guestBooks = store.getData<GuestBookData>(guestBookData);

      if (!(this.state && inputEl)) return;

      const { editingId } = this.state;
      const { password } = guestBooks[editingId];
      const passwordValue = inputEl.value;

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
            guestBook.updateGuestBook(editingId, { ...newContent, password });
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

  template(): string {
    const guestBooks = store.getData<GuestBookData>(guestBookData);
    const { editingId } = this.state ?? {};

    return `
    ${Object.entries(guestBooks)
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
                    <input 
                      type="password" 
                      name="password" 
                      value="" 
                      placeholder="${PLACEHOLDER.GUEST_PW}"/>
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
      .join("")}`;
  }
}

export default BookList;
