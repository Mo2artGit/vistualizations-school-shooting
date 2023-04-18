import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import loveActually from './love-actually.json';

const Graph3 = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const width = 1200;
    const height = 800;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const circle = svg.selectAll('circle')
      .data(loveActually.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .style('fill', 'green')
      .style('opacity', 0.5);

    const line = svg.selectAll('line')
      .data(loveActually.links)
      .join('line')
      .style('stroke', 'gray')
      .style('opacity', 0.5)
      .attr('stroke-width', '1px');

    const simulation = d3.forceSimulation(loveActually.nodes)
      .force('charge', d3.forceManyBody().strength(-25))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('link', d3.forceLink(loveActually.links).id(d => d.id))
      .force('collision', d3.forceCollide().radius(15))
      .on('tick', ticked);

    function ticked() {
      circle.attr('cx', d => d.x)
        .attr('cy', d => d.y);

      line.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
    }
  }, []);

  return (
    <svg id="graph" ref={svgRef}></svg>
  );
}

export default Graph3;
