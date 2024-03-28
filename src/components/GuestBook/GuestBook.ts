import BookList from "./BookList";
import WriteForm from "./WriteForm";
import { Component } from "@notion/core";
import { router } from "@notion/main";
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

    const { search } = router.match();

    // TODO : 리팩토링..
    const sorts = ["latest", "oldest"];
    const sort = !sorts.includes(search.sort)
      ? "latest"
      : (search.sort as "latest" | "oldest");

    this.removeComponent(".guest-book-list");
    this.addComponent(BookList, {
      selector: ".guest-book-list",
      state: {
        sort,
        editingId: "",
      },
    });
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
