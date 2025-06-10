export function emptySvgAsDataUrl(size = 16) {
  return `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'/%3E`;
}

export function elementGetPropertyValue(element, property) {
  return window.getComputedStyle(element).getPropertyValue(property);
}

export function queryGetPropertyValue(query, property) {
  return elementGetPropertyValue(document.querySelector(query), property);
}

export function propagatePropertyValue(query, property, newProperty, options = { delay: 100 }) {
    const interval = setInterval(() => {
      const element = document.querySelector(query);
      if (element) {
        const value = elementGetPropertyValue(element, property);
        if (value) {
          document.documentElement.style.setProperty(newProperty, value);
        }
        clearInterval(interval);
      }
    }, options.delay);
}
