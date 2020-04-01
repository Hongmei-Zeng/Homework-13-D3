const svgWidth = 960
const svgHeight = 500

let margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
}

let width = svgWidth - margin.left - margin.right
let height = svgHeight - margin.top - margin.bottom

let svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

let chartGroup = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)

// 
d3.csv("data.csv").then(data => {

// Set scales
    let xLinearScale = d3.scaleLinear()
                        .domain([
                                d3.min(data.map(d => d.poverty)) * 0.8,
                                d3.max(data.map(d => d.poverty)) * 2.5
                                ])
                        .range([0, width])

    let yLinearScale = d3.scaleLinear()
                        .domain([0, d3.max(data.map(d => d.healthcareLow)) * 2.8])
                        .range([height, 0])

// Add Axises
    let bottomAxis = d3.axisBottom(xLinearScale)

    let leftAxis = d3.axisLeft(yLinearScale)
    
    chartGroup.append("g")
              // .classed("x-axis", true)
              .attr("transform", `translate(0, ${height})`)
              .call(bottomAxis)

    chartGroup.append("g")
              // .classed("y-axis", true)
              .call(leftAxis)

// Add Axises Labels
    chartGroup.append("g")
              .attr("transform", `translate(${width / 2}, ${height + 20})`)
              .append("text")
              .attr("x", 0)
              .attr("y", 20)
              .attr("value", "poverty")
              .classed("axis-text", true)
              .text("In Poverty(%)")

    chartGroup.append("g")
              .attr("transform", "rotate(-90)")
              .append("text")
              .attr("y", 0 - margin.left)
              .attr("x", 0 - height / 2)
              .attr("dy", "4em")
              .classed("axis-text", true)
              .text("Lacks Healthcare(%)")  

// Generate circlesGroup 
    chartGroup.append("g")
              .selectAll("circle")
              .data(data)
              .enter()
              .append("circle")
              .attr("cx", d => xLinearScale(d.poverty))
              .attr("cy", d => yLinearScale(d.healthcareLow))
              .attr("r", 10)
              .attr("fill", "blue")
              .attr("opacity", ".5")

// Add States Abbrs on the circles
    chartGroup.append("g")
              .selectAll("text")
              .data(data)
              .enter()
              .append("text")
              .attr("x", d => xLinearScale(d.poverty))
              .attr("y", d => yLinearScale(d.healthcareLow))
              .text(d =>d.abbr)
              .attr("font-family", "sans-serif")
              .attr("font-size", 9)
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "middle")

})