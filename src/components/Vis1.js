import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import shootingCauses from  '../datas/graph1/shooting-causes.csv';

const Vis1 = () => {

  const svgRef = useRef();

  // d3.csv(shootingCauses).then(data=>{
  //   console.log(data);
  // });

  useEffect(() => {

    const width = 1000;
    const height = 400;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr("transform", "translate(100, 0)");

  
    // Load data from CSV file
    
    d3.csv(shootingCauses).then(data => {

      // console.log(data);

      // Convert strings to numbers
      data.forEach(d => {
        d.Year = new Date(d.Year); // Convert year string to Date object
        
        // for (let i = 2; i <= 15; i++) {
        //   d[`value${i}`] = +d[`Unknown\\${i}\\`]; 
        // }

        // Convert each value column from string to number
        d[`value${1}`] = +d[`Escalation of dispute\\${1}\\`];
        d[`value${2}`] = +d[`Acci- dental\\${2}\\`];
        d[`value${3}`] = +d[`Suicide or attempted suicide\\${3}\\`];
        d[`value${4}`] = +d[`Domestic with targeted victim\\${4}\\`];
        d[`value${5}`] = +d[`Indiscrim- inate shooting\\${5}\\`];
        d[`value${6}`] = +d[`Anger over grades/ suspension/ discipline\\${6}\\`];
        d[`value${7}`] = +d[`Murder/ suicide\\${7}\\`];
        d[`value${8}`] = +d[`Bullying\\${8}\\`];
        d[`value${9}`] = +d[`Psychosis\\${9}\\`];
        d[`value${10}`] = +d[`Hostage standoff\\${10}\\`];
        d[`value${11}`] = +d[`Intentional property damage\\${11}\\`];
        d[`value${12}`] = +d[`Self-defense\\${12}\\`];
        d[`value${13}`] = +d[`Drive-by\\${13}\\`];
        d[`value${14}`] = +d[`Illegal activity\\${14}\\`];
        d[`value${15}`] = +d[`Unknown\\${15}\\`];

        // console.log(d);
      });
    
      // Define scales
      const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.Year))
        .range([0, width]);
        
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value15)])
        .range([height, 0]);
        
      // Define line generator for each value column
      const lineGenerators = [];
      for (let i = 1; i <= 15; i++) {
        lineGenerators[i] = d3.line()
          .x(d => xScale(d.Year))
          .y(d => yScale(d[`value${i}`]));
      }

      // Draw lines for each value column

      const colors = ['filler', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'aqua', 'darkcyan', 'fuschia', 'darkolivegreen', 'darkblue', 'tomato', 'deeppink', 'mediumslateblue', '#000000'];
      for (let i = 1; i <= 15; i++) {
        svg.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', colors[i]) // Choose a different color for each line
          .attr('stroke-width', 2)
          .attr('d', lineGenerators[i]);
      }
    });
  }, []);

  return (
    <>
      <h1>School Shooting by Type over Years</h1>
      <svg id="graph" ref={svgRef}></svg>
    </>
  );
}

export default Vis1;