const namespaces = {
  svg: 'http://www.w3.org/2000/svg',
  xhtml: 'http://www.w3.org/1999/xhtml',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/'
}

export default class Selector {
  static namespaces = namespaces
  static SELECTOR = 0
  constructor (selector) {
    this.length = 0

    let $el = []
    if (selector instanceof Selector) {
      $el = selector
    } else if (selector instanceof Array) {
      $el = selector
    } else if (selector instanceof Element) {
      $el = [selector]
    } else if (selector instanceof NodeList) {
      $el = selector
    } else {
      $el = document.querySelectorAll(selector)
    }
    for (let i = 0, length = $el.length; i < length; i++) {
      if ($el[i].__SELECTOR__ === undefined) {
        // 给每一个元素编号
        $el[i].__SELECTOR__ = Selector.SELECTOR++
      }
      this[i] = $el[i]
      this.length++
    }
    return this
  }
  /**
   * 遍历对象的元素
   * @param {Function} callback
   * @param {*} context
   */
  each (callback, context) {
    for (let i = 0, length = this.length; i < length; i++) {
      callback.call(context || this[i], this[i], i, this)
    }
    return this
  }
  /**
   * 返回一个新的从原Selector对象Selector对象
   * @param {Function} callback
   * @param {*} context
   */
  map (callback, context) {
    const $selector = []
    for (let i = 0, length = this.length; i < length; i++) {
      const $el = callback.call(context || this[i], this[i], i, this)
      if ($el) {
        $selector.push($el)
      }
    }
    return new Selector($selector)
  }
  /**
   * 选择元素
   * @param {String} selector
   */
  select (selector) {
    const $selector = []
    this.each($el => {
      Array.prototype.push.apply($selector, $el.querySelectorAll(selector))
    })
    return new Selector($selector)
  }
  /**
   * 插入元素
   * @param {String} el
   */
  append (el) {
    // 标签前缀命名空间字符串
    let namespace = el
    // 命名空间与标签的分隔符':'的位置
    const i = el.indexOf(':')
    if (i >= 0) {
      namespace = el.slice(0, i)
      if (namespace !== 'xmlns') {
        el = el.slice(i + 1)
      }
    }
    // 获取命名空间
    const $selector = this.map($el => {
      let node
      // 判断创建元素是否有命名空间
      if (Selector.namespaces[namespace]) {
        node = document.createElementNS(Selector.namespaces[namespace], el)
      } else if ($el.namespaceURI !== Selector.namespaces['xhtml']) {
        node = document.createElementNS($el.namespaceURI, el)
      } else if (document.documentElement.namespaceURI !== Selector.namespaces['xhtml']) {
        node = document.createElementNS(document.documentElement.namespaceURI, el)
      } else {
        node = document.createElement(el)
      }
      $el.appendChild(node)
      return node
    })
    return new Selector($selector)
  }
  /**
   * 设置属性
   * @param {String} name
   * @param {String|Function} val
   */
  attr (name, val) {
    let namespace = name
    // 命名空间与标签的分隔符':'的位置
    const i = name.indexOf(':')
    if (i >= 0) {
      namespace = name.slice(0, i)
      if (namespace !== 'xmlns') {
        name = name.slice(i + 1)
      }
    }
    this.each(($el, index, selector) => {
      let value = val
      if (typeof val === 'function') {
        value = val.call(this, $el, index, selector)
      }
      // 判断是否有命名空间
      if (Selector.namespaces[namespace]) {
        if (value) {
          $el.setAttributeNS(Selector.namespaces[namespace], name, value)
        } else {
          $el.removeAttributeNS(Selector.namespaces[namespace], name)
        }
      } else {
        if (value) {
          $el.setAttribute(name, value)
        } else {
          $el.removeAttribute(name)
        }
      }
    })
    return this
  }
  /**
   * 向节点插入文字
   * @param {String} text
   */
  text (text) {
    this.each($el => {
      const textNode = document.createTextNode(text)
      $el.appendChild(textNode)
    })
    return this
  }
  /**
   * 移动到指定位置
   * @param {Number} x
   * @param {Number} y
   * @param {Function} callback
   */
  translate (x, y, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse()
      let $x = x
      let $y = y
      if (typeof callback === 'function') {
        const translate = callback.call($el, $el, index, selector) || {}
        $x = translate.x || x
        $y = translate.y || y
      }

      matrix.e = $x * matrix.a + $y * matrix.c
      matrix.f = $x * matrix.b + $y * matrix.d
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  /**
   * 移动x到指定位置
   * @param {Number} x
   * @param {Function} callback
   */
  translateX (x, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse()
      let $x = x
      if (typeof callback === 'function') {
        $x = callback.call($el, $el, index, selector) || $x
      }

      matrix.e = $x * matrix.a
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  /**
   * 移动y到指定位置
   * @param {Number} y
   * @param {Function} callback
   */
  translateY (y, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse()
      let $y = y
      if (typeof callback === 'function') {
        $y = callback.call($el, $el, index, selector) || $y
      }

      matrix.f = $y * matrix.d
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  /**
   * 移动指定距离
   * @param {Number} x
   * @param {Number} y
   * @param {Function} callback
   */
  shift (x, y, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $x = x
      let $y = y
      if (typeof callback === 'function') {
        const shift = callback.call($el, $el, index, selector) || {}
        $x = shift.x || x
        $y = shift.y || y
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().translate($x, $y)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  /**
   * 向x轴指定距离
   * @param {Number} x
   * @param {Function} callback
   */
  shiftX (x, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $x = x
      if (typeof callback === 'function') {
        $x = callback.call($el, $el, index, selector) || $x
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().translate($x, 0)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  /**
   * 向y轴移动指定距离
   * @param {Number} y
   * @param {Function} callback
   */
  shiftY (y, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $y = y
      if (typeof callback === 'function') {
        $y = callback.call($el, $el, index, selector) || $y
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().translate(0, $y)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  /**
   * 旋转指定角度
   * @param {Number} angle
   * @param {Function} callback
   */
  rotate (angle, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $angle = angle
      if (typeof callback === 'function') {
        $angle = callback.call($el, $el, index, selector) || $angle
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().rotate($angle)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  scale (x, y, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $x = x
      let $y = y
      if (typeof callback === 'function') {
        const scale = callback.call($el, $el, index, selector) || {}
        $x = scale.x || x
        $y = scale.y || y
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().scaleNonUniform($x, $y)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  scaleX (x, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $x = x
      if (typeof callback === 'function') {
        $x = callback.call($el, $el, index, selector) || $x
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().scaleNonUniform($x, 1)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  scaleY (y, callback) {
    this.attr('transform', ($el, index, selector) => {
      const $svg = $el.ownerSVGElement
      let $y = y
      if (typeof callback === 'function') {
        $y = callback.call($el, $el, index, selector) || $y
      }
      const matrix = $el.getScreenCTM()
        .inverse()
        .multiply($svg.getScreenCTM())
        .inverse().scaleNonUniform(1, $y)
      return `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${matrix.e},${matrix.f})`
    })
    return this
  }
  // http://stackoverflow.com/questions/13046811/how-to-determine-size-of-raphael-object-after-scaling-rotating-it/13111598#13111598
  getBBox () {
    const $el = this[0]
    if (!$el) {
      return null
    }

    let bbox = $el.getBBox()
    let $svg = $el.ownerSVGElement

    // 相对于全局的坐标点
    const oldPoint = [
      { x: bbox.x, y: bbox.y },
      { x: bbox.x + bbox.width, y: bbox.y },
      { x: bbox.x + bbox.width, y: bbox.y + bbox.height },
      { x: bbox.x, y: bbox.y + bbox.height }
    ]
    // 正无穷
    let minX = Number.POSITIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY
    // 负无穷
    let maxX = Number.NEGATIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY

    // 得到相对画布的坐标
    const matrix = $el.getScreenCTM()
      .inverse()
      .multiply($svg.getScreenCTM())
      .inverse()
    for (let i = 0, length = oldPoint.length; i < length; i++) {
      let point = $svg.createSVGPoint()
      point.x = oldPoint[i].x
      point.y = oldPoint[i].y
      // 进行矩阵变化
      point = point.matrixTransform(matrix)
      if (point.x < minX) {
        minX = point.x
      }
      if (point.y < minY) {
        minY = point.y
      }
      if (point.x > maxX) {
        maxX = point.x
      }
      if (point.y > maxY) {
        maxY = point.y
      }
    }

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  }
  on (event, listener, useCapture = false) {
    this.each($el => {
      $el.addEventListenr(event, listener, useCapture)
    })
    return this
  }
  off (event, listener, useCapture = false) {
    this.each($el => {
      $el.removeEventListenr(event, listener, useCapture)
    })
    return this
  }
  get x () {
    const bbox = this.getBBox()
    if (!bbox) {
      return null
    }
    return bbox.x
  }
  get y () {
    const bbox = this.getBBox()
    if (!bbox) {
      return null
    }
    return bbox.y
  }
  get width () {
    const bbox = this.getBBox()
    if (!bbox) {
      return null
    }
    return bbox.width
  }
  get height () {
    const bbox = this.getBBox()
    if (!bbox) {
      return null
    }
    return bbox.height
  }
}
