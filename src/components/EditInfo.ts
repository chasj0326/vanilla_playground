import Component from '../core/Component';
import { store } from '../main';

class EditInfo extends Component {
  template(): string {
    return `
      <input placeholder="수정할 이름을 입력해주세요."/>
      <div>
        <button id="increase">age +</button>
        <button id="decrease">age -</button>
      </div>
    `;
  }
  setEvent(): void {
    const $input = this.$target.querySelector('input');
    const $buttons = this.$target.querySelector('div');

    if ($input) {
      $input.addEventListener('input', (e) => {
        const newName = (e.target as HTMLInputElement).value;
        store.set('name', newName);
      });
    }

    if ($buttons) {
      $buttons.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.id === 'increase') {
          store.set('age', (prev: number) => prev + 1);
        } else if (target.id === 'decrease') {
          store.set('age', (prev: number) => prev - 1);
        }
      });
    }
  }
}

export default EditInfo;
