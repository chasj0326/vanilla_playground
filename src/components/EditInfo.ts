import Component from '../core/Component';
import { store, name, age } from '../data';

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

    if ($input) {
      $input.addEventListener('input', (e) => {
        const newName = (e.target as HTMLInputElement).value;
        store.setData(name, newName);
      });
    }

    this.$target.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.id === 'increase') {
        store.setData(age, (prev: number) => prev + 1);
      } else if (target.id === 'decrease') {
        store.setData(age, (prev: number) => prev - 1);
      } else if (target.id === 'reset') {
        store.resetData(age);
        store.resetData(name);
      }
    });
  }
}

export default EditInfo;
