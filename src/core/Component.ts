import createDOMElement, {
  ElementProps,
} from '../utils/createDOMElement';

interface ComponentProps<State> {
  parent: HTMLElement;
  element: ElementProps;
  state: State;
}

class Component<State = null> {
  $element;
  state;

  constructor({ parent, element, state }: ComponentProps<State>) {
    this.state = state;
    this.$element = createDOMElement(element);
    parent.append(this.$element);

    this.render();
    this.setEvent();
  }

  render() {}
  setState(nextState: State) {
    this.state = nextState;
    this.render();
  }
  setEvent() {}
}

export default Component;
