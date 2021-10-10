/**
 * Cloud Description
 */
export class Cloud {
    //Cloud description code
    public abbreviation?: string;
    //Human readable description
    public meaning?: string;
    //Altitude in ft
    public altitude?: number;
    //designates cumulonimbus
    public cumulonimbus?: boolean;
}

export const CONDITIONS: any = {
    //Visual Flight Rules
    VFR: "green",
    //Marginal Visual Flight Rules
    MVFR: "blue",
    //Instrument Flight Rules
    IFR: "red",
    //Low Instrument flight Rules
    LIFR: "purple"
}

const size = 25;
const piD = (size/2) * 3.14 * 2

//clear square
const CLR_SQUARE = 
    `<g id="clr">
        <rect width="${size}" height="${size}" x="calc(250 - ${size/2})" y="calc(250 - ${size/2})" class="coverage"/>
    </g>`
//clear circle
const CLR_CIRCLE =
    `<g id="clr">
        <circle cx="250" cy="250" r="${size}" fill="#00000000" class="coverage"/>
    </g>`
// Few clouds 25% coverage
const FEW =
    `<g id="few">
        <circle cx="250" cy="250" r="${size}" fill="#00000000" class="coverage"/>
        <circle cx="250" cy="250" r="${size/2}" fill="#00000000" 
        stroke-dasharray="0 calc(75 * ${piD} / 100) calc(25 * ${piD} / 100)"
        class="partial"/>
    </g>`
// Scattered clouds 50% coverage
const SCT =
`<g id="few">
    <circle cx="250" cy="250" r="${size}" fill="#00000000" class="coverage"/>
    <circle cx="250" cy="250" r="${size/2}" fill="#00000000" 
    stroke-dasharray="calc(25 * ${piD} / 100) calc(50 * ${piD} / 100) calc(25 * ${piD} / 100)"
    class="partial"/>
</g>`
// Broken clouds 75% coverage
const BRK =
`<g id="few">
    <circle cx="250" cy="250" r="${size}" fill="#00000000" class="coverage"/>
    <circle cx="250" cy="250" r="${size/2}" fill="#00000000" 
    stroke-dasharray="calc(49 * ${piD} / 100) calc(26 * ${piD} / 100) calc(25 * ${piD} / 100)"
    class="partial"/>
</g>`
// Overcast
const OVC =
`<g id="ovc">
    <circle cx="250" cy="250" r="${size}" class="ovc"/>
</g>`

//Cloud abbreviation map
export const CLOUDS: any = {
    NCD: {svg: CLR_CIRCLE, text: "no clouds", rank: 0},
    SKC: {svg: CLR_CIRCLE, text: "sky clear", rank: 0},
    CLR: {svg: CLR_CIRCLE, text: "no clouds under 12,000 ft", rank: 0},
    NSC: {svg: CLR_CIRCLE, text: "no significant", rank: 0},
    FEW: {svg: FEW, text: "few", rank: 1},
    SCT: {svg: SCT, text: "scattered", rank: 2 },
    BKN: {svg: BRK, text: "broken", rank: 3},
    OVC: {svg: OVC, text: "overcast", rank: 4},
    VV: {svg: OVC, text: "vertical visibility", rank: 5},
};

/**
 * Generates SVG for cloud coverage
 * @param coverage 
 * @param condition 
 * @returns 
 */
 export function genCoverage(coverage?: string, condition?: string): string {
    if (coverage != null && coverage !== "") {
        return `
            <style>
                .coverage{ 
                    stroke-width: 5; 
                    stroke: ${condition != null ? CONDITIONS[condition] : "black"};
                }
                .partial{
                    stroke-width: 25; 
                    stroke: ${condition != null ? CONDITIONS[condition] : "black"};
                }
                .ovc{
                    fill: ${condition != null ? CONDITIONS[condition] : "black"};
                }
            </style>
            ${CLOUDS[coverage].svg}`
    } else {
        return ""
    }
}