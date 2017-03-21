import * as d3 from 'd3';

export default class Flowchart {
  constructor(el, options) {
    this.paper = d3.select(el)
      .append('svg');
    this.render();
  }
  render() {
    this.paper
      .selectAll('g')
      .data([1, 2, 3])
      .enter()
      .append('g')
      .append('rect')
      .attr('width', 200)
      .attr('height', 30)
      .attr('fill', 'steelblue')
      .attr('y', function (d, i) {
        return 0;
      })
      .append('text')
      .attr('fill', 'white')
      .attr('text-anchor', 'middle')
      .attr('transform', 'translate(30,20)')
      .attr('x', function (d, i) {
        return 0;
      })
      .attr('y', function (d) {
        return 0;
      })
      .attr('dx', function () {
        return 0;
      })
      .attr('dy', function (d) {
        return 0;
      })
      .text(function () {
        return 'sadas';
      });
  }
}
