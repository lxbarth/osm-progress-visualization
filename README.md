osm-progress-visualization
==========================

working with : http://planet.osm.org/replication/day/000/000/


`git clone https://github.com/Rub21/osm-progress-visualization.git`

`npm install`

 # Boundary File

 We use Qgis for conver SHPFile to Geojson, or is possible to use GDAL


# Process The Files

- Process in block:

 `./process-files 705 716 dc.gejson`

Where:
min-file=500( 25-Jan-2014)
max-file=717( 30-Aug-2014)

# Tile-stitch

`./stitch -o dc.png -- 38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562 13 http://a.tile.openstreetmap.org/{z}/{x}/{y}.png`
 
 or:

 `./stitch -o nyc-new.png -- 38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562 13 http://a.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q`



# Setting on Tilemill

`38.80654039080489 -77.12539672851561 39.00050945751261 -76.90567016601562`
![screenshot from 2014-09-01 19 49 53](https://cloud.githubusercontent.com/assets/1152236/4112841/2f7bb664-323b-11e4-8b08-b42a58f80194.png)

# Create config file for Projectmill




- Procesamos los archivos .png

`mogrify -format gif *.png`

- Creamos el Gif

`gifsicle --loop=0 --colors=255 *.gif > dc.gif`

- Ponemos un pause al final de 5 segundos

el siguiente comando no trabaja en sistema de 64bits, trabaja en uns sistema de 32bits.


`gifsicle dc.gif  -d500 "#-1"`

- Cambiamos de tamano 

`gifsicle dc.gif --colors=255 | gifsicle --unoptimize | gifsicle  --resize-fit-width 500 -O2 > dc-half.gif`


- Si en caso de que se quiere extraer otros frames  como gif.

 `gifsicle --colors=255 --unoptimize --explode dc.gif` to explode the gif into a gif per frames

