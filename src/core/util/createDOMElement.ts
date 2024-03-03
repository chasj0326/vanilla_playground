export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  attributes?: {
    [name: string]: string;
  };
}

const createDOMElement = (
  { tag, attributes }: ElementProps,
  innerHTML?: string,
) => {
  const $element = document.createElement(tag);
  for (const name in attributes) {
    $element.setAttribute(name, attributes[name]);
  }
  if (innerHTML) {
    $element.innerHTML = innerHTML;
  }
  return $element;
};

export default createDOMElement;
