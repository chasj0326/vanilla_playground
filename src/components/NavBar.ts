import Component from '../core/Component';
import { navigate } from '../routes/Router';

type NavBarProps = { name: string; path: string }[];

class NavBar extends Component<NavBarProps> {
  props = [];

  template(): string {
    return `
    ${this.props
      .map(
        ({ name, path }) => `<button id='${path}'>${name}</button>`
      )
      .join('')}
  `;
  }

  setEvent() {
    this.$target.addEventListener('click', (event) => {
      const id = (event.target as HTMLElement).getAttribute('id');
      if (id) navigate(id);
    });
  }
}

export default NavBar;
