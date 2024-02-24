import { Component, outlet } from '@core';
import Directory from '@notion/components/Directory';

class MainPage extends Component {
  template() {
    return `
    <div style='display: flex; padding: 20px; gap: 20px;'>
      <nav class='directory'></nav>
      ${outlet('main')}
    </div>
    `;
  }

  rendered() {
    this.addComponent(Directory);
  }
}

export default MainPage;
