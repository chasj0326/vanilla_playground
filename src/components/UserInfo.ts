import Component from '../core/Component';
import { store, userInfo } from '../store';

class UserInfo extends Component {
  created() {
    store.subscribe([userInfo], () => this.render());
  }

  template() {
    const { name, age } = store.getData(userInfo);

    return `
      <p>name : ${name}</p>
      <p>age : ${age}</p>
    `;
  }
}

export default UserInfo;
