[![METAR-PLOT](https://circleci.com/gh/Phoenix-OpsGroup/metar-plot.svg?style=svg)](https://circleci.com/gh/Phoenix-OpsGroup/metar-plot)
[![npm version](https://badge.fury.io/js/metar-plot.svg)](https://badge.fury.io/js/metar-plot)

# Demo

Demo: [https://phoenix-ops.github.io/metar-plot-demo/](https://phoenix-opsgroup.github.io/metar-plot-demo/)

React example code: [https://github.com/phoenix-opsgroup/metar-plot-demo](https://github.com/phoenix-opsgroup/metar-plot-demo)

# Install
[npm](https://www.npmjs.com/package/metar-plot) 

```sh
npm install metar-plot
```

# Examples

Javascript
```javascript
import metar_plot from 'metar-plot';
const { METAR, metarToSVG, rawMetarToSVG, getWeatherLegend, genWind, WEATHER } = metar_plot;

var metarPlot = 
{
    "visablity": 9,
    "temp": 12,
    "dew_point": 7,
    "station": "WBWI",
    "wind_direction": 120,
    "wind_speed": 20
}

var svg1 = metarToSVG(metarPlot, "100", "100")
var svg2 = rawMetarToSVG("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006", "100", "100")

var metar = new METAR("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")

var weather = WEATHER["VCSH"]
var weatherSymbol = getWeatherLegend("VCSH");
```

TypeScript

```typescript
import { METAR, MetarPlot, metarToSVG, rawMetarToSVG, getWeatherLegend, genWind, WEATHER } from "metar-plot"

var metarPlot : MetarPlot = 
{
    "visablity": 9,
    "temp": 12,
    "dew_point": 7,
    "station": "WBWI",
    "wind_direction": 120,
    "wind_speed": 20
}

var svg1 : string = metarToSVG(metarPlot, "100", "100")
var svg2 : string = rawMetarToSVG("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006", "100", "100")

var metar : METAR = new METAR("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")

var weather : string = WEATHER["VCSH"]
var weatherSymbol : string = getWeatherLegend("VCSH");

```

METAR Example Object
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

# Documentation

Data Types:
   * METAR: Object contains extracted METAR data
      * If your data source is a raw metar and you wish to display human readable values this class will give that data.  This object is displayed in the metar demo. It's definition is found here [Metar.ts](./src/Metar.ts)
      * Weather codes: [Weather.ts](./src/parts/Weather.ts)
      * Cloud Codes: [Cloud.ts](./src/parts/Cloud.ts)
   * MetarPlot: Object maps out all data to the svg plot.
      * This allows you to use pre extracted data and map it as you please to the plot.  if you have your own METAR structure and want to map it to the plot use this object. It's definitioncan be found here [MetarPlot.ts](./src/Metar.ts)

# Contributors

* Speacial thanks to [metar.js](https://github.com/skydivejkl/metar.js),
parsing code was forked and converted to TypeScript from this project

# Change Log

* [Change Log](https://github.com/phoenix-opsgroup/metar-plot/releases)