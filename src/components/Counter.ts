import Component from '../core/Component';
import viteLogo from '/vite.svg';
import typescriptLogo from '/typescript.svg';

class CountPage extends Component<number> {
  render() {
    this.$element.innerHTML = `
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="${viteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
        count = ${this.state}
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
  `;
  }

  setEvent() {
    this.$element.addEventListener('click', () => {
      this.setState(this.state + 1);
    });
  }
}

export default CountPage;
