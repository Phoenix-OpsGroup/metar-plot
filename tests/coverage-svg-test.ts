import { CLOUDS, Cloud } from "../src/parts/Cloud";
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
    writeHtml("coverage/image-debug/cloud-coverage.html", content)
})

describe('Test coverage svg', () => {
    it("icon permutations", () => {
        Object.keys(CLOUDS).forEach(
            (cv: any) => {
                let metar: MetarPlot =
                {
                    station: "BLAM",
                    temp: -12,
                    dew_point: -12,
                    coverage: cv,
                    visablity: 9999
                }
                addRow(CLOUDS[cv].text, CLOUDS[cv].svg, metarToSVG(metar, "150", "150"))
            }
        )
    })
})

function addRow(cv: string, svg: string, metar: string) {
    rows += `<div>${cv}</div><pre>${svg}</pre><pre>${metar}</pre>`
}

function writeHtml(filename: string, content: string) {
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
        <div>Cloud Coverage</div><div>Symbol</div><div>METAR</div>
        ${content}
        </div>
        </body>
    </html>`

    fs.writeFileSync(filename, html);
}