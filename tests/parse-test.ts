import { METAR, parseClouds, parseWeather, parseAltimeter } from "../src/Metar"
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
                    errors[metar.raw] = error
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
                "METAR KJCT 120951Z AUTO 05011KT 3SM BR FC +RA OVC006 M02/M04 A3013 RMK AO2 SLP201 I1000 T10221044",
                "METAR KBAZ 120951Z AUTO 02015G22KT 1/2SM -FZRA SCT007 A3011 RMK AO2 PK WND 02027/0922 RAB25E32FZRAB32 SLPNO P0000 I1002 $"
            ]
        let keys =
            [
                [],
                [{ "abbreviation": "+RA", "meaning": "Heavy Rain" }],
                [{ "abbreviation": "BR", "meaning": "Mist or light fog" }, { "abbreviation": "FC", "meaning": "Funnel Cloud/Tornado" }],
                [{ "abbreviation": "BR", "meaning": "Mist or light fog" }, { "abbreviation": "FC", "meaning": "Funnel Cloud/Tornado" }, { "abbreviation": "+RA", "meaning": "Heavy Rain" }],
                [{ "abbreviation": "-FZRA", "meaning": "Light Freezing Rain"}]
            ]
        for (let i = 0; i < metars.length; i++) {
            let exp = JSON.stringify(keys[i])
            let rst = JSON.stringify(parseWeather(metars[i]))
            assert(exp === rst, `Exp is not equal result\nMEATR: ${metars[i]}\nEXP:${exp}\nRST:${rst}`)
        }
    })
    it("Parse Clouds", () => {
        let metars =
            [
                "METAR KVDF 120935Z AUTO RMK AO2 PWINO",
                "METAR KLQK 120955Z AUTO 07007KT 10SM +RA OVC007 04/04 A3005 RMK AO2 T00370037",
                "METAR KJCT 120951Z AUTO 05011KT 3SM BR OVC006 FEW020 M02/M04 A3013 RMK AO2 SLP201 I1000 T10221044",
                "METAR KJCT 120951Z AUTO 05011KT 3SM BR OVC006 FEW040 SCT100 M02/M04 A3013 RMK AO2 SLP201 I1000 T10221044"
            ]
        let keys =
            [
                [],
                [{ "abbreviation": "OVC", "meaning": "overcast", "altitude": 700 }],
                [{ "abbreviation": "OVC", "meaning": "overcast", "altitude": 600 }, { "abbreviation": "FEW", "meaning": "few", "altitude": 2000 }],
                [{ "abbreviation": "OVC", "meaning": "overcast", "altitude": 600 }, { "abbreviation": "FEW", "meaning": "few", "altitude": 4000 }, { "abbreviation": "SCT", "meaning": "scattered", "altitude": 10000 }]
            ]
        for (let i = 0; i < metars.length; i++) {
            let exp = JSON.stringify(keys[i])
            let rst = JSON.stringify(parseClouds(metars[i]))
            assert(exp === rst, `Exp is not equal result\nEXP:${exp}\nRST:${rst}`)
        }
    })
    it("Parse pressure", () => {
        let metars =
            [
                "METAR KVDF 120935Z AUTO RMK Q1005 AO2 PWINO",
                "METAR KLQK 120955Z AUTO 07007KT 10SM +RA OVC007 04/04 A3005 RMK AO2 T00370037"
            ]
        let keys =
            [
                29.68,
                30.05
            ]
        for (let i = 0; i < metars.length; i++) {
            let exp = JSON.stringify(keys[i])
            let rst = JSON.stringify(parseAltimeter(metars[i]))
            assert(exp === rst, `Exp is not equal result\nEXP:${exp}\nRST:${rst}`)
        }
    })
})

