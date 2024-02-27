import { Component, outlet } from '@core';
import Directory from '@notion/components/Directory';
import NavHeader from '@notion/components/NavHeader';

class MainPage extends Component {
  template() {
    return `
      <nav>
        <header></header>
        <div class='directory'></div>
      </nav>
      ${outlet('main')}
    `;
  }

  rendered() {
    this.addComponent(Directory);
    this.addComponent(NavHeader, {
      selector: 'header',
    });
  }
}

export default MainPage;
