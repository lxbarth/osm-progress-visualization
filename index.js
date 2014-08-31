var fs = require('fs');
var osmium = require('osmium');
var argv = require('optimist').argv;

var osmfile = argv.osmfile;
var boundfile = argv.boundfile;

var nodes = {};
var bounds;

var path = '/home/ruben/data/replication-day/';

var geojson = {
	"type": "FeatureCollection",
	"features": []
};

fs.readFile(boundfile, 'utf8', function(err, data) {
	if (err) {
		console.log('Error: ' + err);
		return;
	}
	bounds = JSON.parse(data);

	var file = new osmium.File(path + osmfile);
	var reader = new osmium.Reader(file);
	var handler = new osmium.Handler();

	//console.log(bounds.features[0].geometry.coordinates[0]);
	handler.on('node', function(node) {

		var coord = [node.lon, node.lat];
		if (pointinpolygon(coord, bounds.features[0].geometry.coordinates[0])) {

			nodes[node.id] = coord;
			//console.log(coord);
		}
	});



	handler.on('way', function(way) {

		//console.log(way.nodes());

		if (typeof way.tags().building !== 'undefined') {
			var feature = {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "LineString",
					"coordinates": []
				}
			};

			var wayinpolygon = true;

			for (var i = 0; i < way.nodes().length; i++) {
				if (nodes.hasOwnProperty(way.nodes()[i]) && wayinpolygon) {
					feature.geometry.coordinates.push(nodes[way.nodes()[i]]);
				} else {
					wayinpolygon = false;
				}
			}
			if (wayinpolygon) {
				geojson.features.push(feature);
			}



		}
	});

	reader.apply(handler);

	//console.log(nodes);

	var outputFilename = path + boundfile.split('.')[0] + '-' + osmfile.split('.')[0] + '.geojson';
	fs.writeFile(outputFilename, JSON.stringify(geojson), function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log("JSON saved to " + outputFilename);
		}
	});
});

function pointinpolygon(point, vs) {
	var x = point[0],
		y = point[1];
	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0],
			yi = vs[i][1];

		var xj = vs[j][0],
			yj = vs[j][1];

		var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}
	return inside;
}