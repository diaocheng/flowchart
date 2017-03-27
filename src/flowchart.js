import * as d3 from 'd3';
import clone from 'lodash/cloneDeep';

export default class Flowchart {
  static version = process.env.VERSION;
  constructor(el, data, options) {
    this.paper = d3.select(el)
      .append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight);
    this.data = this.format(data);
    // this.render(d3.hierarchy(this.data));
    return this;
  }
  format(data) {
    function next(node) {
      // 下一个节点
      if (!Array.isArray(node.children)) {
        node.children = [];
      }
      node.next.forEach((id) => {
        for (let i = 0, length = data.length; i < length; i++) {
          if (data[i].id === id) {
            node.children.push(next(data[i]));
            break;
          }
        }
      });
      const temp = clone(node);
      return {
        id: temp.id,
        children: temp.children,
        text: temp.text,
        type: temp.type,
        data: temp.data
      };
    }
    // 返回第一个节点
    for (let i = 0, length = data.length; i < length; i++) {
      if (data[i].prev.length === 0) {
        return next(data[i]);
      }
    }
  }
  render(data) {
    const d = d3.tree(data).size(500, 400)
      .nodeSize(50, 50)
      .separation((a, b) => {
        return (a.parent === b.parent ? 1 : 2) / a.depth;
      });
    console.log(d);
  }
}
