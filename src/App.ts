import { Component, outlet } from "@core";

class App extends Component {
  template(): string {
    return `${outlet({
      tag: "div",
      attributes: {
        class: "app-container",
      },
    })}`;
  }
}

export default App;
