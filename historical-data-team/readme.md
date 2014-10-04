# Visualizaciones 

## NYC

#### Stitch

use http://geojson.io/#map=2/33.3/11.6, and load the file the place 
# NYC
`./stitch -o file.png -- 40.48038142908172 -74.27032470703125 40.92700253056922 -73.69766235351562 13 http://a.tiles.mapbox.com/v4/openstreetmap.map-inh7ifmo/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib3BlbnN0cmVldG1hcCIsImEiOiJhNVlHd29ZIn0.ti6wATGDWOmCnCYen-Ip7Q`

#### Geojson
`{
  "type": "FeatureCollection",
  "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -74.27032470703125,
              40.48038142908172
            ],
            [
              -74.27032470703125,
              40.92700253056922
            ],
            [
              -73.69766235351562,
              40.92700253056922
            ],
            [
              -73.69766235351562,
              40.48038142908172
            ],
            [
              -74.27032470703125,
              40.48038142908172
            ]
          ]
        ]
      }
    }
  ]
}`
#### Tilemill

`-74.27032470703125, 40.48038142908172, -73.69766235351562, 40.92700253056922`

## SF

### Gejson
`{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -122.51678466796874,
              37.70012079430599
            ],
            [
              -122.51678466796874,
              37.83419172060043
            ],
            [
              -122.35336303710938,
              37.83419172060043
            ],
            [
              -122.35336303710938,
              37.70012079430599
            ],
            [
              -122.51678466796874,
              37.70012079430599
            ]
          ]
        ]
      }
    }
  ]
}`


## Ayacucho

`{
  "type": "FeatureCollection",
  "features": [ 
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -74.26088333129883,
              -13.214879431265516
            ],
            [
              -74.26088333129883,
              -13.104892579817477
            ],
            [
              -74.16732788085938,
              -13.104892579817477
            ],
            [
              -74.16732788085938,
              -13.214879431265516
            ],
            [
              -74.26088333129883,
              -13.214879431265516
            ]
          ]
        ]
      }
    }
  ]
}`


# GIF con 168 freames

# Modificar todos los archivos:

`mogrify -format gif *.png`

# creara el gif

`gifsicle --loop --colors 256 *.gif > nyc.gif`

 # crea la mitad

`gifsicle nyc.gif  --colors 256 --resize-fit-width 800 -O2 > ny-half.gif`

## hacer un deley en el ultimo frame

`gifsicle -b ny-half.gif --delay 600  "#167"`



