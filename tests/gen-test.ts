import { MetarPlot, metarToSVG, rawMetarToSVG, rawMetarToMetarPlot } from "../src/MetarPlot"
import { METAR } from "../src/Metar"
import * as fs from 'fs';
import { assert } from 'chai';
const WIDTH = "150"
const HEIGHT = "150"
/**
 * These Tests always pass they create a sample data to be viewed from the metars.json file
 * in tests/data/metars.json
 */
let rows: string = "";
let metars: Array<MetarPlot> = require("./data/metars.json")
let rawMetars: Array<any> = require("./data/rawMetars.json")

before(() => {
    if (fs.existsSync("./coverage") === false) {
        fs.mkdirSync("./coverage")
    }
    if (fs.existsSync("./coverage/image-debug") === false) {
        fs.mkdirSync("./coverage/image-debug")
    }
})

after(() => {
    let content = `
        <div class="container">
            <div>Metar</div><div>Raw</div><div>Plot-data</div><div>Plot 'MERICAN</div><div>Plot Metic</div>
            ${rows}
        </div>
    `
    writeHtml("coverage/image-debug/generated.html", content)
})

describe('Generate Images', () => {
    it("Gen Images - Metar Plots", () => {
        metars.forEach(
            (metar: MetarPlot) => {
                let svg = metarToSVG(metar, WIDTH, HEIGHT)
                let svgMetar = metarToSVG(metar, WIDTH, HEIGHT)
                addRow(metar, svg, svgMetar, undefined)
            }
        )
    })
})

describe('Generate Images', () => {
    it("Gen Images - Raw Metar", () => {
        let errors: any = {}
        rawMetars.forEach(
            (metar: any) => {
                try {
                    let plot = rawMetarToMetarPlot(metar.raw)
                    let svg = rawMetarToSVG(metar.raw, WIDTH, HEIGHT)
                    let svgMetric = rawMetarToSVG(metar.raw, WIDTH, HEIGHT, true)
                    addRow(plot, svg, svgMetric, new METAR(metar.raw), metar.raw)
                } catch (error) {
                    errors[metar.raw] = error.message
                }
            }
        )
        assert(Object.keys(errors).length === 0, `Error Parsing the following metars:\n${JSON.stringify(errors, null, 1)}`)
    })
})

function addRow(plot: MetarPlot, svg: string, svgMetric: string, metar?: METAR, raw?: String) {
    rows += `<pre>${JSON.stringify(plot, null, 1)}</pre><pre>${metar == null ? "" : JSON.stringify(metar, null, 1)}</pre><div>${raw ?? ""}</div><pre>${svg}</pre><pre>${svgMetric}</pre>`
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
                    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                    grid-auto-rows: auto;
                }
            </style>
        </head>
        <body>${content}</body>
    </html>`
    fs.writeFileSync(filename, html);
}