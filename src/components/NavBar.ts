import Component from '../core/Component';
import { navigate } from '../routes/Router';

class NavBar extends Component {
  render() {
    this.$element.innerHTML = `
        <button id='go-home'>go home</button>
        <button id='go-counter'>go counter</button>
        <button id='page1'>page1</button>
    `;
  }

  setEvent() {
    this.$element.addEventListener('click', (event) => {
      const id = (event.target as HTMLElement).getAttribute('id');
      if (id === 'go-counter') navigate('/count');
      else if (id === 'go-home') navigate('/');
      else if (id === 'page1') navigate('/page1');
    });
  }
}

export default NavBar;
