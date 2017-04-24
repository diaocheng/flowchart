class Matrix {
  constructor(a, b, c, d, e, f) {
    if (a instanceof Matrix) {
      this.a = a.a
      this.b = a.b
      this.c = a.c
      this.d = a.d
      this.e = a.e
      this.f = a.f
    } else if (a != null) {
      this.a = +a
      this.b = +b
      this.c = +c
      this.d = +d
      this.e = +e
      this.f = +f
    } else {
      this.a = 1
      this.b = 0
      this.c = 0
      this.d = 1
      this.e = 0
      this.f = 0
    }
    return this
  }

  plus(a, b, c, d, e, f) {
    if (a instanceof Matrix) {
      return this.plus(a.a, a.b, a.c, a.d, a.e, a.f)
    }
    const $a = a * this.a + b * this.c
    const $b = a * this.b + b * this.d
    const $c = c * this.a + d * this.c
    const $d = c * this.b + d * this.d
    const $e = e * this.a + f * this.c + this.e
    const $f = e * this.b + f * this.d + this.f

    this.a = $a
    this.b = $b
    this.c = $c
    this.d = $d
    this.e = $e
    this.f = $f
    return this
  }

  multiply(a, b, c, d, e, f) {
    if (a instanceof Matrix) {
      return this.multiply(a.a, a.b, a.c, a.d, a.e, a.f)
    }
    const $a = a * this.a + c * this.b
    const $b = b * this.a + d * this.b
    const $c = a * this.c + c * this.d
    const $d = b * this.c + d * this.d
    const $e = a * this.e + c * this.f + e
    const $f = b * this.e + d * this.f + f

    this.a = $a
    this.b = $b
    this.c = $c
    this.d = $d
    this.e = $e
    this.f = $f
    return this
  }
  translate(x, y) {
    this.e += x * this.a + y * this.c
    this.f += x * this.b + y * this.d
    return this
  }
  scale(x, y, cx, cy) {
    y == null && (y = x)
      (cx || cy) && this.translate(cx, cy)
    this.a *= x
    this.b *= x
    this.c *= y
    this.d *= y
      (cx || cy) && this.translate(-cx, -cy)
    return this
  }
  rotate(a, x, y) {
    a = a / 180 * Math.PI
    x = x || 0
    y = y || 0
    var cos = +Math.cos(a).toFixed(9),
      sin = +Math.sin(a).toFixed(9)
    this.plus(cos, sin, -sin, cos, x, y)
    return this.plus(1, 0, 0, 1, -x, -y)
  }
  skewX(x) {
    return this.skew(x, 0)
  }
  skewY(y) {
    return this.skew(0, y)
  }
  skew(x, y) {
    x = x || 0
    y = y || 0
    x = x / 180 * Math.PI
    y = y / 180 * Math.PI
    var c = Math.tan(x).toFixed(9)
    var b = Math.tan(y).toFixed(9)
    return this.plus(1, b, c, 1, 0, 0)
  }
  toString () {
      return `matrix(${this.a},${this.b},${this.c},${this.d},${this.e},${this.f})`
  }
}
