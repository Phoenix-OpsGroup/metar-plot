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

describe('METAR Parse Tests', () => {
    it("Parse Test Data", () => {
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
    it("Parse weather", () => {
        let metars =
            [
                "METAR KVDF 120935Z AUTO RMK AO2 PWINO",
                "METAR KLQK 120955Z AUTO 07007KT 10SM +RA OVC007 04/04 A3005 RMK AO2 T00370037",
                "METAR KJCT 120951Z AUTO 05011KT 3SM BR FC OVC006 M02/M04 A3013 RMK AO2 SLP201 I1000 T10221044",
                "METAR KJCT 120951Z AUTO 05011KT 3SM BR FC +RA OVC006 M02/M04 A3013 RMK AO2 SLP201 I1000 T10221044"
            ]
        let keys =
            [
                [],
                [{
                    "abbreviation": "+RA",
                    "meaning": "Heavy Rain"
                }],
                [{
                    "abbreviation": "BR",
                    "meaning": "Mist or light fog"
                },
                {
                    "abbreviation": "FC",
                    "meaning": "Funnel Cloud"
                }
                ],
                [{
                    "abbreviation": "BR",
                    "meaning": "Mist or light fog"
                },
                {
                    "abbreviation": "FC",
                    "meaning": "Funnel Cloud"
                },
                {
                    "abbreviation": "+RA",
                    "meaning": "Heavy Rain"
                }
                ]
            ]
    })
})

