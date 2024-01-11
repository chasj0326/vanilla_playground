import Page from '../core/Page';
import NavBar from '../components/NavBar';
import { outlet } from '../routes/domUtils';

class HomePage extends Page {
  render($page: HTMLElement) {
    $page.innerHTML = `
      <div>
        <h2>Home 페이지 입니다.</h2>
        <div class="nav">
        <!-- Navbar Component -->
        </div>
        <hr/>
        ${outlet()}
      </div>
    `;

    const $nav = $page.querySelector<HTMLElement>('.nav')!;
    new NavBar({
      parent: $nav,
      element: {
        tag: 'div',
      },
      state: [
        { name: 'home', path: '/' },
        { name: 'list', path: '/list' },
        { name: 'about', path: '/about' },
        { name: 'count', path: '/count' },
      ],
    });
  }
}

export default HomePage;
