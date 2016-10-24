import * as d3 from 'd3';

var w = 500;
var h = 300;
var N = 10000;
var runX1 = w/2;
var runX2 = w/2;
var runY1 = h/2;
var runY2 = h/2;
var stepSize = 4;

var scaleY = d3.scaleLinear().domain([-1,1]).range([-stepSize, stepSize]);
var scaleX = d3.scaleLinear().domain([-1,1]).range([-stepSize, stepSize]);
var dataset = [];

for(var i = 0; i < N; i++) {
  var x = scaleX(Math.round(Math.random())*2 - 1);
  var y = scaleY(Math.round(Math.random())*2 - 1);
  dataset.push([x,y])
}

var svg = d3.select("#brownian2d").append("svg");
svg.attr("width", w);
svg.attr("height", h);

var lines = svg.selectAll("line")
                  .data(dataset)
                  .enter()
                  .append("line")

lines.attr("x1", function(d, i) {
  var tmp = runX1;
  runX1 += d[0];
  return tmp;
})
  .attr("y1", function(d,i){
    var tmp = runY1;
    runY1 += d[1];
    return tmp;
  })
  .attr("x2", function(d,i) {
    runX2 += d[0];
    return runX2;
  })
  .attr("y2", function(d,i){
    runY2 += d[1];
    return runY2;
  })
  .attr("stroke", function(d,i) {
    return "rgb(0,0,0)"
  });
