import { Component, outlet } from '@core';
import Directory from '@notion/components/Directory';

class MainPage extends Component {
  template() {
    return `
      <nav class='directory'></nav>
      ${outlet('main')}
    `;
  }

  rendered() {
    this.addComponent(Directory);
  }
}

export default MainPage;
