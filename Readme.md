# Install
npm 

```sh
npm install metar-plot
```

# Documentation

```javascript
export class MetarPlot {
    public visablity?: number;
    public temp?: number;
    public dew_point?: number;
    public station?: string;
    public wind_direction?: number;
    public wind_speed?: number;
    public gust_speed?: number;
    public wx?: string;
    public condition?: string;
}

/**
 * Turns a raw METAR to an SVG image
 * @param rawMetar RAW metar
 * @param width css width of svg
 * @param height css height of svg
 * @returns 
 */
export function rawMetarToSVG(rawMetar: string, width: string, height: string) : string {}

/**
 * Turns a Metar plot object to a SVG image
 * @param metar MetarPlot Object
 * @param width css width for svg
 * @param height css height for svg
 * @returns 
 */
export function metarToSVG(metar: MetarPlot, width: string, height: string) : string {}

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

var svg1 = metarToSVG(metarPlot, "100", "100")
var svg2 = rawMetarToSVG("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006", "100", "100")

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

var svg1 : string = metarToSVG(metarPlot, "100", "100")
var svg2 : string = rawMetarToSVG("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006", "100", "100")

var metar : METAR = new METAR("EFJY 171950Z AUTO 27006KT 220V310 9999 FEW012 SCT015 BKN060 13/12 Q1006")
```