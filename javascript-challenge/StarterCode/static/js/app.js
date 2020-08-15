// from data.js
var tableData = data;
console.log(tableData)
// YOUR CODE HERE!
tableData.forEach((d) => {
    var r = d3.select("tbody").append("tr")
    Object.entries(d).forEach(([k,v]) => {
        //console.log(v);
        r.append("td").text(v)
    });
});

d3.select("#filter-btn").on("click", runEnter);
d3.select("form").on("submit",runEnter);

// Create the function to run for both events
function runEnter() {
  d3.event.preventDefault();
  var val = d3.select(".form-control").property("value");

  // filter
  console.log(d3.selectAll("tr").remove())
  tableData.forEach((d) => {
      var r = d3.select("tbody").append("tr")
      //console.log(d["datetime"]);

      if( d["datetime"] != val )
        return

      Object.entries(d).forEach(([k,v]) => {
          //console.log(v);
          r.append("td").text(v)
      });
  });

}
