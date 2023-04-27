import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

import usData from '../datas/us-data.json';
import dataset from '../datas/graph2/dataset.csv';

const Vis2 = () => {
  const svgRef = useRef();
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define the projection to use for the map
    const projection = d3.geoAlbersUsa();

    // Define the path generator
    const pathGenerator = d3.geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON format
    const geojson = topojson.feature(usData, usData.objects.states);

    // Define a color scale for the different values of "type"
    const colorScale = d3.scaleOrdinal()
      .domain(["High School", "Middle School", "Elementary School", "K-12", "PreK-12", "Grades 7-8", "Grades 7-12", "K-8"])
      .range(["#ff7f0e", "#2ca02c", "#1f77b4", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f"]);

    // Bind the features to SVG path elements
    svg
      .selectAll("path")
      .data(geojson.features)
      .join("path")
      .attr("d", pathGenerator)

      // Remove all existing circles on the SVG element
      svg.selectAll("circle").remove();

    // Load the dataset and display data points on the map
    d3.csv(dataset, (d) => {

      // Skip this data point if the values are not valid
      if (!d.LATCOD || !d.LONCOD) {
        return;
      }

      // Skip this data point if it doesn't match the selected type
      if (selectedType && d.type !== selectedType) {
        return;
      }

      // Match the FIPS code with the corresponding state in geojson.features
      // eslint-disable-next-line
      const state = geojson.features.find((feature) => feature.id === d.CDCODE);

      // Calculate the x and y position of the data point using the latitude and longitude
      const [x, y] = projection([+d.LONCOD, +d.LATCOD]);

      // Append a circle to the SVG element for each data point, colored by "type"
      svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 5)
        .attr("fill", colorScale(d.type))
        .attr("opacity", 0.5)
        .on("mouseover", function () {
          // When the mouse is over the circle, change its opacity and show a tooltip
          d3.select(this)
            .attr("opacity", 1)
            .append("title")
            .text(`${d.school}, ${d.city}, ${d.state}\n${d.date}, ${d.time}\nKilled: ${d.killed}, Injured: ${d.injured}`);
        })
        .on("mouseout", function () {
          // When the mouse is out of the circle, change its opacity back and remove the tooltip
          d3.select(this)
            .attr("opacity", 0.5)
            .select("title")
            .remove();
        })
        .on("click", function () {
          // When the circle is clicked, trigger an animation
          d3.select(this)
            .transition()
            .duration(500)
            .attr("r", d.killed + d.injured)
            .transition()
            .duration(1000)
            .attr("r", 5);
          // When the circle is clicked, populate the tooltip container with the relevant information
          d3.select("#school")
            .text(d.school);
          d3.select("#city")
            .text(d.city);
          d3.select("#state")
            .text(d.state);
          d3.select("#date")
            .text(d.date);
          d3.select("#time")
            .text(d.time);
          d3.select("#killed")
            .text(d.killed);
          d3.select("#injured")
            .text(d.injured);

        });
    });

    // Create a legend for the color scale
    const legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(850, 300)");

    // Define the color and text for each category in the color scale
    const categories = ["High School", "Middle School", "Elementary School", "K-12", "PreK-12", "Grades 7-8", "Grades 7-12", "K-8"];

    // Append a rectangle and text element for each category in the legend
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


  }, [selectedType]);

  return (
    <>
      <h2 className="ml-3 text-4xl font-extrabold">All incidents through the U.S. <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">2009-2018</small></h2>
      <div className="ml-2 flex flex-wrap justify-start items-center">
        <p className="mr-4"><strong>School:</strong> <span id="school"></span></p>
        <p className="mr-4"><strong>City:</strong> <span id="city"></span></p>
        <p className="mr-4"><strong>State:</strong> <span id="state"></span></p>
        <p className="mr-4"><strong>Date:</strong> <span id="date"></span></p>
        <p className="mr-4"><strong>Time:</strong> <span id="time"></span></p>
        <p className="mr-4"><strong>Killed:</strong> <span id="killed"></span></p>
        <p><strong>Injured:</strong> <span id="injured"></span></p>
      </div>
      <div className="ml-2 flex flex-wrap justify-start items-center">
        <select onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">All types</option>
          <option value="High School">High School</option>
          <option value="Middle School">Middle School</option>
          <option value="Elementary School">Elementary School</option>
          <option value="K-12">K-12</option>
          <option value="PreK-12">PreK-12</option>
          <option value="Grades 7-8">Grades 7-8</option>
          <option value="Grades 7-12">Grades 7-12</option>
          <option value="K-8">K-8</option>
        </select>
      </div>
      <div className="flex justify-center">
        <svg
          ref={svgRef}
          width={1000}
          height={550}
        />
      </div>

      <p className="mx-10 text-lg text-gray-500 dark:text-gray-600">Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.</p>
    </>
  );
};

export default Vis2;
