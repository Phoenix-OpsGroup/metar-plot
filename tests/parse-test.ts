import { METAR } from "../src/Metar"
import { assert } from "chai"
import * as fs from 'fs';

/**
 * This tests parsing of the Metars
 */

let metars = require("./data/rawMetars.json")
let results = new Array<METAR>()

before(async () => {
    if (fs.existsSync("./coverage") === false) {
        fs.mkdirSync("./coverage")
    }
    if (fs.existsSync("./coverage/parse") === false) {
        fs.mkdirSync("./coverage/parse")
    }
})

after(() => {
    fs.writeFileSync("./coverage/parse/results.json", JSON.stringify(results, null, 1))
})

describe('Test Parse of METARs', () => {
    it("Parse Tests", () => {
        let errors: any = {}
        metars.forEach(
            (metar: any) => {
                try {
                    let result = new METAR(metar.raw)
                    results.push(result)
                } catch (error) {
                    console.log(error)
                    errors[metar.raw] = error.message
                }
            }
        )
        assert(Object.keys(errors).length === 0, `Error Parsing the following metars:\n${JSON.stringify(errors, null, 1)}`)
    })
})

