import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import shootingCauses from  '../datas/graph1/shooting-causes.csv';

const Vis1 = () => {

  const svgRef = useRef();

  // d3.csv(shootingCauses).then(data=>{
  //   console.log(data);
  // });

  useEffect(() => {

    // const width = 1000;
    // const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    // const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 1500 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr("transform", "translate(100, 0)");

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

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

        d.schoolYear = `${d.Year.getFullYear() + 1}-${d.Year.getFullYear() + 2}`;
        // console.log(d);
      });

      // Define scales
      const xScale = d3.scaleTime()
        .domain(d3.extent(data, d => d.Year))
        .range([50, width-300]);
        
      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value15)])
        .range([height-30, 25]);

      const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
      const yAxis = d3.axisLeft(yScale);

      g.append("g")
        .attr("transform", `translate(-50,${height-50})`)
        .call(xAxis)
        .append("text")
        .attr("fill", "#000")
        .attr("x", 740)
        .attr("y", 30)
        .attr("text-anchor", "center")
        .text("Year");

      g.append("g")
        .attr("transform", `translate(0,-20)`)
        .call(yAxis)
        .append("text")
        .attr("fill", "#000")
        // .attr("transform", `rotate(-90)`)
        .attr("transform", `translate(0,25), rotate(-90)`)
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Count");
        
      // Define line generator for each value column
      const lineGenerators = [];
      for (let i = 1; i <= 15; i++) {
        lineGenerators[i] = d3.line()
          .x(d => xScale(d.Year))
          .y(d => yScale(d[`value${i}`]));
      }

      // Draw lines for each value column
      const colors = ['filler', 'red', 'orange', 'gold', 'green', 'blue', 'purple', 'aqua', 'darkcyan', 'fuchsia', 'darkolivegreen', 'darkblue', 'tomato', 'deeppink', 'mediumslateblue', '#000000'];
      for (let i = 1; i <= 15; i++) {
        svg.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', colors[i]) // Choose a different color for each line
          .attr('stroke-width', 2)
          .attr('d', lineGenerators[i])
          .attr('opacity', 0.2)
          .on("mouseover", function () {
            d3.select(this)
              .transition()
              .duration(100)
              .attr("stroke-width", 4) // increase stroke width to 4 pixels on mouseover
              .attr('opacity', 1);
            d3.select('#type')
              .text(categories[i-1]);
          })
          .on("mouseout", function () {
            d3.select(this)
              .transition()
              .duration(100)
              .attr("stroke-width", 2) // reset stroke width to 2 pixels on mouseout
              .attr('opacity', 0.2);
          });
      }

      // svg.selectAll("circle")
      //   .data(data)
      //   .enter()
      //   .append("circle")
      //   .style("fill", "red")
      //   .attr("r", 4)
      //   .attr("cx", d => xScale(d.Year))
      //   .attr("cy", d => yScale(d['value1']));

      // const schoolYears = ['2000-01', '2001-02', '2002-03', '2003-04', '2004-05', '2005-06', '2006-07', '2007-08', '2008-09', '2009-10', '2010-11', '2011-12', '2012-13', '2013-14', '2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2019-20', '2020-21']
      const circles = svg.selectAll("circle").data(data).enter()
      for (let i = 1; i <= 15; i++) {
        circles
          .append("circle")
          .style("fill", colors[i])
          .attr("r", 4)
          .attr("cx", d => xScale(d.Year))
          .attr("cy", d => yScale(d[`value${i}`]))
          .on('mouseover', function (event, d) {
            d3.select(this)
              .transition()
              .duration(100)
              .attr("r", 8);
            d3.select('#type')
              .text(categories[i-1]);
            d3.select('#year')
              .text(d.schoolYear);
            d3.select('#count')
              .text(d[`value${i}`])
          })
          .on("mouseout", function () {
            d3.select(this)
              .transition()
              .duration(100)
              .attr("r", 4);
          });
      }

      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(1200, 50)");

      const categories = ["Escalation of Dispute", "Accidental", "Suicide or Attempted Suicide", "Domestic with Targeted Victim", "Indiscriminate Shooting", "Anger Over Grades or Discipline", "Murder Suicide", "Bullying", "Psychosis", "Hostage Standoff", "Property Damage", "Self-Defense", "Drive-By", "Illegal Activity", "Unknown"];
        
      const colorScale = d3.scaleOrdinal()
        .domain(categories)
        .range(['red', 'orange', 'gold', 'green', 'blue', 'purple', 'aqua', 'darkcyan', 'fuchsia', 'darkolivegreen', 'darkblue', 'tomato', 'deeppink', 'mediumslateblue', '#000000']);

      legend.selectAll("rect")
        .data(categories)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", (d, i) => i * 20)
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", d => colorScale(d));

      legend.selectAll("text")
        .data(categories)
        .enter()
        .append("text")
        .attr("x", 20)
        .attr("y", (d, i) => i * 20 + 6)
        .text(d => d);
  
      // Style the legend
      svg.selectAll(".legend rect")
        .attr("stroke", "#000")
        .attr("stroke-width", "1px");
  
      svg.selectAll(".legend text")
        .attr("font-size", "12px")
        .attr("font-family", "sans-serif")
        .attr("fill", "#666")
        .attr("text-anchor", "start")
        .attr("alignment-baseline", "middle");
    });
  }, []);

  return (
    <>
      <h2 className="ml-3 mb-5 text-4xl font-extrabold">School Shootings By Type Over Time</h2>
      <div className="ml-3 flex flex-wrap justify-start items-center">
        <p className="mr-4"><strong>Type:</strong> <span id="type"></span></p>
        <p className="mr-4"><strong>School Year:</strong> <span id="year"></span></p>
        <p className="mr-4"><strong>Count:</strong> <span id="count"></span></p>
      </div>
      <svg id="graph" ref={svgRef}></svg>
      <p className="mx-10 text-lg text-gray-500 dark:text-gray-600">This line graph shows the situations and aftermaths associated with each school shooting. Some categories are direct reasons for shootings while others are results from them. Most notably, there is general upwards trends for unknown causes while "Escalation of Dispute" has always been one of the top characterstics for shootings. What's also interesting is that "Bullying" and "Self-Defense" have always trended low around 1 or 2 instances while "Domestic with Targeted Victim" and "Drive-By" have seen recent increases. Overall though, what this graph really shows is that shootings are becoming more and more frequent yet the reasons and results surrounding them are becoming more and more unknown.</p>
    </>
  );
}

export default Vis1;