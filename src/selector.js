class Selector {
  static namespace = 'http://www.w3.org/2000/svg';
  constructor(selector) {
    if (selector instanceof Selector) {
      return selector;
    } else if (selector instanceof Array) {
      this.$el = selector;
    } else if (selector instanceof Element) {
      this.$el = [selector];
    } else if (selector instanceof NodeList) {
      this.$el = Array.prototype.slice.call(selector);
    } else {
      selector = document.querySelectorAll(selector);
      this.$el = Array.prototype.slice.call(selector);
    }
    return this;
  }
  select(selector) {
    const $selector = [];
    this.$el.forEach($el => {
      Array.prototype.push.apply($selector, $el.querySelectorAll(selector));
    });
    return new Selector($selector);
  }
  append(el) {
    const $selector = this.$el.map($el => {
      const node = document.createElementNS(Selector.namespace, el);
      $el.appendChild(node);
      return node;
    });
    return new Selector($selector);
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
  translate(x, y) { }
  on(event, listener, useCapture = false) {
    this.$el.addEventListenr(event, listener, useCapture);
    return this;
  }
  off(event, listener, useCapture = false) {
    this.$el.removeEventListenr(event, listener, useCapture);
  }
}
// 导出选择符函数
export default function (selector) {
  return new Selector(selector);
}
