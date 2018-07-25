export interface ElementOptions {
  id?: string;
  class?: string;
  html?: string | HTMLElement | HTMLElement[];
  attrs?: { [key: string]: string };
}

/**
 * Wrapper over `document.createElement` to quickly provide the most common options
 *
 * @param type Type of the element to create
 * @param options Optional options with extra parameters
 */
export function createElement<T extends HTMLElement = HTMLElement>(type: string, options: ElementOptions = {}): T {
  const elem = document.createElement(type) as T;

  if (options.id) {
    elem.id = options.id;
  }

  if (options.class) {
    elem.className = options.class;
  }

  if (typeof options.html === 'string') {
    elem.innerHTML = options.html;
  } else if (options.html instanceof HTMLElement) {
    elem.appendChild(options.html);
  } else if (Array.isArray(options.html)) {
    options.html.forEach((html) => {
      elem.appendChild(html);
    });
  }

  if (options.attrs) {
    Object.keys(options.attrs)
      .forEach((key) => {
        elem.setAttribute(key, options.attrs[key]);
      });
  }

  return elem;
}
