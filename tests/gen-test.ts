import { MetarPlot, metarToSVG, rawMetarToSVG } from "../src/MetarPlot"
import * as fs from 'fs';
import { assert } from 'chai';
const WIDTH = "100"
const HEIGHT = "100"
/**
 * These Tests always pass they create a sample data to be viewed from the metars.json file
 * in tests/data/metars.json
 */

let rows: string = "";
let metars : Array<MetarPlot> = require("./data/metars.json")
let rawMetars: Array<any> = require("./data/rawMetars.json")

before(async () => {
    await fs.mkdir("./coverage", () => { return })
    await fs.mkdir("./coverage/image-debug", () => { return })
})

after(() => {
    let content = `<table>${rows}</table>`
    writeHtml("coverage/image-debug/generated.html", content)
})

describe('Generate Images', () => {
    it("Gen Images - Metar Plots", () => {
        metars.forEach(
            (metar: MetarPlot) => {
                let svg = metarToSVG(metar, WIDTH, HEIGHT)
                addRow(metar, svg)
            }
        )
    })
})

describe('Generate Images', () => {
    it("Gen Images - Raw Metar", () => {
        let errors : any = {}
        rawMetars.forEach(
            (metar: any) => {
                try{
                    let svg = rawMetarToSVG(metar.raw, WIDTH, HEIGHT)
                    addRow(metar.raw, svg)
                }catch(error){
                    errors[metar.raw] = error.message
                }
            }
        )
        assert(Object.keys(errors).length === 0, `Error Parsing the following metars:\n${JSON.stringify(errors, null, 1)}`)
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