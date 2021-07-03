// @TODO: YOUR CODE HERE!

// Define height and width of svg
var svgWidth = 960;
var svgHeight = 500;

// Define margins for svg
var margin = {
    top: 30,
    right: 40,
    bottom: 80,
    left: 60
};

// Define height and width of graph
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Add svg to webpage
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

   
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`); 


// Collect data 
d3.csv("assets/data/data.csv").then((healthData) => {
    
    // Change states to abbreviated version
    healthData.forEach((data) => {
        for(i = 0; i < states.length; i++){
            if(states[i][0] == data.state){
                data.state = states[i][1];
            }
        }
    });

    // Define blanks arrays
    var xPoverty = [];
    var yHealthCare = [];

    // Iterate through data and push values to arrays to graph
    healthData.forEach(state => {
        xPoverty.push(state.poverty);
        yHealthCare.push(state.healthcare)
    });

    // Create scales    
    var xLinearScale =  d3.scaleLinear()
        .domain([Math.min.apply(null,xPoverty) - 1, Math.max.apply(null, xPoverty) + 2])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([Math.min.apply(null,yHealthCare) - 1, Math.max.apply(null, yHealthCare)+2])
        .range([height, 0]);

    // Create Axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to chartGroup
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);


    // Add cricles
    // var circlesGroup = chartGroup.selectAll("g")
    //     .data(healthData)
    //     .enter()
    //     .append("circle")
    //         .attr("cx", d => xLinearScale(d.poverty))
    //         .attr("cy", d => yLinearScale(d.healthcare))
    //         .attr("r", 10)
    //         
    
    // circlesGroup.append("text")
    //     .text('hi');

    var circlesGroup = chartGroup.selectAll("g.circles")
    
    circlesGroup = circlesGroup.data(healthData)
        .enter()
        .append("g")
        .classed("circles", true);

    circlesGroup.append("svg:circle")

    circlesGroup.selectAll("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 10)        
        .style("fill", "rgb(138, 189, 211)");

    circlesGroup.append("text");
    
    circlesGroup.selectAll("text")
        .text("Hi")
        .attr("font-family",  "Courier")
        .attr("fill", "black")
        .style("opacity", "0.8")
        .attr("font-size", "0.8em")
        .attr("text-anchor",  "middle");
    



    // Add bottom text
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("In Poverty (%)");

    // Add left text
    chartGroup.append("text")
    .attr("transform", `translate(${-margin.left / 2}, ${height /2}) rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("font-weight", "bold")
    .attr("font-size", "18px")
    .text("Lacks Healthcare (%)");


    // // Add tool tip
    // var toolTip = d3.select("body").append("div")
    //     .attr("class", "tooltip");

    // circlesGroup.on("mouseover", function(d,i) {
    //     toolTip.style("display", "block");
    //     toolTip.html(``)
    // })

    // .on("mouseout", function() {
    //     toolTip.style("display", "none");
    //   });

});
