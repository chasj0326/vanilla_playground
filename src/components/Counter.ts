import Component from '../core/Component';

class Counter extends Component<number> {
  render() {
    this.$element.innerHTML = `count is ${this.state}`;
  }

  setEvent() {
    this.$element.addEventListener('click', () => {
      this.setState(this.state + 1);
    });
  }
}

export default Counter;
