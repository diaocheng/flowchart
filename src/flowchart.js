import $ from './selector';
import { format } from './utils';

export default class Flowchart {
  static version = process.env.VERSION;
  constructor(selector) {
    this.$el = null;
    this.$nodes = [];
    this.$node = null;
    this.$shapes = [];

    this.init(selector);
    return this;
  }
  init(selector) {
    const $selector = $(selector);
    this.$el = $selector.append('svg');
    this.size($selector[0].clientWidth, $selector[0].clientHeight);
    // 定时器
    let timer = null;
    window.addEventListener('resize', e => {
      timer && clearTimeout(timer);
      // 防止一直执行，造成运算量增加
      timer = setTimeout(() => {
        this.size($selector[0].clientWidth, $selector[0].clientHeight);
      }, 300);
    });
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
    // this.$shapes = this.$nodes.map((node, index) => {
    //   const $shape = this.$el.append('g')
    //     .attr('stroke-width', 5);
    //   const $a = $shape.append('a')
    //     .attr('href', function ($el, index) {
    //       return `#${index}`;
    //     })
    //     .attr('name', function ($el, index) {
    //       return index;
    //     })
    //     .attr('width', 60)
    //     .attr('height', 60);
    //   $a.append('rect')
    //     .attr('width', 80)
    //     .attr('height', 80)
    //     .attr('fill', 'pink');
    //   $a.append('text')
    //     .attr('text-anchor', 'start')
    //     .attr('x', 0)
    //     .attr('y', 0)
    //     .attr('font-size', 14)
    //     .attr('font-family', '微软雅黑')
    //     .attr('fill', '#000')
    //     .text(node.text);
    //   $shape.translate(80 * index, 80 * index);
    //   return $shape;
    // });

    this.$shapes = this.$nodes.map((item, index) => {
      return this.$el.append('g');
    });
    const $shapes = this.$el.select('g').attr('transform', function ($el, index, selector) {
      return `translate(${80 * index},${80 * index}) scale(1.8,1.8)`;
    });
    const $a = $shapes.append('a')
      .attr('href', function ($el, index) {
        return `#${index}`;
      })
      .attr('width', 60)
      .attr('height', 60);
    $a.append('rect')
      .attr('width', 80)
      .attr('height', 80)
      .attr('fill', 'pink');
    $a.append('text')
      .attr('text-anchor', 'start')
      .attr('font-size', 14)
      .attr('font-family', '微软雅黑')
      .attr('fill', '#000')
      .text('sdsdsds')
      .attr('x', 0)
      .attr('y', function ($el, index) {
        return $el.getBBox().height;
      });
    console.log($shapes.x());
    console.log($shapes.getBBox());
    return this;
  }
}
