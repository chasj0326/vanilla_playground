import Page from '../core/Page';
import viteLogo from '/vite.svg';
import typescriptLogo from '/typescript.svg';
import Counter from '../components/Counter';

class CountPage extends Page {
  render($page: HTMLElement) {
    $page.innerHTML = `
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
        <!-- Counter component -->
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    `;

    const $card = $page.querySelector<HTMLElement>('.card')!;
    new Counter({
      parent: $card,
      element: {
        tag: 'button',
      },
      initialState: 0,
    });
  }
}

export default CountPage;
