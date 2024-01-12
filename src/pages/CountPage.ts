import viteLogo from '/vite.svg';
import typescriptLogo from '/typescript.svg';
import Counter from '../components/Counter';
import Component from '../core/Component';

class CountPage extends Component {
  template(): string {
    return `
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
  }

  mounted(): void {
    const $card = this.$target.querySelector<HTMLElement>('.card')!;
    new Counter({
      target: $card,
      state: 0,
    });
  }
}

export default CountPage;
