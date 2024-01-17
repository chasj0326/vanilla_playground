import Component from '../core/Component';
import { store, userInfo, UserInfo } from '../data';

class EditInfo extends Component {
  template(): string {
    return `
      <input placeholder="수정할 이름을 입력해주세요."/>
      <div>
        <button id="increase">age +</button>
        <button id="decrease">age -</button>
      </div>
      <hr/>
      <button id="reset">reset all data</button>
    `;
  }
  setEvent(): void {
    const $input = this.$target.querySelector('input');
    // const setName = store.setData(name);
    // const setAge = store.setData(age);
    // const resetName = store.resetData(name);
    // const resetAge = store.resetData(age);
    const setUserInfo = store.setData(userInfo);
    const resetUserInfo = store.resetData(userInfo);

    if ($input) {
      $input.addEventListener('input', (e) => {
        const newName = (e.target as HTMLInputElement).value;
        setUserInfo((prev: UserInfo) => ({ ...prev, name: newName }));
      });
    }

    this.$target.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'increase') {
        setUserInfo((prev: UserInfo) => ({
          ...prev,
          age: prev.age + 1,
        }));
      } else if (target.id === 'decrease') {
        setUserInfo((prev: UserInfo) => ({
          ...prev,
          age: prev.age - 1,
        }));
      } else if (target.id === 'reset') {
        resetUserInfo();
      }
    });
  }
}

export default EditInfo;
