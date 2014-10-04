var fs = require('fs');
var osmium = require('osmium');
var argv = require('optimist').argv;

var osmfile = argv.osmfile;


var nodes = {};
var bounds;

var path = '';
//var path = '';

var geojson = {
	"type": "FeatureCollection",
	"features": []
};



var file = new osmium.File(path + osmfile);
var reader = new osmium.Reader(file);
var handler = new osmium.Handler();

handler.on('node', function(node) {
	var coord = [node.lon, node.lat];
	nodes[node.id] = coord;
	//console.log(coord);

});


handler.on('way', function(way) {

	var feature = {
		"type": "Feature",
		"properties": {
			"name":"a"
		},
		"geometry": {
			"type": "LineString",
			"coordinates": []
		}
	};
	geojson.features.push(feature);

});

reader.apply(handler);

var outputFilename = osmfile.split('.')[0] + '.geojson';

fs.writeFile(outputFilename, JSON.stringify(geojson), function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("JSON saved to " + outputFilename);
	}
});