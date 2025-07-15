
[![npm version](https://badge.fury.io/js/metar-plot.svg)](https://badge.fury.io/js/metar-plot)

# METAR Plot

Metar plot is a small METAR converter and SVG based plot lib with no dependecies. 

## Install

```sh
npm install metar-plot
```

## Examples

```typescript
import { METAR, MetarPlot, rawMetarToMetarPlot } from "metar-plot"

let metarPlotManual : MetarPlot = 
{
    "visablity": 9,
    "temp": 12,
    "dew_point": 7,
    "station": "WBWI",
    "wind_direction": 120,
    "wind_speed": 20,
    "wx": "RA"
}

let height = "100px"
let width = "100px"

let rawMetar = "EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006"

let imgSrcManual : string = metarToImgSrc(metarPlotManual)
let imgSrcRaw : string =  metarToImgSrc(rawMetarToMetarPlot(rawMetar))

let metar : METAR = new METAR("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")

<img style={`height:${height};width:${width}`} src={imgSrcManual} alt="metar"/>
<img style={`height:${height};width:${width}`} src={imgSrcRaw} alt="metar"/>
```

Decoded METAR Example Object
```javascript 
{
   "wind": {
      "direction": 350,
      "speed": 6,
      "unit": "KT"
   },
   "weather": [
      {
         "abbreviation": "VCSH",
         "meaning": "Vicinity showers"
      }
   ],
   "clouds": [
      {
         "abbreviation": "FEW",
         "meaning": "few",
         "altitude": 1800
      },
      {
         "abbreviation": "BKN",
         "meaning": "broken",
         "altitude": 3600
      }
   ],
   "station": "EGCC",
   "time": "2021-11-03T17:20:00.000Z",
   "auto": false,
   "cavok": false,
   "visibility": 9999,
   "temperature": 8,
   "dewpoint": 6,
   "altimeter": 29.79
}
```
Customized Plot

```javascript
import { METAR, MetarPlot, rawMetarToMetarPlot } from "metar-plot"

let metarPlotManual : MetarPlot = 
{
    "visablity": 9,
    "temp": 12,
    "dew_point": 7,
    "station": "WBWI",
    "wind_direction": 120,
    "wind_speed": 20,
    "wx": "RA"
}

let height = "100px"
let width = "100px"

let options = {
   temperature_color: "red",
   symbol_color: "#8d8d8d",
   metric: true
}

let imgSrcManual : string = metarToImgSrc(metarPlotManual, options)

<img style={`height:${height};width:${width}`} src={imgSrcManual} alt="metar"/>
<img style={`height:${height};width:${width}`} src={imgSrcRaw} alt="metar"/>
```
## Documentation

Data Types:
   * METAR: Object contains extracted METAR data
      * If your data source is a raw metar and you wish to display human readable values this class will give that data.  This object is displayed in the metar demo. It's definition is found here [Metar.ts](https://github.com/Phoenix-OpsGroup/metar-plot/blob/main/src/Metar.ts)
      * Weather codes: [Weather.ts](https://github.com/Phoenix-OpsGroup/metar-plot/blob/main/src/parts/Weather.ts)
      * Cloud Codes: [Cloud.ts](https://github.com/Phoenix-OpsGroup/metar-plot/blob/main/src/parts/Cloud.ts)
   * MetarPlot: Object maps out all data to the svg plot.
      * This allows you to use pre extracted data and map it as you please to the plot.  if you have your own METAR structure and want to map it to the plot use this object. It's definitioncan be found here [MetarPlot.ts](https://github.com/Phoenix-OpsGroup/metar-plot/blob/main/src/MetarPlot.ts)
   * MetarPlotOptions: Contains options to modify a plot
      * Change colors of text and symbols
      * Metric/SAE

## Contributors

* Speacial thanks to [metar.js](https://github.com/skydivejkl/metar.js),
parsing code was forked and converted to TypeScript from this project

## Change Log

* [Change Log](https://github.com/phoenix-opsgroup/metar-plot/releases)