import Page from '../core/Page';
import NavBar from '../components/NavBar';

class HomePage extends Page {
  render($page: HTMLElement) {
    $page.innerHTML = `
      <div>
        <h2>Home 페이지 입니다.</h2>
        <div class="nav">
        <!-- Navbar Component -->
        </div>
        <hr/>
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
        { name: 'home', path: '/' },
        { name: 'list', path: '/list' },
        { name: 'about', path: '/about' },
      ],
    });
  }
}

export default HomePage;
