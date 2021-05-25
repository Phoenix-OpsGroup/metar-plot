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

const size = "100px";

//clear
const CLR = 
    `<g id="clr">
        <rect width="${size}" height="${size} class="coverage"/>
    </g>`

//Cloud abbreviation map
export const CLOUDS: any = {
    NCD: {svg: CLR, text: "no clouds", rank: 0},
    SKC: {svg: "", text: "sky clear", rank: 0},
    CLR: {svg: "", text: "no clouds under 12,000 ft", rank: 0},
    NSC: {svg: "", text: "no significant", rank: 0},
    FEW: {svg: "", text: "few", rank: 1},
    SCT: {svg: "", text: "scattered", rank: 2 },
    BKN: {svg: "", text: "broken", rank: 3},
    OVC: {svg: "", text: "overcast", rank: 4},
    VV: {svg: "", text: "vertical visibility", rank: 5},
};