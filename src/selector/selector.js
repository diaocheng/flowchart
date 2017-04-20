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
  /**
   * 移动到指定位置
   * @param {Number} x
   * @param {Number} y
   * @param {Function} callback
   */
  translate(x, y, callback) {
    this.attr('transform', ($el, index, selector) => {
      let transform = $el.getAttribute('transform');
      transform = transform ? transform.split(' ') : [];

      // 防止改变全局x,y值
      let $x = x;
      let $y = y;

      let ox = 0;
      let oy = 0;
      transform = transform.filter(item => {
        if (item.indexOf('translate') === -1) {
          return true;
        } else {
          const translate = item.match(/\d+,\d+/)[0].split(',');
          ox += parseFloat(translate[0]) || 0;
          oy += parseFloat(translate[1]) || 0;
        }
      });

      if (typeof callback === 'function') {
        // 传入新的值和原来的值，并返回求得的值
        const nVal = { x: $x, y: $y };
        const oVal = { x: ox, y: oy };
        const translate = callback.call(this, nVal, oVal, $el, index, selector);
        $x = translate.x;
        $y = translate.y;
      }

      transform.push(`translate(${$x},${$y})`);
      return transform.join(' ');
    });
    return this;
  }
  /**
   * 移动x到指定位置
   * @param {Number} x
   * @param {Function} callback
   */
  translateX(x, callback) {
    this.translate(x, 0, (nVal, oVal, $el, index, selector) => {
      let val = {
        x: nVal.x,
        y: oVal.y
      };
      if (typeof callback === 'function') {
        val = callback.call(this, nVal, oVal, $el, index, selector) || val;
      }
      return val;
    });
    return this;
  }
  /**
   * 移动y到指定位置
   * @param {Number} y
   * @param {Function} callback
   */
  translateY(y, callback) {
    this.translate(0, y, (nVal, oVal, $el, index, selector) => {
      let val = {
        x: oVal.x,
        y: nVal.y
      };
      if (typeof callback === 'function') {
        val = callback.call(this, nVal, oVal, $el, index, selector) || val;
      }
      return val;
    });
    return this;
  }
  /**
   * 移动指定距离
   * @param {Number} x
   * @param {Number} y
   * @param {Function} callback
   */
  shift(x, y, callback) {
    this.translate(0, 0, (nVal, oVal, $el, index, selector) => {
      let val = {
        x: nVal.x + oVal.x,
        y: nVal.y + oVal.y
      };
      if (typeof callback === 'function') {
        val = callback.call(this, nVal, oVal, $el, index, selector) || val;
      }
      return val;
    });
    return this;
  }
  /**
   * 向x轴指定距离
   * @param {Number} x
   * @param {Function} callback
   */
  shiftX(x, callback) {
    this.shift(x, 0, (nVal, oVal, $el, index, selector) => {
      let val = {
        x: nVal.x + oVal.x,
        y: oVal.y
      };
      if (typeof callback === 'function') {
        const x = callback.call(this, nVal.x, oVal.x, $el, index, selector);
        if (typeof x === 'number') {
          val.x = x;
        }
      }
      return val;
    });
    return this;
  }
  /**
   * 向y轴移动指定距离
   * @param {Number} y
   * @param {Function} callback
   */
  shiftY(y, callback) {
    this.shift(0, y, (nVal, oVal, $el, index, selector) => {
      let val = {
        x: oVal.x,
        y: nVal.y + oVal.y
      };
      if (typeof callback === 'function') {
        const y = callback.call(this, nVal.y, oVal.y, $el, index, selector);
        if (typeof y === 'number') {
          val.y = y;
        }
      }
      return val;
    });
    return this;
  }
  /**
   * 旋转指定角度
   * @param {Number} angle
   * @param {Function} callback
   */
  rotate(angle, callback) {
    this.attr('transform', ($el, index, selector) => {
      let transform = $el.getAttribute('transform');
      transform = transform ? transform.split(' ') : [];

      let nVal = angle;
      let oVal = 0;
      transform = transform.filter((item, index) => {
        if (item.indexOf('rotate') === -1) {
          return true;
        } else {
          const rotate = item.match(/\d+/)[0];
          oVal += parseFloat(rotate);
        }
      });
      if (typeof callback === 'function') {
        nVal = callback(nVal, oVal);
      }
      // 选择元素并获取元素BBox
      const bbox = new Selector($el).getBBox();
      const cx = bbox.x + bbox.width / 2;
      const cy = bbox.y + bbox.height / 2;
      transform.push(`rotate(${nVal},${cx},${cy})`);
      return transform.join(' ');
    });
    return this;
  }
  scale(x, y) {

  }
  scaleX(x) {

  }
  scaleY(y) {

  }
  // http://stackoverflow.com/questions/13046811/how-to-determine-size-of-raphael-object-after-scaling-rotating-it/13111598#13111598
  getBBox() {
    const $el = this[0];
    if (!$el) {
      return null;
    }

    let bbox = $el.getBBox();
    let $svg = $el.ownerSVGElement;

    // 相对于全局的坐标点
    const oldPoint = [
      { x: bbox.x, y: bbox.y },
      { x: bbox.x + bbox.width, y: bbox.y },
      { x: bbox.x + bbox.width, y: bbox.y + bbox.height },
      { x: bbox.x, y: bbox.y + bbox.height }
    ];
    // 正无穷
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    // 负无穷
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    // 得到相对画布的坐标
    const matrix = $el.getScreenCTM()
      .inverse()
      .multiply($svg.getScreenCTM())
      .inverse();
    for (let i = 0, length = oldPoint.length; i < length; i++) {
      let point = $svg.createSVGPoint();
      point.x = oldPoint[i].x;
      point.y = oldPoint[i].y;
      // 进行矩阵变化
      point = point.matrixTransform(matrix);
      if (point.x < minX) {
        minX = point.x;
      }
      if (point.y < minY) {
        minY = point.y;
      }
      if (point.x > maxX) {
        maxX = point.x;
      }
      if (point.y > maxY) {
        maxY = point.y;
      }
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
  get x() {
    const bbox = this.getBBox();
    if (!bbox) {
      return null;
    }
    return bbox.x;
  }
  get y() {
    const bbox = this.getBBox();
    if (!bbox) {
      return null;
    }
    return bbox.y;
  }
  get width() {
    const bbox = this.getBBox();
    if (!bbox) {
      return null;
    }
    return bbox.width;
  }
  get height() {
    const bbox = this.getBBox();
    if (!bbox) {
      return null;
    }
    return bbox.height;
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
