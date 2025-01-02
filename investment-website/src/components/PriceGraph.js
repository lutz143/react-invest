import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import * as d3 from "d3";

import "./PriceGraph.css";

// set dimensions and margins for the chart
const margin = { top: 20, right: 20, bottom: 30, left: 50 };
const width = 1100 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const PriceGraph = () => {
    const [data, setJsonData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const { id } = useParams();
    const circleRef = useRef(null);

    // API call to pull stock price data by date by ticker ID
    //   useEffect(() => {
    //     axios.get(`http://localhost:3001/api/priceData/${id}`)
    //       .then((response) => {
    //         const formattedData = response.data.map((data) => ({
    //           ...data,
    //         }))

    //         setJsonData(formattedData);
    //         setDataLoaded(true);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching data:', error);
    //       });
    //   }, [id]);

    useEffect(() => {
        // Parse date strings into Date objects
        const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
        data.forEach(d => {
            d.date = parseDate(d.price_date);
            d.close = +d.close;
        });
    }, [data])


    useEffect(() => {
        if (!dataLoaded) return;

        // set up the x and y scales to fit within pixel screen on browser
        const x = d3.scaleTime().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);

        // create the SVG element and append it to the chart container
        const svg = d3.select("#chart-container")
            .html('')
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Clear existing content in SVG
        svg.selectAll('*').remove();

        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip");

        // define the x and y domains. what data is going to fit in the range we declared earlier
        x.domain(d3.extent(data, d => d.date)); // give all the dates in the data
        y.domain([0, d3.max(data, d => d.close)]); // look at all the values and give the max one

        // append the x axis as a group to the svg we created
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .style("font-size", "10px")
            .call(d3.axisBottom(x)
                .tickValues(x.ticks(d3.timeMonth.every(6)))
                .tickFormat(d3.timeFormat("%b %Y")))
            .call(g => g.select(".domain").remove())
            .selectAll(".tick line")
            .style("stroke-opacity", 0)
        svg.selectAll(".tick text")
            .attr("fill", "#777")
            .attr('transform', 'rotate(-45)'); // rotate x-axis labels at a 45-degree angle

        // append the y axis as a new group
        svg.append("g")
            .style("font-size", "10px")
            .call(d3.axisLeft(y)
                .tickFormat(d => {
                    return `$${d}`
                })
                .tickSize(0)
                .tickPadding(10))
            .call(g => g.select(".domain").remove())
            .selectAll(".tick text")
            .style("fill", "#777")
            .style("visibility", (d, i, nodes) => {
                if (i === 0) {
                    return "hidden";
                } else {
                    return "visible";
                }
            });

        // add vertical gridlines
        svg.selectAll("xGrid")
            .data(x.ticks().slice(.5))
            .join("line")
            .attr("x1", d => x(d))
            .attr("x2", d => x(d))
            .attr("y1", 0)
            .attr("y2", height)
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", .5);

        // add horizontal gridlines
        svg.selectAll("yGrid")
            .data(y.ticks().slice(.5))
            .join("line")
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", d => y(d))
            .attr("y2", d => y(d))
            .attr("stroke", "#e0e0e0")
            .attr("stroke-width", .5);

        // add the chart title
        svg.append("text")
            .attr("class", "chart-title")
            .attr("x", margin.left - 115)
            .attr("y", margin.top - 100)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("font-family", "sans-serif")
        // .text(`Stock Price`)

        // add y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .style("fill", "#777")
            .style("font-family", "sans-serif")
            .text("Price")

        // create the line generator
        const line = d3.line()
            .x(d => x(d.date))
            .y(d => y(d.close));

        // add the line path to the svg element
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1)
            .attr("d", line); // d attribute calling the line generate created above

        const listeningRect = svg
            .append("rect")
            .attr("width", width)
            .attr("height", height);

        circleRef.current = svg.append("circle").attr("r", 0).attr("fill", "steelblue").style("storke", "white").attr("opacity", 0.7).style("pointer-events", "none");


        // create a listeningRect event that finds the closest value to where your mouse coordinate is
        listeningRect.on("mousemove", function (event) {
            if (data.length === 0) return;

            const [xCoord] = d3.pointer(event, this);
            const bisectDate = d3.bisector((d) => d.date).left;
            data.sort((a, b) => a.date - b.date);
            const x0 = x.invert(xCoord);
            const i = bisectDate(data, x0, 1);

            if (i === 0 || i === data.length) return;

            const d0 = data[i - 1];
            const d1 = data[i];
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
            const xPos = x(d.date);
            const yPos = y(d.close);

            tooltip
                .style("display", "block")
                .style("left", `${xPos + 100}px`)
                .style("top", `${yPos + 50}px`)
                .html(`<strong>Date: </strong>${d.date.toLocaleDateString()}<br><strong>Close: $</strong>${d.close !== undefined ? (d.close).toFixed(2) : 'N/A'}`)

            // update the circle position based on mouse coordinate
            circleRef.current.attr("cx", xPos).attr("cy", yPos);

            circleRef.current.transition().duration(50).attr("r", 5);
        });

        listeningRect.on("mouseleave", function () {
            circleRef.current.transition()
                .duration(50)
                .attr("r", 0);
            tooltip.style("display", "none");
        });

    }, data);


    if (!data) {
        return <p>Loading...</p>;
    }

    return (
        <div id="chart-container"></div>
    );
};

export default PriceGraph;