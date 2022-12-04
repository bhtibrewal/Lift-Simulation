const react = {
  createElement: (tag, props, children?: string | HTMLElement[]) => {
    const el = document.createElement(tag) as HTMLElement;
    for (let [key, value] of Object.entries(props))
      el.setAttribute(key, value as string);
    if (children === "string")
      el.appendChild(document.createTextNode(String(children)));
    else if (children.length) el.append(...children);
    return el;
  },
};

export default react;
