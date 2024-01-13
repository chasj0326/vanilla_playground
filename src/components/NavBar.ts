import Component from '../core/Component';
import { navigate } from '../routes/Router';

interface NavBarProps {
  tag?: keyof HTMLElementTagNameMap;
  contents: { name: string; path: string }[];
}

class NavBar extends Component<NavBarProps> {
  props = {} as NavBarProps;

  template(): string {
    const navType = this.props.tag ?? 'button';

    return `
    ${this.props.contents
      .map(
        ({ name, path }) =>
          `<${navType} id='${path}'>${name}</${navType}>`
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
