import Selector from './selector';
import { format } from './utils';

export default class Flowchart extends Selector {
  static version = process.env.VERSION;
  constructor(selector) {
    super();
    const $selector = this.select(selector);
    const $el = $selector
      .append('svg')
      .attr('width', $selector.$el.offsetWidth)
      .attr('height', $selector.$el.offsetHeight);
    this.$el = $el;
    $el.append('rect')
      .attr('x', 300)
      .attr('y', 200)
      .attr('width', 40)
      .attr('height', 40)
      .attr('fill', 'pink');
    return this;
  }
  data(data) {
    this.$data = format(data);
    return this;
  }
  render(data) {

  }
}
