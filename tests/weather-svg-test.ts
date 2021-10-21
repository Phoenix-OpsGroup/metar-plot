import { getWeatherSVG, WEATHER} from "../src/parts/Weather"
import * as fs from 'fs';
import { MetarPlot, metarToSVG } from "../src/MetarPlot";

/**
 * Programatically tests the exsistance of the right svg elements
 * it does not ensure that those elements look correct so a html file with 
 * all generated test data is created and stored in coverage/image-debug/barbs.html
 */

let rows: string = "";
before(async () => {
    if (fs.existsSync("./coverage") === false) {
        fs.mkdirSync("./coverage")
    }
    if (fs.existsSync("./coverage/image-debug") === false) {
        fs.mkdirSync("./coverage/image-debug")
    }
})

after(() => {
    let content = `<table>${rows}</table>`
    writeHtml("coverage/image-debug/weather.html", content)
})

describe('Test Weather Icons', () => {
    it("icon permutations", () => {
        Object.keys(WEATHER).forEach( 
            (wx) =>
            {
                let metar : MetarPlot=
                {
                    station: "BLAM",
                    temp: -12,
                    dew_point: -12,
                    wx: wx,
                    wind_direction: 260,
                    wind_speed: 20,
                    visablity: 9999
                }
                addRow(wx, getWeatherSVG(wx), metarToSVG(metar, "300", "300"))
            })
    })
})

function addRow(wx: string, svg: string, metar: string) {

    rows += `<div>${wx+" : "+WEATHER[wx].text}</div><pre>${svg}</pre><pre>${metar}</pre>`
}

function writeHtml(filename: string, content: string){
    let html = 
    `<!DOCTYPE html>
    <html lang="en">
        <head>
            <title>Generated</title>
            <style>
                .container{
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-auto-rows: auto;
                }
            </style>
        </head>
        <body>
        <div class="container">
        <div>Weather</div><div>Symbol</div><div>METAR</div>
        ${content}
        </div>
        </body>
    </html>`
    
    fs.writeFileSync(filename, html);
}