export default class Selector {
  static namespace = 'http://www.w3.org/2000/svg';
  constructor($el) {
    this.$el = Array.isArray($el) ? $el : [$el];
    return this;
  }
  get width() {
    return this.$el[0] ? this.$el[0].offsetWidth : undefined;
  }
  get height() {
    return this.$el[0] ? this.$el[0].offsetHeight : undefined;
  }
  select(selector) {
    if (selector instanceof Selector) {
      return selector;
    }
    const $el = selector instanceof Element
      ? selector
      : (this.$el
        ? this.$el[0].querySelector(selector)
        : document.querySelector(selector));
    return new Selector($el);
  }
  selectAll(selector) {
    if (selector instanceof Selector) {
      return selector;
    }
    const $el = selector instanceof Element
      ? selector
      : (this.$el
        ? this.$el.map(item => { return item.querySelector(selector); })
        : document.querySelector(selector));
    return new Selector($el);
  }
  append(el) {
    const $els = this.$el.map(item => {
      const $el = el instanceof Element
        ? el
        : document.createElementNS(Selector.namespace, el);
      item.appendChild($el);
      return $el;
    });
    return new Selector($els);
  }
  attr(attr, val) {
    const attributes = {};
    if (arguments.length === 2) {
      attributes[attr] = val;
    }
    for (let key in attributes) {
      this.$el.forEach(item => {
        item.setAttribute(key, attributes[key]);
      });
    }
    return this;
  }
  text(text) {
    const textNode = document.createTextNode(text);
    this.$el.forEach(item => {
      item.appendChild(textNode);
    });
    return this;
  }
  translate(x, y) {

  }
  on(event, listener, useCapture = false) {
    this.$el.addEventListenr(event, listener, useCapture);
    return this;
  }
  off(event, listener, useCapture = false) {
    this.$el.removeEventListenr(event, listener, useCapture);
  }
}
