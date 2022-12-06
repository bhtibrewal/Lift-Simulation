const react = {
  createElement: <T>(tag: string, props, children?: T) => {
    const el = { tag, props, children };
    return el;
  },
};
export const render = (element, container) => {
  // console.log(element);
  if (!element) return container;
  if (typeof element == "string" || typeof element == "number") {
    container.appendChild(document.createTextNode(String(element)));
    return;
  }

  const component = document.createElement(element.tag) as HTMLElement;
  element.props &&
    Object.keys(element.props).forEach((prop) =>
      prop == "onclick"
        ? (component[prop] = element.props[prop])
        : component.setAttribute(prop, element.props[prop])
    );

  element.children?.forEach?.((child) => {
    render(child, component);
  });

  // console.log(component);
  container.appendChild(component);
};

export default react;

// element: HTMLElement | string | number

// const react = {
//   createElement: (tag, props, children?: string | HTMLElement[]) => {
//     const el = document.createElement(tag) as HTMLElement;

//     for (let [key, value] of Object.entries(props))
//       el.setAttribute(key, value as string);

//     if (typeof children === "string")
//       el.appendChild(document.createTextNode(String(children)));
//     else if (children) el.append(...children);

//     return el;
//   },
// };
