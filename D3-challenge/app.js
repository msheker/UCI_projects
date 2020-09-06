var margin = {  top: 20,
                right: 40,
                bottom: 60,
                left: 100   };

var svgW = 700;
var svgH = 400;
var w = svgW - margin.left - margin.right;
var h = svgH - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg")
    .attr("width", svgW).attr("height", svgH);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("data.csv").then(function( data ) {
    //console.log(data)
    i = 0
    data.forEach(function(d) {
            d.smokes = +d.smokes;
            d.obesity = +d.obesity;
            console.log( d.id +":"+ d.abbr + " " + d.smokes + " " + d.obesity)
            i++
        });

        console.log(i);

        var xLinearScale = d3.scaleLinear()
            .domain([6, d3.max(data, d => d.smokes)]).range([0, w]);

        var yLinearScale = d3.scaleLinear()
            .domain([20, d3.max(data, d => d.obesity)]).range([h, 0]);

        var xAxis = d3.axisBottom(xLinearScale);
        var yAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${h})`).call(xAxis);

        chartGroup.append("g").call(yAxis);

        var circlesGroup = chartGroup.selectAll("circle")
            .data(data).enter().append("circle")
            .attr("cx", d => xLinearScale(d.smokes))
            .attr("cy", d => yLinearScale(d.obesity))
            .attr("r", "10").attr("fill", "blue").attr("opacity", ".35");

        var circlesGroup = chartGroup.selectAll("text")
            .data(data).enter().append("text")
            .attr("x", d => xLinearScale(d.smokes))
            .attr("y", d => yLinearScale(d.obesity) + 2.5)
            .attr("font-size", 10)
            .attr("text-anchor", "middle").text(d => d.abbr);
})
