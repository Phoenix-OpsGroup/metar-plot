import { MetarPlot, metarToSVG, rawMetarToSVG } from "../src/MetarPlot"
import * as fs from 'fs';

/**
 * These Tests always pass they create a sample data to be viewed from the metars.json file
 * in tests/data/metars.json
 */

let rows: string = "";
let metars : Array<MetarPlot> = require("./data/metars.json")
let rawMetars: Array<any> = require("./data/rawMetars.json")
before(() => {
    fs.mkdir("./coverage/image-debug/", () => { return })
})

after(() => {
    let content = `<table>${rows}</table>`
    writeHtml("coverage/image-debug/generated.html", content)
})

describe('Generate Images', () => {
    it("Gen Images - Metar Plots", () => {
        metars.forEach(
            (metar: MetarPlot) => {
                let svg = metarToSVG(metar)
                addRow(metar, svg)
            }
        )
    })
})

describe('Generate Images', () => {
    it("Gen Images - Raw Metar", () => {
        rawMetars.forEach(
            (metar: any) => {
                let svg = rawMetarToSVG(metar.raw)
                addRow(metar.raw, svg)
            }
        )
    })
})

function addRow(metar: MetarPlot, svg: string) {
    rows += `<tr><td><pre>${JSON.stringify(metar, null, 1)}</pre></td><td>${svg}</td></tr>`
}

function writeHtml(filename: string, content: string) {
    let html =
        `<!DOCTYPE html>
    <html lang="en">
        <head><title></title></head><body>${content}</body>
    </html>`
    fs.writeFileSync(filename, html);
}