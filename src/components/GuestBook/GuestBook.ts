import BookList from "./BookList";
import WriteForm from "./WriteForm";
import { Component } from "@notion/core";
import { guestBook } from "@notion/services";
import { GuestContent } from "@notion/types";

class GuestBook extends Component {
  rendered() {
    this.removeComponent(".add-item");
    this.addComponent(WriteForm, {
      selector: ".add-item",
      props: {
        forNew: true,
        onSubmit: (newContent: GuestContent) => {
          guestBook.createGuestBook(newContent);
        },
      },
    });

    this.removeComponent(".guest-book-list");
    this.addComponent(BookList, ".guest-book-list");
  }

  template(): string {
    return `
      <div class="add-item"></div>
      <ul class='guest-book-list'>
      </ul>
    `;
  }
}

export default GuestBook;
