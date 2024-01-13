import NavBar from '../components/NavBar';
import { outlet } from '../routes/domUtils';
import Component from '../core/Component';

class HomePage extends Component {
  template(): string {
    return `
      <div>
        <div class="nav">
        </div>
        <hr/>
        ${outlet()}
      </div>
  `;
  }

  mounted(): void {
    const $nav = this.$target.querySelector<HTMLElement>('.nav')!;
    new NavBar({
      target: $nav,
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
