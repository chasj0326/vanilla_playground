import { Component, outlet } from '@core';

class App extends Component {
  template(): string {
    return `${outlet()}`;
  }
}

export default App;
