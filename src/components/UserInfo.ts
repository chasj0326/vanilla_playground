import Component from '../core/Component';
import { store } from '../main';

class UserInfo extends Component {
  created() {
    store.subscribe('name', () => this.render());
    store.subscribe('age', () => this.render());
  }

  template() {
    const name = store.get('name');
    const age = store.get('age');

    return `
      <p>name : ${name}</p>
      <p>age : ${age}</p>
    `;
  }
}

export default UserInfo;
