export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  attributes?: {
    [name: string]: string;
  };
}

const createDOMElement = (
  { tag, attributes }: ElementProps,
  innerText?: string,
) => {
  const $element = document.createElement(tag);
  for (const name in attributes) {
    $element.setAttribute(name, attributes[name]);
  }
  if (innerText) {
    $element.innerText = innerText;
  }
  return $element;
};

export default createDOMElement;
