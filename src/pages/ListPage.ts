import Page from '../core/Page';
import NavBar from '../components/NavBar';

class ListPage extends Page {
  render($page: HTMLElement) {
    $page.innerHTML = `
      <div>
        <h2>List 페이지 입니다.</h2>
        <div class="nav">
        <!-- Navbar Component -->
        </div>
        <div id='outlet'></div>
      </div>
    `;

    const $nav = $page.querySelector<HTMLElement>('.nav')!;
    new NavBar({
      parent: $nav,
      element: {
        tag: 'div',
      },
      initialState: [
        { name: 'item1', path: '/list/item1' },
        { name: 'item2', path: '/list/item2' },
      ],
    });
  }
}

export default ListPage;
