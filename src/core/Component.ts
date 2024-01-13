interface ComponentProps<Props = any, State = any> {
  target: HTMLElement;
  state?: State;
  props?: Props;
}

class Component<Props = any, State = any> {
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

    this.created();
    this.render();
    this.setEvent();
  }

  template() {
    return ``;
  }

  created() {}

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

  addComponent<T extends new (args: any) => Component>(
    ComponentClass: T,
    params: Omit<ConstructorParameters<T>[0], 'target'> & {
      selector?: string;
    }
  ) {
    const $container = this.$target.querySelector<HTMLElement>(
      params.selector ?? `.${ComponentClass.name.toLowerCase()}`
    );

    if ($container === null) return;

    return new ComponentClass({
      target: $container,
      ...params,
    });
  }
}

export default Component;
