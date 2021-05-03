import { METAR } from "../src/Metar"
import * as fs from 'fs';

/**
 * This tests parsing of the Metars
 */

let metars = require("./data/rawMetars.json")
let results = new Array<METAR>()

before( () => {
    fs.mkdir("./coverage/parse/", () => { return })
})

after( () => {
    fs.writeFileSync("./coverage/parse/results.json", JSON.stringify(results, null, 1))
})

describe('Test Parse of METARs', () => {
    it("Parse Tests", () => {
        metars.forEach(
            (metar: any) => {
                let result = new METAR(metar.raw)
                results.push(result)
            }
        )
    })
})

