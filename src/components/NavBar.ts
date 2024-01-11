import Component from '../core/Component';
import { navigate } from '../routes/Router';

class NavBar extends Component<{ name: string; path: string }[]> {
  render() {
    this.$element.innerHTML = `
      ${this.state
        .map(
          ({ name, path }) => `<button id='${path}'>${name}</button>`
        )
        .join('')}
    `;
  }

  setEvent() {
    this.$element.addEventListener('click', (event) => {
      const id = (event.target as HTMLElement).getAttribute('id');
      if (id) navigate(id);
    });
  }
}

export default NavBar;
