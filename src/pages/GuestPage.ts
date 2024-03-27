import { Component } from "@notion/core";
import GuestBook from "@notion/components/GuestBook/GuestBook";

class GuestPage extends Component {
  template(): string {
    return `
      <div class='guest-book'></div>
    `;
  }

  mounted(): void {
    this.addComponent(GuestBook, {
      selector: ".guest-book",
      state: {
        editingId: "",
      },
    });
  }
}

export default GuestPage;
