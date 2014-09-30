var fs = require('fs');
var osmium = require('osmium');
var argv = require('optimist').argv;

var osmfile = argv.osmfile;
var boundfile = argv.boundfile;

var nodes = {};
var bounds;

var path = '/home/ruben/data/replication-day/';
//var path = '';

var geojson = {
	"type": "FeatureCollection",
	"features": []
};

var bbox_ny = {
	"type": "Feature",
	"properties": {},
	"geometry": {
		"type": "Polygon",
		"coordinates": [
			[
				[-74.267578125,
					40.49709237269567
				],
				[-74.267578125,
					40.92285206859968
				],
				[-73.69216918945312,
					40.92285206859968
				],
				[-73.69216918945312,
					40.49709237269567
				],
				[-74.267578125,
					40.49709237269567
				]
			]
		]
	}
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

	console.log(bounds.features[0].geometry.coordinates.length);

	handler.on('node', function(node) {
		var coord = [node.lon, node.lat];
		if (bounds.features[0].geometry.coordinates.length === 1) {
			if (pointinpolygon(coord, bounds.features[0].geometry.coordinates[0])) {
				nodes[node.id] = coord;
				//console.log(coord);
			}
		} else {
			if (pointinpolygon(coord, bbox_ny.geometry.coordinates[0])) {
				for (var i = 0; i < bounds.features[0].geometry.coordinates.length; i++) {
					if (pointinpolygon(coord, bounds.features[0].geometry.coordinates[i][0])) {
						nodes[node.id] = coord;
						break;
					}
				}
			}
		}
	});



	handler.on('way', function(way) {
		//if (typeof way.tags().building !== 'undefined' && way.timestamp< 1390608000) {
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