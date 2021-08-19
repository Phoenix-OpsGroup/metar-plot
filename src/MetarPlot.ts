import { METAR } from "./Metar";
import { Cloud, CLOUDS, genCoverage } from "./parts/Cloud";
import { getWeatherSVG } from "./parts/Weather"
/**
 * Extracted Metar message
 */
export class MetarPlot {
    //Visbailiy in SM or m if metric is true
    public visablity?: number | string;
    //temp in C
    public temp?: number;
    //dew point in C
    public dew_point?: number;
    //Staion Name
    public station?: string;
    //Wind direction in degrees
    public wind_direction?: number;
    //Wind speed in Kts or mps if metric is true
    public wind_speed?: number;
    //Wind speed in Kts or mps if metric is true
    public gust_speed?: number;
    //presure in inHg or hPa if metric is true
    public pressure?: number;
    //Cloud Ceiling in ft
    public ceiling?: number;
    //Weather condition abbriviation 
    public wx?: string;
    //Flight condition
    public condition?: string;
    //Prevailing cloud coverage
    public coverage?: string;
    //is this plot in metric or 'MERICAN
    public metric?: boolean
}

const GUST_WIDTH = 2;
const WS_WIDTH = 4;

/**
 * Turns a raw METAR to an SVG image
 * @param rawMetar RAW metar
 * @param width css width of svg
 * @param height css height of svg
 * @param metric true for metric units(m, hPa, mps), false for north american units (miles, inHg, Kts)
 * @returns 
 */
export function rawMetarToSVG(rawMetar: string, width: string, height: string, metric?: boolean): string {
    let plot = rawMetarToMetarPlot(rawMetar, metric)
    return metarToSVG(plot, width, height,);
}

/**
 * 
 * @param rawMetar raw metar string
 * @param metric true for metric units(m, hPa, mps), false for north american units (miles, inHg, Kts)
 * @returns 
 */
export function rawMetarToMetarPlot(rawMetar: string, metric?: boolean): MetarPlot {
    let metar = new METAR(rawMetar);
    let wx = metar.weather.map(weather => weather.abbreviation).join("");
    //Metric converion
    let pressure
    let vis = undefined
    let temp = metar.temperature
    let dp = metar.dewpoint
    if (metric) {
        pressure = (metar.altimeter != null) ? Math.round(metar.altimeter * 33.86) : undefined
        if (metar.visibility != null) {
            vis = metar.visibility > 9999 ? 9999 : Math.round(metar.visibility)
        }
    } else {
        temp = cToF(temp)
        dp = cToF(dp)
        pressure = metar.altimeter
        vis = milePrettyPrint(metar.visibility?? -1)
    }
    return {
        metric: metric ?? false,
        visablity: vis,
        temp: temp,
        dew_point: dp,
        station: metar.station,
        wind_direction: (typeof metar.wind.direction === "number") ? metar.wind.direction : undefined,
        wind_speed: metar.wind.speed,
        gust_speed: metar.wind.gust,
        wx: wx,
        pressure: pressure,
        coverage: determinCoverage(metar)
    }
}

/**
 * Pretty print Miles in fractions if under 1 mile
 */
function milePrettyPrint(meters: number): string{
    let print = ""
    if(meters === -1){
        return print
    }
    let miles = meters * 0.0006213712
    //round to nearest quarter
    let text = (Math.round(miles * 4) / 4).toFixed(2).toString()
    return text.replace(".00", "")
}

/**
 * Determines the coverage symbol
 * @param metar 
 * @returns 
 */
function determinCoverage(metar: METAR): string {
    let prevailingCoverage: Cloud | undefined
    metar.clouds.forEach((cloud: Cloud) => {
        if (prevailingCoverage != null) {
            let curr = prevailingCoverage.abbreviation != null ? CLOUDS[prevailingCoverage.abbreviation].rank : undefined
            let rank = cloud.abbreviation != null ? CLOUDS[cloud.abbreviation].rank : undefined
            console.log(`cur: ${curr}, rank: ${rank}`)
            if (rank != null) {
                if (rank > curr) {
                    prevailingCoverage = cloud
                }
            }
        }else{
            prevailingCoverage = cloud;
        }
    })
    return prevailingCoverage?.abbreviation ?? ""
}

/**
 * Turns a Metar plot object to a SVG image
 * @param metar MetarPlot Object
 * @param width css width for svg
 * @param height css height for svg
 * @returns 
 */
export function metarToSVG(metar: MetarPlot, width: string, height: string): string {
    const VIS = metar.visablity ?? ""
    const TMP = metar.temp ?? ""
    const DEW = metar.dew_point ?? ""
    const STA = metar.station ?? ""
    const ALT = metar.pressure ?? ""

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 500 500">
                <style>
                    .txt{ font-size: 47.5px; font-family: sans-serif; }
                    .tmp{ fill: red }
                    .sta{ fill: grey }
                    .dew{ fill: blue }
                    .vis{ fill: violet }
                </style>
                ${genWind(metar)}
                ${getWeatherSVG(metar.wx ?? "")}
                ${genCoverage(metar.coverage, metar.condition)}
                <g id="text">
                    <text class="vis txt" fill="#000000" stroke="#000" stroke-width="0" x="80"   y="260" text-anchor="middle" xml:space="preserve">${VIS}</text>
                    <text class="tmp txt" fill="#000000" stroke="#000" stroke-width="0" x="160"  y="220" text-anchor="middle" xml:space="preserve" >${TMP}</text>
                    <text class="dew txt" fill="#000000" stroke="#000" stroke-width="0" x="160"  y="315" text-anchor="middle" xml:space="preserve">${DEW}</text>
                    <text class="sta txt" fill="#000000" stroke="#000" stroke-width="0" x="275"  y="315" text-anchor="start" xml:space="preserve">${STA}</text>
                    <text class="sta txt" fill="#000000" stroke="#000" stroke-width="0" x="275"  y="220"  text-anchor="start" xml:space="preserve">${ALT}</text>
                </g>
            </svg>`
}

/**
 * Creates a windbarb for the metar
 * @param metar 
 * @returns 
 */
function genWind(metar: MetarPlot): string {
    const WDD = metar.wind_direction ? metar.wind_direction : 0
    const WSP = metar.wind_speed ? metar.wind_speed : 0
    let wind = ""
    let gust = ""
    if (WSP === 0) {
        wind =
            `<g id="calm">
                <ellipse id="calm-marker" stroke="#000" fill="#00000000" cx="250" cy="250" rx="35" ry="35"/>
            </g>`
    } else {
        gust = metar.gust_speed == null ? "" :
            `<g id="gustBarb" transform="rotate(${WDD}, 250, 250)">
                ${genBarb1(metar.gust_speed ?? 0, true)}
                ${genBarb2(metar.gust_speed ?? 0, true)}
                ${genBarb3(metar.gust_speed ?? 0, true)}
                ${genBarb4(metar.gust_speed ?? 0, true)}
                ${genBarb5(metar.gust_speed ?? 0, true)}
            </g>`
        wind =
            `<g id="windBard" transform="rotate(${WDD}, 250, 250)">
                <line stroke-width="3" y1="230" x1="250" y2="50" x2="250"  stroke="#000" fill="none" />
                ${genBarb1(metar.wind_speed ?? 0, false)}
                ${genBarb2(metar.wind_speed ?? 0, false)}
                ${genBarb3(metar.wind_speed ?? 0, false)}
                ${genBarb4(metar.wind_speed ?? 0, false)}
                ${genBarb5(metar.wind_speed ?? 0, false)}
            </g>`
    }
    return gust + wind;
}

/**
 * Generate first barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns 
 */
function genBarb1(speed: number, gust: boolean): string {
    const fill = gust ? 'red' : '#000'
    const tag = gust ? 'gs' : 'ws'
    const width = gust ? GUST_WIDTH : WS_WIDTH
    let barb = ""
    if (speed >= 10 && speed < 50) {
        barb = `<line id="${tag}-bard-1-long" stroke-width="${width}" y1="50" x1="250" y2="50" x2="300" stroke="${fill}" transform="rotate(-35, 250, 50)"/>`
    } else if (speed >= 50) {
        barb = `<polygon id="${tag}-bard-1-flag" points="248,60 290,30 248,30" fill="${fill}" />`
    }
    return barb
}
/**
 * Generate second barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns 
 */
function genBarb2(speed: number, gust: boolean): string {
    const fill = gust ? 'red' : '#000'
    const tag = gust ? 'gs' : 'ws'
    const width = gust ? GUST_WIDTH : WS_WIDTH
    let barb = ""
    if ((speed < 10) || (15 <= speed && speed < 20) || (55 <= speed && speed < 60)) {
        barb = `<line id="${tag}-bard-2-short" stroke-width="${width}" y1="70" x1="250" y2="70" x2="275" stroke="${fill}" transform="rotate(-35, 250, 70)"/>`
    } else if ((15 < speed && speed < 50) || (speed >= 60)) {
        barb = `<line id="${tag}-bard-2-long" stroke-width="${width}" y1="70" x1="250" y2="70" x2="300" stroke="${fill}" transform="rotate(-35, 250, 70)"/>`
    }
    return barb
}
/**
 * Generate third barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns 
 */
function genBarb3(speed: number, gust: boolean): string {
    const fill = gust ? 'red' : '#000'
    const tag = gust ? 'gs' : 'ws'
    const width = gust ? GUST_WIDTH : WS_WIDTH
    let barb = ""
    if ((25 <= speed && speed < 30) || (65 <= speed && speed < 70)) {
        barb = `<line id="${tag}-bard-3-short" stroke-width="${width}" y1="90"  x1="250" y2="90" x2="275" stroke="${fill}" transform="rotate(-35, 250, 90)"/>`
    } else if ((25 < speed && speed < 50) || speed >= 70) {
        barb = `<line id="${tag}-bard-3-long" stroke-width="${width}" y1="90"  x1="250" y2="90" x2="300" stroke="${fill}" transform="rotate(-35, 250, 90)"/>`
    }
    return barb
}
/**
 * Generate forth barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns 
 */
function genBarb4(speed: number, gust: boolean): string {
    const fill = gust ? 'red' : '#000'
    const tag = gust ? 'gs' : 'ws'
    const width = gust ? GUST_WIDTH : WS_WIDTH
    let barb = ""
    if ((35 <= speed && speed < 40) || (75 <= speed && speed < 80)) {
        barb = `<line id="${tag}-bard-4-short" stroke-width="${width}" y1="110" x1="250" y2="110" x2="275"  stroke="${fill}" transform="rotate(-35, 250, 110)"/>`
    } else if ((35 < speed && speed < 50) || speed >= 80) {
        barb = `<line id="${tag}-bard-4-long" stroke-width="${width}" y1="110" x1="250" y2="110" x2="300"  stroke="${fill}" transform="rotate(-35, 250, 110)"/>`
    }
    return barb
}
/**
 * Generate fifth barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns 
 */
function genBarb5(speed: number, gust: boolean): string {
    const fill = gust ? 'red' : '#000'
    const tag = gust ? 'gs' : 'ws'
    const width = gust ? GUST_WIDTH : WS_WIDTH
    let brab = ""
    if ((45 <= speed && speed < 50) || (85 <= speed && speed < 90)) {
        brab = `<line id="${tag}-bard-5-short" stroke-width="${width}" y1="130" x1="250" y2="130" x2="275"  stroke="${fill}" transform="rotate(-35, 250, 130)"/>`
    }
    return brab
}

/**
 * Convert ºF to ºF
 * @param celsius 
 */
function cToF(celsius?: number): number | undefined {
    if (celsius != null) {
        return Math.round(celsius * 9 / 5 + 32);
    }
}
