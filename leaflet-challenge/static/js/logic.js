
var map = L.map('map',{
  center: [0,0],
  zoom: 2
})

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
}).addTo(map);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson", function(data){
    console.log(data['features']);
    colorscale = d3.scaleLinear().domain([1,10]).range(["white", "red"])

    for (var i = 0; i < data['features'].length; i++) {
        var location = data['features'][i]["geometry"];
        var mag = data['features'][i]['properties']['mag']
        if (location) {
            L.circleMarker(
                [location.coordinates[1], location.coordinates[0]],
                {color:colorscale(mag), radius:mag*mag}).bindPopup(
                data.features[i].properties.title).addTo(map);
        }
    }

    //map.addLayer(markers)
});
