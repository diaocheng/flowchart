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
    return this;
  }
  data(data) {
    this.$data = format(data);
    return this;
  }
  render(data) {

  }
}
