import Component from '../core/Component';
import { store, name, age } from '../data';

class UserInfo extends Component {
  created() {
    store.subscribe(name, () => this.render());
    store.subscribe(age, () => this.render());
  }

  template() {
    const nameValue = store.getData(name);
    const ageValue = store.getData(age);

    return `
      <p>name : ${nameValue}</p>
      <p>age : ${ageValue}</p>
    `;
  }
}

export default UserInfo;
