SVGElement.prototype.getTransformToElement = SVGElement.prototype.getTransformToElement || function ($el) {
  return $el.getScreenCTM().inverse().multiply(this.getScreenCTM());
};
