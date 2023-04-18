import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import usData from './us-data.json';

const Graph2 = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Define the projection to use for the map
    const projection = d3.geoAlbersUsa();

    // Define the path generator
    const pathGenerator = d3.geoPath().projection(projection);

    // Convert TopoJSON to GeoJSON format
    const geojson = topojson.feature(usData, usData.objects.states);

    // Bind the features to SVG path elements
    svg
      .selectAll("path")
      .data(geojson.features)
      .join("path")
      .attr("d", pathGenerator);
  }, []);

  return (
    <svg
      ref={svgRef}
      width={1200}
      height={800}
    />
  );
};

export default Graph2;
