import Component from '../core/Component';

class Counter extends Component<null, number> {
  state = 0;

  template(): string {
    return `<button>count = ${this.state}</button>`;
  }

  increaseCount() {
    this.setState(this.state + 1);
  }

  setEvent() {
    this.$target.addEventListener('click', () =>
      this.increaseCount()
    );
  }
}

export default Counter;
