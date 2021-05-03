# Install
npm 

```sh
npm install metar-plot
```

# Examples

Javascript
```javascript
import metar_plot from 'metar-plot';
const { METAR, metarToSVG, rawMetarToSVG } = metar_plot;

var metarPlot = 
{
    "visablity": 9,
    "temp": 12,
    "dew_point": 7,
    "station": "WBWI",
    "wind_direction": 120,
    "wind_speed": 20
}

var svg1 = metarToSVG(metarPlot)
var svg2 = rawMetarToSVG("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")

var metar = new METAR("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")
```

TypeScript

```typescript
import { METAR, MetarPlot, metarToSVG, rawMetarToSVG } from "metar-plot"

var metarPlot : MetarPlot = 
{
    "visablity": 9,
    "temp": 12,
    "dew_point": 7,
    "station": "WBWI",
    "wind_direction": 120,
    "wind_speed": 20
}

var svg1 : string = metarToSVG(metarPlot)
var svg2 : string = rawMetarToSVG("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")

var metar : METAR = new METAR("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")
```