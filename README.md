osm-progress-visualization
==========================

Data: http://planet.osm.org/replication/day/000/000/

# Install

`git clone https://github.com/Rub21/osm-progress-visualization.git`

`cd osm-progress-visualization`

`npm install`


# Draw Boundary

 http://geojson.io/#map=2/20.1/0.0

![screenshot from 2014-10-20 17 11 54](https://cloud.githubusercontent.com/assets/1152236/4709206/c0c68120-589d-11e4-85f9-b6def29ce57a.png)

save  DC file : https://github.com/Rub21/osm-progress-visualization/blob/master/dc.geojson and then copy the [square](https://cloud.githubusercontent.com/assets/1152236/4711354/5b4f7588-58b9-11e4-9dd5-f69aaae032a1.png)in :

http://bl.ocks.org/Rub21/raw/8f918ce7e6d84dc3db80/

'{
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -77.12059020996094,
              38.80734300597642
            ],
            [
              -77.12059020996094,
              38.997040842877695
            ],
            [
              -76.90841674804688,
              38.997040842877695
            ],
            [
              -76.90841674804688,
              38.80734300597642
            ],
            [
              -77.12059020996094,
              38.80734300597642
            ]
          ]
        ]
      }
    }
  ]
}'


'./stitch -o file.png -- 38.80734300597642 -77.12059020996094 38.997040842877695 -76.90841674804688 13 http://a.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q'


'-77.12059020996094, 38.80734300597642, -76.90841674804688, 38.997040842877695'


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

`python make-config.py`

# Create GIF Animation

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

