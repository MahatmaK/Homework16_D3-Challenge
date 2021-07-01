// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 30,
    right: 40,
    bottom: 30,
    left: 50
};

var width = svgWidth - margin.left - margin. right;
var height = svrgHeight - margin.top - margin. bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

console.log ('hi');


