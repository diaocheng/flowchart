import * as d3 from 'd3';

export default class Flowchart {
  static version = process.env.VERSION;
  constructor(el, data, options) {
    this.paper = d3.select(el)
      .append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight);
    this.data = data;
    this.render();
  }
  render() {
    const group = this.paper
      .selectAll('g')
      .data(this.data)
      .enter()
      .append('g');
    const shape = group
      .append('rect')
      .attr('width', 300)
      .attr('height', 30)
      .attr('fill', '#08f')
      .attr('y', function (d, i) {
        return i * 32;
      });
    const text = group
      .append('text')
      .data(this.data)
      .attr('font-size', '16px')
      .attr('text-anchor', 'start')
      .attr('x', 10)
      .attr('y', function (d, i) {
        return i * 32 + 20;
      })
      .attr('fill', '#fff')
      .text(function (d) {
        return d.text;
      });
    this.shape = {
      group,
      shape,
      text
    };
  }
}
