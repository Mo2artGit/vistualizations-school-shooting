import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import shootingCauses from  '../datas/graph1/shooting-causes.csv';

const Vis1 = () => {

  const svgRef = useRef(null);

  d3.csv(shootingCauses).then(data=>{
    console.log(data);
  });

  useEffect(() => {

    const width = 1200;
    const height = 800;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);


  
    // var line = d3.line()
    //   .x(function(d) { return x(shootingCauses.Year); })
    //   .y(function(d) {return y(+shootingCauses.); })

  }, []);

  return (
    <>
      <h1>School Shooting by Type over Years</h1>
      <svg id="graph" ref={svgRef}></svg>
    </>
  );
}

export default Vis1;