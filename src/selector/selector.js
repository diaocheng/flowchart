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
    this.length = 0;

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
      this.length++;
    }
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
  data() {

  }
  /**
   * 向节点插入文字
   * @param {String} text
   */
  text(text) {
    this.each($el => {
      const textNode = document.createTextNode(text);
      $el.appendChild(textNode);
    });
    return this;
  }
  translate(x, y) {
    this.attr('transform', `translate(${x},${y})`);
    return this;
  }
  translateX(x) {

  }
  translateY(x) {

  }
  shift(dx, dy) {
    this.attr('transform', ($el, index, selector) => {
      const bbox = $el.getBBox();
      let transform = $el.getAttribute('transform');
      transform = transform ? transform.split(' ') : [];
      let translate;
      let translateIndex = 0;
      for (let i = 0, length = transform.length; i < length; i++) {
        if (transform[i].indexOf('translate(') !== -1) {
          translateIndex = i;
          translate = transform[i].match(/\d+,\d+/)[0].split(',');
          break;
        }
      }

      const translateX = translate && translate[0];
      const translateY = translate && translate[1];
      bbox.x = bbox.x || translateX;
      bbox.y = bbox.x || translateY;
      const x = bbox.x + dx;
      const y = bbox.y + dy;
      transform[translateIndex] = `translate(${x},${y})`;
      return transform.join(' ');
    });
    return this;
  }
  shiftX() {

  }
  shiftY() {

  }

  // http://stackoverflow.com/questions/13046811/how-to-determine-size-of-raphael-object-after-scaling-rotating-it/13111598#13111598
  getBBox() {
    const el = this[1];
    function pointToLineDist(A, B, P) {
      let nL = Math.sqrt((B.x - A.x) * (B.x - A.x) + (B.y - A.y) * (B.y - A.y));
      return Math.abs((P.x - A.x) * (B.y - A.y) - (P.y - A.y) * (B.x - A.x)) / nL;
    }

    function dist(point1, point2) {
      let xs = 0;
      let ys = 0;
      xs = point2.x - point1.x;
      xs = xs * xs;
      ys = point2.y - point1.y;
      ys = ys * ys;
      return Math.sqrt(xs + ys);
    }
    let b = el.getBBox();
    let objDOM = el;
    let svgDOM = objDOM.ownerSVGElement;
    // Get the local to global matrix
    let matrix = svgDOM.getTransformToElement(objDOM).inverse();
    let oldp = [[b.x, b.y], [b.x + b.width, b.y], [b.x + b.width, b.y + b.height], [b.x, b.y + b.height]];
    let pt;
    let newp = [];
    let i;
    let pos = Number.POSITIVE_INFINITY;
    let neg = Number.NEGATIVE_INFINITY;
    let minX = pos;
    let minY = pos;
    let maxX = neg;
    let maxY = neg;

    for (i = 0; i < 4; i++) {
      pt = svgDOM.createSVGPoint();
      pt.x = oldp[i][0];
      pt.y = oldp[i][1];
      newp[i] = pt.matrixTransform(matrix);
      if (newp[i].x < minX) minX = newp[i].x;
      if (newp[i].y < minY) minY = newp[i].y;
      if (newp[i].x > maxX) maxX = newp[i].x;
      if (newp[i].y > maxY) maxY = newp[i].y;
    }
    let obj = {};

    // The next refers to the transformed object itself, not bbox
    // newp[0] - newp[3] are the transformed object's corner
    // points in clockwise order starting from top left corner
    obj.newp = newp; // array of corner points
    obj.width = pointToLineDist(newp[1], newp[2], newp[0]) || 0;
    obj.height = pointToLineDist(newp[2], newp[3], newp[0]) || 0;
    obj.toplen = dist(newp[0], newp[1]);
    obj.rightlen = dist(newp[1], newp[2]);
    obj.bottomlen = dist(newp[2], newp[3]);
    obj.leftlen = dist(newp[3], newp[0]);
    // The next refers to the transformed object's bounding box
    obj.BBx = minX;
    obj.BBy = minY;
    obj.BBx2 = maxX;
    obj.BBy2 = maxY;
    obj.BBwidth = maxX - minX;
    obj.BBheight = maxY - minY;
    return obj;
  }
  x() {
    const $el = this[0];
    if ($el) {
      const bbox = $el.getBBox();
      const clientRect = $el.getBoundingClientRect();
      return bbox.x || clientRect.left || 0;
    }
    return null;
  }
  y() {
    const $el = this[0];
    if ($el) {
      const bbox = $el.getBBox();
      const clientRect = $el.getBoundingClientRect();
      return bbox.y || clientRect.top || 0;
    }
    return null;
  }
  width() {
    return this[0].getBBox().width;
  }
  height() {
    return this[0].getBBox().height;
  }
  on(event, listener, useCapture = false) {
    this.each($el => {
      $el.addEventListenr(event, listener, useCapture);
    });
    return this;
  }
  off(event, listener, useCapture = false) {
    this.each($el => {
      $el.removeEventListenr(event, listener, useCapture);
    });
    return this;
  }
}
