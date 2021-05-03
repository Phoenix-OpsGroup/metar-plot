import { MetarPlot, metarToSVG } from "../src/MetarPlot"
import { assert } from 'chai';
import * as fs from 'fs';

/**
 * Programatically tests the exsistance of the right svg elements
 * it does not ensure that those elements look correct so a html file with 
 * all generated test data is created and stored in coverage/image-debug/barbs.html
 */

let rows: string = "";
before(() => {
    fs.mkdir("./coverage/image-debug/", () => {return})
})

after(() => {
    let content = `<table>${rows}</table>`
    writeHtml("coverage/image-debug/barbs.html", content)
})

describe('Test Wind Bard', () => {
    it("Calm", () => {
        let calmMetar = {wind_speed: 0}
        let svg: string = metarToSVG(calmMetar)
        addRow(calmMetar,svg)
        let calmPresent = svg.search("calm-marker") > 0 ? true : false
        let barbPresent = svg.search("windBard") > 0 ? false : true
        assert(calmPresent, "Calm Marker not present")
        assert(barbPresent, "Barb should not be there")
    })
    it("barb 1-9", () => {
        createTestData(1,9).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1") > 0 ? false : true
            let barb2 = svg.search("ws-bard-2-short") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 10-14", () => {
        createTestData(10,14).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2") > 0 ? false : true
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 15-19", () => {
        createTestData(15,19).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-short") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 20-24", () => {
        createTestData(20,24).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 25-29", () => {
        createTestData(25,29).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-short") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 30-34", () => {
        createTestData(30,34).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 35-39", () => {
        createTestData(35,39).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4-short") > 0 ? true : false
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 40-44", () => {
        createTestData(40,44).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4-long") > 0 ? true : false
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 45-49", () => {
        createTestData(45,49).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-long") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4-long") > 0 ? true : false
            let barb5 = svg.search("ws-bard-5-short") > 0 ? true : false
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb5, `Barb 5 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 50-54", () => {
        createTestData(50,54).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2") > 0 ? false : true
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 55-59", () => {
        createTestData(55,59).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-short") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 60-64", () => {
        createTestData(60,64).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3") > 0 ? false : true
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 65-69", () => {
        createTestData(65,69).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-short") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 70-74", () => {
        createTestData(70,74).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4") > 0 ? false : true
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 75-79", () => {
        createTestData(75,79).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar,svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4-short") > 0 ? true : false
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("barb 80-84", () => {
        createTestData(80,84).forEach(metar => {
            let svg: string = metarToSVG(metar)
            addRow(metar, svg)
            let barb1 = svg.search("ws-bard-1-flag") > 0 ? true : false
            let barb2 = svg.search("ws-bard-2-long") > 0 ? true : false
            let barb3 = svg.search("ws-bard-3-long") > 0 ? true : false
            let barb4 = svg.search("ws-bard-4-long") > 0 ? true : false
            assert(barb1, `Barb 1 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb2, `Barb 2 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb3, `Barb 3 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
            assert(barb4, `Barb 4 error\n\t${JSON.stringify(metar)}\n\t${svg}`)
        });
    })
    it("Barb with gust", () => {
        let metar : MetarPlot = {wind_speed: 25, gust_speed: 45}
        let svg: string = metarToSVG(metar)
            addRow(metar, svg)
    })
})

function addRow(metar: MetarPlot, svg: string) {
    rows += `<tr><td><pre>${JSON.stringify(metar, null, 1)}</pre></td><td>${svg}</td></tr>`
}

function createTestData(start: number, end: number): Array<MetarPlot>{
    let i: number;
    let metars : Array<MetarPlot> = new Array<MetarPlot>();
    for(i = start; i < end + 1; i++){
        metars.push({wind_speed: i})
    }
    return metars;
}

function writeHtml(filename: string, content: string){
    let html = 
    `<!DOCTYPE html>
    <html lang="en">
        <head><title></title></head><body>${content}</body>
    </html>`
    fs.writeFileSync(filename, html);
}