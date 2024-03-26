import { Component } from "@notion/core";
import GuestBook from "@notion/components/GuestBook/GuestBook";

class GuestPage extends Component {
  template(): string {
    return `
      <h1>방명록!</h1>
      <div class='guest-book'></div>
    `;
  }

  mounted(): void {
    this.addComponent(GuestBook, "guest-book");
  }
}

export default GuestPage;
