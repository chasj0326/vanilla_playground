import NavBar from '../components/NavBar';
import { outlet } from '../routes/domUtils';
import Component from '../core/Component';

class HomePage extends Component {
  template(): string {
    return `
      <div>
        <h2>Home 페이지 입니다.</h2>
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
          { name: 'post', path: '/post' },
          { name: 'count', path: '/count' },
        ],
      },
    });
  }
}

export default HomePage;
