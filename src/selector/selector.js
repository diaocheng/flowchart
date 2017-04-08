const namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
};

export default class Selector {
  static namespaces = namespaces;
  static SELECTOR = 0;
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
      if ($el[i].__SELECTOR__ === undefined) {
        // 给每一个元素编号
        $el[i].__SELECTOR__ = Selector.SELECTOR++;
      }
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
    // 标签前缀命名空间字符串
    let namespace = el;
    // 命名空间与标签的分隔符':'的位置
    const i = el.indexOf(':');
    if (i >= 0) {
      namespace = el.slice(0, i);
      if (namespace !== 'xmlns') {
        el = el.slice(i + 1);
      }
    }
    // 获取命名空间
    const $selector = this.map($el => {
      let node;
      // 判断创建元素是否有命名空间
      if (Selector.namespaces[namespace]) {
        node = document.createElementNS(Selector.namespaces[namespace], el);
      } else if ($el.namespaceURI !== Selector.namespaces['xhtml']) {
        node = document.createElementNS($el.namespaceURI, el);
      } else if (document.documentElement.namespaceURI !== Selector.namespaces['xhtml']) {
        node = document.createElementNS(document.documentElement.namespaceURI, el);
      } else {
        node = document.createElement(el);
      }
      $el.appendChild(node);
      return node;
    });
    return new Selector($selector);
  }
  /**
   * 设置属性
   * @param {String} name
   * @param {String|Function} val
   */
  attr(name, val) {
    // 判断是否为命名标签属性 //
    let namespace = name;
    // 命名空间与标签的分隔符':'的位置
    const i = name.indexOf(':');
    if (i >= 0) {
      namespace = name.slice(0, i);
      if (namespace !== 'xmlns') {
        name = name.slice(i + 1);
      }
    }
    this.each(($el, index, selector) => {
      let value = val;
      if (typeof val === 'function') {
        value = val.call(this, $el, index, selector);
      }
      // 判断是否有命名空间
      if (Selector.namespaces[namespace]) {
        if (value) {
          $el.setAttributeNS(Selector.namespaces[namespace], name, value);
        } else {
          $el.removeAttributeNS(Selector.namespaces[namespace], name);
        }
      } else {
        if (value) {
          $el.setAttribute(name, value);
        } else {
          $el.removeAttribute(name);
        }
      }
    });
    return this;
  }
  text(text) {
    this.each($el => {
      const textNode = document.createTextNode(text);
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
