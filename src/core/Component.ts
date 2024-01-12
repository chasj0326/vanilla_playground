interface ComponentProps<Props, State> {
  target: HTMLElement;
  state?: State;
  props?: Props;
}

class Component<Props = null, State = null> {
  $target;
  props;
  state;

  constructor({
    target,
    props,
    state,
  }: ComponentProps<Props, State>) {
    this.$target = target;
    this.props = props;
    this.state = state;

    this.render();
    this.setEvent();
  }

  template() {
    return ``;
  }

  mounted() {}

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }

  setEvent() {}
}

export default Component;
