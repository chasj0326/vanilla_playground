import Component from '../core/Component';
import NavBar from '../components/NavBar';
import { outlet } from '../routes/domUtils';

class ListPage extends Component {
  template(): string {
    return `
      <div>
        <h2>List 페이지 입니다.</h2>
        <div class="nav">
        <!-- Navbar Component -->
        </div>
        ${outlet()}
      </div>
    `;
  }

  mounted(): void {
    const $nav = this.$target.querySelector<HTMLElement>('.nav')!;
    new NavBar({
      target: $nav,
      props: [
        { name: 'item1', path: '/list/item1' },
        { name: 'item2', path: '/list/item2' },
      ],
    });
  }
}

export default ListPage;
