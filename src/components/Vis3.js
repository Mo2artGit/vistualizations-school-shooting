import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import dataset from '../datas/graph3/pah_wikp_combo.csv';

const Vis3 = () => {
    const svgRef = useRef(null);

    useEffect(() => {
        const width = 1200;
        const height = 800;

      // eslint-disable-next-line
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

    }, []);

    return (
        <>
            <h1>Heat map of Year vs Month</h1>
            <svg id="graph" ref={svgRef}></svg>
        </>
    );
}

export default Vis3;