import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import dataset from '../datas/graph2/dataset.csv';

const Vis3 = () => {
    const svgRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        // Load the CSV data
        d3.csv(dataset).then(data => {
            // Parse the date string and get the day of the week
            const parseDate = d3.timeParse("%d-%b-%y");
            data.forEach(d => {
                d.date = parseDate(d.date);
                d.dayOfWeek = d3.timeFormat("%A")(d.date);
            });

            // Filter the data by the selected day of the week
            const filteredData = selectedDay ? data.filter(d => d.dayOfWeek === selectedDay) : data;

            // Count the number of incidents that occur during each hour of the day
            const incidentsByHour = d3.rollup(filteredData, v => v.length, d => {
                if (!d.time) return null;
                const hour = parseInt(d.time.slice(0, 2));
                const isPM = d.time.slice(-2) === "PM";
                return isPM && hour !== 12 ? hour + 12 : hour;
            });

            // Convert the data to an array of objects
            const incidentsData = Array.from(incidentsByHour, ([hour, count]) => ({ hour, count }));

            // Set up the chart dimensions
            const margin = { top: 50, right: 50, bottom: 50, left: 50 };
            const width = 1000 - margin.left - margin.right;
            const height = 800 - margin.top - margin.bottom;

            // Create the x and y scales
            const x = d3.scaleBand()
                .domain(d3.range(24))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, 20])
                .range([height, 0]);

            // Create the chart
            const svg = d3.select(svgRef.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).tickFormat(d => `${d}:00`));

            svg.append("g")
                .call(d3.axisLeft(y));

            svg.selectAll(".bar")
                .data(incidentsData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => x(parseInt(d.hour)))
                .attr("y", d => y(d.count))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.count))
                .attr("fill", "orange");
        });
    }, [selectedDay]);

    const DayOfWeekButtons = () => {
        const daysOfWeek = ["All", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return (
            <div className="flex justify-center mb-5">
                {daysOfWeek.map(day => (
                    <button
                        key={day}
                        className={`mx-2 px-4 py-2 rounded-full ${selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                        onClick={() => setSelectedDay(day === "All" ? null : day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <>
            <h2 className="ml-3 mb-5 text-4xl font-extrabold">Incidents during time of day</h2>
            <DayOfWeekButtons />
            <div className="flex justify-center">
                <svg
                    ref={svgRef}
                    width={1000}
                    height={800}
                />
            </div>
            <p className="mx-10 text-lg text-gray-500 dark:text-gray-600">
                The bar chart reveals that the majority of the incidents occur during the time when
                students are either going to school or returning home from school. Specifically, the chart indicates that there is a spike in incidents during the
                morning hours between 7 and 8 am, which is the time when most students are heading to school. Another peak is observed in the afternoon hours between
                2 and 4 pm, which is the time when most schools close and students are leaving the campus. This time period is also significant as there are more
                opportunities for students to gather in groups outside the school, which could be a potential target for attackers. It is also noteworthy that there
                are several incidents occurring around 9 pm, which is an unexpected finding. This could be due to a variety of reasons, such as after-school activities
                or events happening on campus during that time. Additionally, Friday is the day when most of these incidents are likely to happen.
            </p>
        </>
    );
}

export default Vis3;