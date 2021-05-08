import { getWeatherSVG, weather} from "../src/Weather"
import * as fs from 'fs';

/**
 * Programatically tests the exsistance of the right svg elements
 * it does not ensure that those elements look correct so a html file with 
 * all generated test data is created and stored in coverage/image-debug/barbs.html
 */

let rows: string = "";
before(async () => {
    await fs.mkdir("./coverage", () => { return })
    await fs.mkdir("./coverage/image-debug", () => { return })
})

after(() => {
    let content = `<table>${rows}</table>`
    writeHtml("coverage/image-debug/weather.html", content)
})

describe('Test Weather Icons', () => {
    it("icon permutations", () => {
        Object.keys(weather).forEach( 
            (wx) =>
            {
                addRow(wx, getWeatherSVG(wx))
            })
        
    })
})

function addRow(wx: string, svg: string) {
    rows += `<tr><td><pre>${wx}</pre></td><td>${svg}</td></tr>`
}

function writeHtml(filename: string, content: string){
    let html = 
    `<!DOCTYPE html>
    <html lang="en">
        <head><title></title></head><body>${content}</body>
    </html>`
    fs.writeFileSync(filename, html);
}