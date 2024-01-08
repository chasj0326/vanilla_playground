import viteLogo from '../public/vite.svg';
import typescriptLogo from '../public/typescript.svg';
import Counter from './components/Counter';

class App {
  $app;

  constructor({ $app }: { $app: HTMLElement }) {
    this.$app = $app;
    this.render();
  }

  render() {
    this.$app.innerHTML = `
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
          <!-- Counter Component -->
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    `;

    const card = this.$app.querySelector<HTMLElement>('.card');
    new Counter({
      parent: card!,
      element: {
        tag: 'button',
        attributes: { id: 'counter', type: 'button' },
      },
      initialState: 0,
    });
  }
}

export default App;
