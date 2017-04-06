import Selector from './selector';
import { format } from './utils';

export default class Flowchart extends Selector {
  static version = process.env.VERSION;
  constructor(selector) {
    super();
    this.$el = null;
    this.$nodes = [];
    this.$node = null;
    this.$shapes = [];

    const $selector = this.select(selector);
    const $el = $selector
      .append('svg');
    this.$el = $el;
    this.size($selector.width, $selector.height);
    return this;
  }
  size(width, height) {
    this.$el
      .attr('width', width)
      .attr('height', height);
  }
  data(data) {
    this.$nodes = format(data);
    for (let i = 0, length = this.$nodes.length; i < length; i++) {
      if (!this.$nodes[i].prev.length) {
        this.$node = this.$nodes[i];
        break;
      }
    }
    return this;
  }
  render(data) {
    this.$nodes.forEach((item, index) => {
      const $shape = this.$el.append('g');
      $shape.append('rect')
        .attr('width', 80)
        .attr('height', 80)
        .attr('fill', 'pink');
      $shape.append('text')
        .attr('text-anchor', 'start')
        .attr('x', 0)
        .attr('y', 0)
        .attr('font-size', 14)
        .attr('font-family', '微软雅黑')
        .attr('fill', '#000')
        .text(item.text);
      $shape.attr('transform', `translate(${80 * index},${80 * index})`);
      this.$shapes.push($shape);
    });
    return this;
  }
}
