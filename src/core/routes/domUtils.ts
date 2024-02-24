import Component from '../Component';
import createDOMElement, {
  ElementProps,
} from '../../utils/createDOMElement';

const getOutletElement = (depth: number) => {
  const selector = Array(depth + 1)
    .fill('#outlet')
    .join(' ');
  return document.querySelector<HTMLElement>(selector);
};

export const removeOutletElement = (depth: number) => {
  const $outlet = getOutletElement(depth);
  if ($outlet) {
    $outlet.innerHTML = '';
  }
};

export const paintOutletElement = (
  depth: number,
  component: typeof Component
) => {
  const $outlet = getOutletElement(depth)!;
  if ($outlet) {
    new component({
      target: $outlet,
    });
  }
};

export const outlet = (
  element?: keyof HTMLElementTagNameMap | ElementProps
) => {
  const elementProps: ElementProps = {
    tag: 'div',
    attributes: {},
  };

  if (typeof element === 'string') {
    elementProps.tag = element;
  } else if (element?.tag) {
    elementProps.tag = element.tag;
    elementProps.attributes = element?.attributes ?? {};
  }

  return createDOMElement({
    tag: elementProps.tag,
    attributes: { id: 'outlet', ...elementProps.attributes },
  }).outerHTML;
};
