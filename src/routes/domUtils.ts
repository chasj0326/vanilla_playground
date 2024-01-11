import createDOMElement, {
  ElementProps,
} from '../utils/createDOMElement';

const getOutletElement = (depth: number) => {
  const selector = Array(depth).fill('#outlet').join(' ') || '#app';
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
  paint: (outlet: HTMLElement) => void
) => {
  const $outlet = getOutletElement(depth);
  if ($outlet) {
    paint($outlet);
  }
};

export const outlet = (element?: ElementProps) => {
  const tag = element?.tag ?? 'div';
  const attributes = element?.attributes ?? {};

  return createDOMElement({
    tag,
    attributes: { id: 'outlet', ...attributes },
  }).outerHTML;
};
