import Component from '../core/Component';
import { store, userInfo, UserInfo } from '../store';

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
    const setUserInfo = store.setData(userInfo);
    const resetUserInfo = store.resetData(userInfo);

    if ($input) {
      $input.addEventListener('input', (e) => {
        const newName = (e.target as HTMLInputElement).value;
        setUserInfo((prev: UserInfo) => ({ ...prev, name: newName }));
      });
    }

    this.$target.addEventListener('click', (e) => {
      switch ((e.target as HTMLElement).id) {
        case 'increase':
          setUserInfo((prev: UserInfo) => ({
            ...prev,
            age: prev.age + 1,
          }));
          setUserInfo((prev: UserInfo) => ({
            ...prev,
            age: prev.age - 1,
          }));
          setUserInfo((prev: UserInfo) => ({
            ...prev,
            age: prev.age + 1,
          }));
          break;
        case 'decrease':
          setUserInfo((prev: UserInfo) => ({
            ...prev,
            age: prev.age - 1,
          }));
          break;
        case 'reset':
          resetUserInfo();
      }
    });
  }
}

export default EditInfo;
