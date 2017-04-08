class Selector {
  static namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/'
  }
  constructor(selector) {
    let $el = [];
    if (selector instanceof Selector) {
      $el = selector;
    } else if (selector instanceof Array) {
      $el = selector;
    } else if (selector instanceof Element) {
      $el = [selector];
    } else if (selector instanceof NodeList) {
      $el = selector;
    } else {
      $el = document.querySelectorAll(selector);
    }
    for (let i = 0, length = $el.length; i < length; i++) {
      this[i] = $el[i];
    }
    this.length = $el.length;
    return this;
  }
  /**
   * 遍历对象的元素
   * @param {Function} callback
   * @param {*} context
   */
  each(callback, context) {
    for (let i = 0, length = this.length; i < length; i++) {
      callback.call(context || this[i], this[i], i, this);
    }
    return this;
  }
  /**
   * 返回一个新的从原Selector对象Selector对象
   * @param {Function} callback
   * @param {*} context
   */
  map(callback, context) {
    const $selector = [];
    for (let i = 0, length = this.length; i < length; i++) {
      const $el = callback.call(context || this[i], this[i], i, this);
      if ($el) {
        $selector.push($el);
      }
    }
    return new Selector($selector);
  }
  /**
   * 选择元素
   * @param {String} selector
   */
  select(selector) {
    const $selector = [];
    this.each($el => {
      Array.prototype.push.apply($selector, $el.querySelectorAll(selector));
    });
    return new Selector($selector);
  }
  /**
   * 插入元素
   * @param {String} el
   */
  append(el) {
    const namespace = 'svg';
    const $selector = this.map($el => {
      const node = document.createElementNS(Selector.namespaces[namespace], el);
      $el.appendChild(node);
      return node;
    });
    return new Selector($selector);
  }
  /**
   * 设置属性
   * @param {*} name
   * @param {*} val
   */
  attr(name, val) {
    if (typeof name === 'string' && val) {
      this.each($el => {
        $el.setAttribute(name, val);
      });
    } else if (typeof name === 'object') {
      for (let key in name) {
        this.each($el => {
          $el.setAttribute(key, name[key]);
        });
      }
    }
    return this;
  }
  text(text) {
    const textNode = document.createTextNode(text);
    this.each($el => {
      $el.appendChild(textNode);
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
