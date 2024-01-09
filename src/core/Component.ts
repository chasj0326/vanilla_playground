import createDOMElement, {
  ElementProps,
} from '../utils/createDOMElement';

interface ComponentProps<State> {
  parent: HTMLElement;
  element: ElementProps;
  initialState: State;
}

class Component<State = null> {
  $element;
  state;

  constructor({
    parent,
    element,
    initialState,
  }: ComponentProps<State>) {
    this.state = initialState;
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
