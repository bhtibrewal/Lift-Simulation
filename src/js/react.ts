const react = {
  createElement: <T>(tag: string, props, children?: T) => {
    const el = { tag, props, children };
    return el;
  },
};
export const render = (element, container) => {
  if (!element) return container;
  if (typeof element == "string" || typeof element == "number") {
    container.appendChild(document.createTextNode(String(element)));
    return;
  }

  const component = document.createElement(element.tag) as HTMLElement;
  element.props &&
    Object.keys(element.props).forEach((prop) =>
      prop == "onclick" || prop == "onsubmit"
        ? (component[prop] = element.props[prop])
        : component.setAttribute(prop, element.props[prop])
    );

  element.children?.forEach?.((child) => {
    render(child, component);
  });

  container.appendChild(component);
};

export default react;
