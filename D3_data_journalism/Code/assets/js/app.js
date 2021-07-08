// Define height and width of svg
var svgWidth = 1000;
var svgHeight = 600;

// Define margins for svg
var margin = {
    top: 30,
    right: 40,
    bottom: 80,
    left: 150
};

// Define height and width of graph
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom - 50;

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
    
    console.log(healthData[0]);

    // Define blanks arrays
    var xPoverty = [];
    var xAge = [];
    var xIncome = [];
    var yHealthCare = [];
    var ySmoke = [];
    var yObese = [];

    // Iterate through data and push values to arrays to graph
    healthData.forEach(state => {
        xPoverty.push(state.poverty);
        xAge.push(state.age);
        xIncome.push(state.income);
        yHealthCare.push(state.healthcare);
        ySmoke.push(state.smokes);
        yObese.push(state.obesity);
    });



    // Create scales
    
    var xArray = xPoverty;
    var yArray = yHealthCare;

    // Calculate difference between min and max value. Will add 10% of diff value to min and max
    var xDiff = Math.max.apply(null, xPoverty) - Math.min.apply(null, xPoverty);
    var yDiff = Math.max.apply(null, yHealthCare) - Math.min.apply(null, yHealthCare);

    var xLinearScale =  d3.scaleLinear()
        .domain([Math.min.apply(null, xPoverty) - .1*xDiff, Math.max.apply(null, xPoverty) + .1*xDiff])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([Math.min.apply(null, yHealthCare) - .1*yDiff, Math.max.apply(null, yHealthCare) + .1*yDiff])
        .range([height, 0]);

    // Create Axis
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Append axes to chartGroup
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis)
        .classed("bottom-axis", true);

    chartGroup.append("g")
        .call(leftAxis)
        .classed("left-axis", true);;

    // Add circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", (d,i) => xLinearScale(xPoverty[i]))
        .attr("cy", (d,i) => yLinearScale(yHealthCare[i]))
        .attr("r", 11)   
        .style("fill", "rgb(138, 189, 211)")   
        .classed("circle", true);  

    // Add circle text
    var circlesLabels = chartGroup.selectAll(null)
        .data(healthData)
        .enter()
        .append("text")
        .attr("dx", (d,i) => xLinearScale(d.poverty))
        .attr("dy", (d,i) => yLinearScale(d.healthcare) + 3)    
        .text(function(d) {return d.abbr})
        .attr("font-family",  "Courier")
        .attr("fill", "white")
        .style("opacity", "0.8")
        .attr("font-size", "0.8em")
        .attr("text-anchor",  "middle")
        .classed("circle-text", true);
   
    // Add bottom text options
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
        .attr("text-anchor",  "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("In Poverty (%)")
        .style("fill", "black")
        .classed("bottom-text", true);

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 45})`)
        .attr("text-anchor",  "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("Age (Median)")
        .style("fill", "lightgray")
        .classed("bottom-text", true);

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 70})`)
        .attr("text-anchor",  "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("Household Income (Median)")
        .style("fill", "lightgray")
        .classed("bottom-text", true);
    
     
    // Add left text options
    chartGroup.append("text")
        .attr("transform", `translate(-50, ${height /2}) rotate(-90)`)
        .attr("text-anchor",  "middle")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("Lacks Healthcare (%)")
        .style("fill", "black")
        .classed("left-text", true);

    chartGroup.append("text")
        .attr("transform", `translate(-75, ${height /2}) rotate(-90)`)
        .attr("text-anchor",  "middle")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("Smoke (%)")
        .style("fill", "lightgray")
        .classed("left-text", true);

    chartGroup.append("text")
        .attr("transform", `translate(-100, ${height /2}) rotate(-90)`)
        .attr("text-anchor",  "middle")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .text("Obese (%)")
        .style("fill", "lightgray")
        .classed("left-text", true);


    // On click of left axis text
    
    // Select the text on the left axis
    leftAxisText = chartGroup.selectAll(".left-text")

    // Define on click function
    leftAxisText.on("click", function() {

        // Change all text to light gray
        leftAxisText.style("fill", "lightgray");
        
        // Change select
        d3.select(this)
            .style("fill", "black");

        // Determine and store which axis data has been selected
        var selectedLeftAxis = d3.select(this).text();
        
        switch (selectedLeftAxis) {
            case "Lacks Healthcare (%)":
                var yArray = yHealthCare;
                break;
            case "Smoke (%)":
                var yArray = ySmoke;
                break;
            case "Obese (%)":
                var yArray = yObese;
        }

        // Create scales   

        // Recalculate diff
        yDiff = Math.max.apply(null, yHealthCare) - Math.min.apply(null, yHealthCare);

        yLinearScale = d3.scaleLinear()
        .domain([Math.min.apply(null, yArray) - .1*yDiff, Math.max.apply(null, yArray)+ .1*yDiff])
        .range([height, 0]);

        // Create Axis
        leftAxis = d3.axisLeft(yLinearScale);

        // Append axis to chartGroup
        chartGroup.select(".left-axis")
            .transition()
            .duration(300)
            .call(leftAxis);
            
        // Update circles
        chartGroup.selectAll("circle")
            .transition()
            .duration(300)
            .attr("cy", (d,i) => yLinearScale(yArray[i]));

        // Update circle text
        chartGroup.selectAll(".circle-text")
            .transition()
            .duration(300)
            .attr("dy", (d,i) => yLinearScale(yArray[i]) + 3)
            .style("fill", "white");


    });
    // On click of bottom axis text
    
    // Select the text on the bottom axis
    bottomAxisText = chartGroup.selectAll(".bottom-text")

    // Define on click function
    bottomAxisText.on("click", function() {

        // Change all text to light gray
        bottomAxisText.style("fill", "lightgray");
        
        // Change select
        d3.select(this)
            .style("fill", "black");

        // Determine and store which axis data has been selected
        var selectedbottomAxis = d3.select(this).text();
        
        switch (selectedbottomAxis) {
            case "In Poverty (%)":
                var xArray = xPoverty ;
                break;
            case "Age (Median)":
                var xArray = xAge;
                break;
            case "Household Income (Median)":
                var xArray = xIncome;
        }

        // Create scales   
        
        // Recalculate diff
        diff = Math.max.apply(null, xArray) - Math.min.apply(null, xArray);
        
        xLinearScale = d3.scaleLinear()
        .domain([Math.min.apply(null, xArray) - .1*diff, Math.max.apply(null, xArray)+ .1*diff])
        .range([0, width]);

        // Create Axis
        bottomAxis = d3.axisBottom(xLinearScale);

        // Append axis to chartGroup
        chartGroup.select(".bottom-axis")
            .transition()
            .duration(300)
            .call(bottomAxis);
        
    
        // Update circles
        chartGroup.selectAll("circle")
            .transition()
            .duration(300)
            .attr("cx", (d,i) => xLinearScale(xArray[i]) + 3);


            
        // Update circle text
        chartGroup.selectAll(".circle-text")
            .transition()
            .duration(300)
            .attr("dx", (d,i) => xLinearScale(xArray[i]) + 3);     
    });





    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([-80, -60])
        .html(function(d,i) {
            return (`<strong>${xArray[i]}</strong>`);
        });

        chartGroup.call(toolTip);

        circlesGroup.on("mouseover", function(d,i) {
            toolTip.show(xArray[i], this)
        });





//     // Step 1: Append tooltip div
//     var toolTip = d3.select("body")
//       .append("div")
//       .attr("position", "absolute")
//       .classed("tooltip", true);


//     circlesLabels.on("mouseover", function(d,i) {
//         toolTip.style("display", "block");
//         toolTip.html(d)
//             .style("right", d3.select(this).attr("dx") + "px")
//             .style("top", d3.select(this).attr("dy") + "px");
//     });

//     circlesLabels.on("mouseout", function() {
//         toolTip.style("display", "none");
//       });



//     circlesGroup.on("mouseover", function() {
//         d3.select(this).style("stroke", "black");
//     });
    
//     circlesGroup.on("mouseout", function() {
//         d3.select(this).style("stroke", "none");
//     });

});
