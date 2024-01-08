import { navigate } from './routes/Router';

class App {
  $app;

  constructor({ $app }: { $app: HTMLElement }) {
    this.$app = $app;
    this.render();
    this.setEvent();
  }

  render() {
    this.$app.innerHTML = `
      <div>
        <div>hello!</div>
        <button id='go-counter'>go counter</button>
        <button id='go-home'>go home</button>
        <div id='outlet'></div>
      </div>
    `;
  }

  setEvent() {
    this.$app.addEventListener('click', (event) => {
      const id = (event.target as HTMLElement).getAttribute('id');
      if (id === 'go-counter') navigate('/count');
      else if (id === 'go-home') navigate('/');
    });
  }
}

export default App;
