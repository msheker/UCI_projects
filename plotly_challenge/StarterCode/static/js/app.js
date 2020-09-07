
var cases = {}
var meta = {}

function create_bar(x,y,text)
{
    var trace = {x: x,
                y: y,
                type: 'bar',
                orientation: 'h',
                hovertext:text,
                hoverinfo:'text'
                }

    Plotly.newPlot("bar",[trace],{});
}

function create_scatter(x,y,text)
{
    var trace = {x: x,
                y: y,
                mode: 'markers',
                color: x,
                hovertext:text,
                hoverinfo:'text',
                marker: {
                    size: y
                }}

    Plotly.newPlot("bubble",[trace],{});
}

function set_metadata(user)
{
    d3.select("#sample-metadata").html("");
    var ls = d3.select("#sample-metadata").append("ul").attr("style","list-style-type:none")
    Object.entries(meta[user]).forEach((item, i) => {
        ls.append("li").text(item[0] + ": " + item[1])
    });

}

function optionChanged(val)
{
    console.log(val);
    var y = cases[val].otu_ids.slice(0,10)
    var x = cases[val].sample_values.slice(0,10)
    var text = cases[val].otu_labels.slice(0,10)

    set_metadata(val)
    create_scatter(y,x,text)
    x.reverse();
    y = y.map(x => "OTU" + String(x)).reverse();
    text.reverse();
    create_bar(x,y,text)
}

d3.json("../../samples.json").then( function(data)
{
    //console.log(data);

    data.metadata.forEach((item, i) => {
        meta[item.id] = item
    });

    data['samples'].forEach((item, i) => {
        //console.log(item.id);
        d3.select("#selDataset").append("option").attr("value",item.id).text(item.id)
        cases[item.id] = item
    });

    console.log(cases);
    var y = cases["940"].otu_ids.slice(0,10)
    var x = cases["940"].sample_values.slice(0,10)
    var text = cases["940"].otu_labels.slice(0,10)

    set_metadata("940")
    create_scatter(y,x,text)
    x.reverse();
    y = y.map(x => "OTU" + String(x)).reverse();
    text.reverse();
    create_bar(x,y,text)

});
