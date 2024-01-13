import NavBar from '../components/NavBar';
import { outlet } from '../routes/domUtils';
import Component from '../core/Component';

class HomePage extends Component {
  template() {
    return `
      <div>
        <div class="navbar">
        </div>
        <hr/>
        ${outlet()}
      </div>
  `;
  }

  mounted() {
    this.addComponent(NavBar, {
      props: {
        contents: [
          { name: 'home', path: '/' },
          { name: 'list', path: '/list' },
          { name: 'about', path: '/about' },
          { name: 'count', path: '/count' },
          { name: 'post', path: '/post' },
        ],
      },
    });
  }
}

export default HomePage;
