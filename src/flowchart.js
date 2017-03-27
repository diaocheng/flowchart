import * as d3 from 'd3';

export default class Flowchart {
  static version = process.env.VERSION;
  constructor(el, data, options) {
    this.paper = d3.select(el)
      .append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight);
    this.data = this.format(data);
    this.render(d3.hierarchy(this.data));
    return this;
  }
  format(data) {
    data.forEach((node) => {
      // 上一个节点
      if (!Array.isArray(node.parent)) {
        node.parent = [];
      }
      node.prev.forEach((id) => {
        for (let i = 0, length = data.length; i < length; i++) {
          if (data[i].id === id) {
            node.parent.push(data[i]);
            break;
          }
        }
      });

      // 下一个节点
      if (!Array.isArray(node.children)) {
        node.children = [];
      }
      node.next.forEach((id) => {
        for (let i = 0, length = data.length; i < length; i++) {
          if (data[i].id === id) {
            node.children.push(data[i]);
            break;
          }
        }
      });
    });
    // 返回第一个节点
    for (let i = 0, length = data.length; i < length; i++) {
      if (data[i].prev.length === 0) {
        return data[i];
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
