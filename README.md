osm-progress-visualization
==========================

# Install libraries

 	`npm install`

 # Boundary File

 	We use Qgis for conver SHPFile to Geojson, or is possible to use GDAL


# Process The Files

- Process in block:

 `./process-files 705 716 dc.gejson`

Where:
min-file=500( 25-Jan-2014)
max-file=717( 30-Aug-2014)

Tileshit

./stitch -o baymodel.png -- 37.371794 -122.917099 38.226853 -121.564407 10 http://a.tile.openstreetmap.org/{z}/{x}/{y}.png

./stitch -o dc.png -- 38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562 10 http://a.tile.openstreetmap.org/{z}/{x}/{y}.png

