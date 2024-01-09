import Page from '../core/Page';
import NavBar from '../components/NavBar';

class HomePage extends Page {
  render($page: HTMLElement) {
    $page.innerHTML = `
      <div>
        <div>hello!</div>
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
      initialState: null,
    });
  }
}

export default HomePage;
