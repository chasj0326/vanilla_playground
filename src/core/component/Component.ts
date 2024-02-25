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
    this.mounted();
  }

  template() {
    return ``;
  }

  created() {}

  mounted() {}

  rendered() {}

  render() {
    this.$target.innerHTML = this.template();
    this.rendered();
  }

  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }

  addComponent<T extends new (args: any) => Component>(
    ComponentClass: T,
    params?: Omit<ConstructorParameters<T>[0], 'target'> & {
      selector?: string;
    }
  ) {
    const $container = this.$target.querySelector<HTMLElement>(
      params?.selector ?? `.${ComponentClass.name.toLowerCase()}`
    );

    if ($container === null) return;
    return new ComponentClass({
      target: $container,
      ...(params ?? {}),
    });
  }

  addEvent(
    type: keyof HTMLElementEventMap,
    listener: (targetElement: HTMLElement) => void
  ) {
    this.$target.addEventListener(type, (event) => {
      const targetElement = event.target as HTMLElement;
      listener(targetElement);
    });
  }

  findElement<ElementType>(selector: string) {
    return this.$target.querySelector(selector) as ElementType;
  }
}

export default Component;
