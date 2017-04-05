export default class Selector {
  $namespace = 'http://www.w3.org/2000/svg';
  constructor($el) {
    this.$el = $el;
    return this;
  }
  select(selector) {
    if (selector instanceof HTMLElement) {
      return selector;
    }
    const $el = document.querySelector(selector);
    return new Selector($el);
  }
  append(el) {
    const $el = el instanceof HTMLElement
      ? el
      : document.createElementNS(this.$namespace, el);
    this.$el.appendChild($el);
    return new Selector($el);
  }
  attr(attribute, value) {
    this.$el.setAttribute(attribute, value);
    return this;
  }
  on(event, listener, useCapture = false) {
    this.$el.addEventListenr(event, listener, useCapture);
    return this;
  }
  off(event, listener, useCapture = false) {
    this.$el.removeEventListenr(event, listener, useCapture);
  }
}
