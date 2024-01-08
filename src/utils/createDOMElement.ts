export interface ElementProps {
  tag: keyof HTMLElementTagNameMap;
  attributes?: {
    [name: string]: string;
  };
}

const createDOMElement = ({ tag, attributes }: ElementProps) => {
  const $element = document.createElement(tag);
  for (const name in attributes) {
    $element.setAttribute(name, attributes[name]);
  }

  return $element;
};

export default createDOMElement;
