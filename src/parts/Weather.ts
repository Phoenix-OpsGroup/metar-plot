/**
 * Weather Descriptor
 */
 export class Weather {
    //Raw data code
    public abbreviation?: string;
    //Human readable text
    public meaning?: string;
}
/**
 * Returns a SVG icon for the weather key provided
 * @param key weather abbriviation
 * @returns 
 */
 export function getWeatherSVG(key: string): string {
    const weather = WEATHER[key] != null ? WEATHER[key].svg : "";
    return `<svg width="65" height="65" viewBox="0 0 500 500" x="140" y="220">
                <style>
                    .wx_text{ 
                        color: black;
                        font-size: 400px;
                        font-family: "Noto Sans";
                        white-space: pre;
                    }
                    .snow{ 
                        color: black;
                        font-size: 300px;
                        font-family: "Noto Sans";
                        white-space: pre;
                    }
                    .wx_graphic {
                        stroke: black;
                        fill: none;
                        stroke-width: 30
                    }

                    .wx_graphic_thin {
                        stroke: black;
                        fill: none;
                        stroke-width: 5
                    }

                </style>
                ${weather}
            </svg>`
}

const BRK_DWN_ARW = 
    `<line class="wx_graphic" x1="350" y1="50" x2="175" y2="250"></line>
    <line class="wx_graphic" x1="170" y1="245" x2="350" y2="415"></line>
    <line class="wx_graphic" x1="350" y1="415" x2="250" y2="415"></line>
    <line class="wx_graphic" x1="350" y1="425" x2="350" y2="315"></line>`

const DWN_TRI = 
    `<polygon style="stroke: black" points="150 160 350 160 250 475"></polygon>`
/*
SVG Icons
*/

//DUST OR SAND
const sine =
    `<path style="fill: none; stroke: black; stroke-width: 10;" d="M 216.17 233.33 C 215.262 200.358 184.821 179.749 160.469 196.236 C 149.167 203.887 142.205 218.026 142.205 233.33"></path>
    <path style="fill: none; stroke: black; stroke-width: 10;" d="M 293.922 221.457 C 293.922 253.281 260.978 273.173 234.622 257.26 C 222.391 249.874 214.857 236.229 214.857 221.457"></path>`
//Smoke or volcanic ash
const FU_VA =
    `<g id="FU_VA">
        <line class="wx_graphic" x1="100" y1="150" x2="100" y2="400"></line>
        <path class="wx_graphic" d="M 100 150 C 115 75 185 75 200 150"></path>
        <path class="wx_graphic" d="M 200 150 C 215 215 285 215 300 150"></path>
        <path class="wx_graphic" d="M 300 150 C 315 75 380 75 400 150"></path>
    </g>`
//Haze
const HZ =
    `<g id="HZ">
        <text class="snow" x="100" y="365">♾️</text>
    </g>`
//Dust or Sand
const DU_SA =
    `<g id="DU_SA">
        <text class="wx_text" x="160" y="360">S</text>
    </g>`
//Blowing dust or sand
const BLDU_BLSA =
    `<g id="BLDU_BLSA">
        <text class="wx_text" x="160" y="360">$</text>
    </g>`
//Dust Devil
const PO = 
    `<g id="PO">
      <text style="fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 250px; white-space: pre;" x="50" y="225">(●)</text>
    </g>`
//Vicinity sand storm
const VCSS =
    `<g id="VCSS">
        <text class="wx_text" x="50" y="360">($)</text>
        <line class="wx_graphic_thin" x1="50" y1="250" x2="450" y2="250" ></line>
        <line class="wx_graphic_thin" x1="450" y1="250" x2="420" y2="230"></line>
        <line class="wx_graphic_thin" x1="450" y1="250" x2="420" y2="270"></line>
    </g>`
//FOG OR SPEACIAL WEATHER

//Mist or light fog
const BR =
    `<g id="BR">
        <line class="wx_graphic" x1="50" y1="200" x2="450" y2="200"></line>
        <line class="wx_graphic" x1="50" y1="300" x2="450" y2="300"></line>
    </g>`
//More or less continuous shallow fog
const MIFG =
    `<g id="MIFG">
        <line class="wx_graphic" x1="50" y1="200" x2="200" y2="200"></line>
        <line class="wx_graphic" x1="300" y1="200" x2="450" y2="200"></line>
        <line class="wx_graphic" x1="50" y1="300" x2="450" y2="300"></line>
    </g>
    `
//Vicinity thunderstorm
const VCTS = `<g id="VCTS">${BRK_DWN_ARW}</g>`
//Virga or precipitation not hitting ground
const VIRGA = 
    `<g id="VIGRA">
        <text transform="matrix(0, -1, 1, 0, 366.40625, 389.09375)" style="fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 300px; white-space: pre;" dx="-5.079 -9.094" dy="-40.192 0.51">(●</text>
    </g>`
//Vicinity showers
const VCSH =
    `<g id="VCSS">
        <text class="wx_text" x="50" y="360">( )</text>
        <circle style="fill: black" cx="230" cy="260" r="50"></circle>
    </g>`
//Thunderstorm with or without precipitation
const TS = 
    `<g id="TS">
        ${BRK_DWN_ARW}
        <line class="wx_graphic" x1="355" y1="50" x2="50" y2="50"></line>
        <line class="wx_graphic" x1="60" y1="50" x2="60" y2="440"></line>
    </g>
    `
//Squalls
const SQ = 
    `<g id="SQ">
        <line class="wx_graphic" x1="250" y1="450" x2="150" y2="50"></line>
        <line class="wx_graphic" x1="150" y1="50" x2="250" y2="125"></line>
        <line class="wx_graphic" x1="250" y1="125" x2="350" y2="50"></line>
        <line class="wx_graphic" x1="350" y1="50" x2="250" y2="450"></line>
    </g>`
//Funnel cloud or tornado
const FC = 
    `<g id="FC">
        <line class="wx_graphic" x1="200" y1="100" x2="200" y2="400"></line>
        <line class="wx_graphic" x1="300" y1="100" x2="300" y2="400"></line>
        <line class="wx_graphic" x1="300" y1="100" x2="375" y2="50"></line>
        <line class="wx_graphic" x1="300" y1="400" x2="375" y2="450"></line>
        <line class="wx_graphic" x1="200" y1="400" x2="125" y2="450"></line>
        <line class="wx_graphic" x1="200" y1="100" x2="125" y2="50"></line>
    </g>
    `

//BLOWING WEATHER

//Sand or dust storm
const SS =
    `<g id="SS">
        <text class="wx_text" x="160" y="360">S</text>
        <line class="wx_graphic_thin" x1="50" y1="250" x2="450" y2="250" ></line>
        <line class="wx_graphic_thin" x1="450" y1="250" x2="420" y2="230"></line>
        <line class="wx_graphic_thin" x1="450" y1="250" x2="420" y2="270"></line>
    </g>`
//Strong sand or dust storm
const PLUS_SS =
    `<g ="+SS">
        <text class="wx_text" x="160" y="360">S</text>
    </g>`
//Blowing snow
const BLSN = 
    `<g id="BLSN">
        <text x="338.947" y="264.945" style="white-space: pre; fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 300px;" 
        transform="matrix(0, -1, 1, 0, 101.453125, 738.945313)">→<tspan x="338.9469909667969" dy="1em">​</tspan></text>
        <text style="font-size: 300px; font-family: Roboto; white-space: pre;" x="100" y="352.578">→</text>
    </g>`
//Drifting snow
const DRSN = 
    `<g id="DRSN">
        <text style="font-size: 300px; font-family: Roboto; white-space: pre;" x="100" y="352.578">→</text>
        <text x="338.947" y="264.945" style="white-space: pre; fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; 
        font-size: 300px;" transform="matrix(0, 1, -1, 0, 398.546875, -238.945312)">→<tspan x="338.9469909667969" dy="1em">​</tspan></text>
    </g>
    `
//FOG//////////////////////////////////////////////

//Vicinity fog
const VCFG =
    `<g id="VCFG">
        <line class="wx_graphic" x1="75" y1="150" x2="425" y2="150"></line>
        <line class="wx_graphic" x1="75" y1="250" x2="425" y2="250"></line>
        <line class="wx_graphic" x1="75" y1="350" x2="425" y2="350"></line>
        <path class="wx_graphic" d="M 60 135 C 15 165 15 335 65 365"></path>
        <path class="wx_graphic" d="M 435 135 C 485 150 500 345 435 365"></path>
    </g>`
//Patchy fog
const BCFG =
    `<g id="BCFG">
        <line class="wx_graphic" x1="50" y1="150" x2="150" y2="150"></line>
        <line class="wx_graphic" x1="350" y1="150" x2="450" y2="150"></line>
        <line class="wx_graphic" x1="50" y1="250" x2="450" y2="250"></line>
        <line class="wx_graphic" x1="50" y1="350" x2="150" y2="350"></line>
        <line class="wx_graphic" x1="350" y1="350" x2="450" y2="350"></line>
    </g>`
//Fog, sky discernable
const PRFG =
    `<g id="BCFG">
        <line class="wx_graphic" x1="50" y1="150" x2="150" y2="150"></line>
        <line class="wx_graphic" x1="350" y1="150" x2="450" y2="150"></line>
        <line class="wx_graphic" x1="50" y1="250" x2="450" y2="250"></line>
        <line class="wx_graphic" x1="50" y1="350" x2="450" y2="350"></line>
    </g>`
//Fog, sky undiscernable
const FG =
    `<g id="FG">
        <line class="wx_graphic" x1="50" y1="150" x2="450" y2="150"></line>
        <line class="wx_graphic" x1="50" y1="250" x2="450" y2="250"></line>
        <line class="wx_graphic" x1="50" y1="350" x2="450" y2="350"></line>
    </g>`
//Freezing fog
const FZFG =
    `<g id="FG">
        <line class="wx_graphic" x1="50" y1="150" x2="450" y2="150"></line>
        <line class="wx_graphic" x1="50" y1="250" x2="450" y2="250"></line>
        <line class="wx_graphic" x1="50" y1="350" x2="450" y2="350"></line>
        <line class="wx_graphic" x1="50" y1="150" x2="250" y2="350"></line>
        <line class="wx_graphic" x1="450" y1="150" x2="250" y2="350"></line>
    </g>`

//Drizzle

//Light drizzle
const MIN_DZ =
    `<g id="-DZ">
        <text class="wx_text" x="130" y="240">,,</text>
    </g>`
//Moderate drizzle
const DZ =
    `<g id="RA">
        <text class="wx_text" x="130" y="285">,,</text>
        <text class="wx_text" x="170" y="175">,</text>
    </g>`
//Heavy drizzle
const PLUS_DZ =
    `<g id="RA">
        <text class="wx_text" x="130" y="240">,,</text>
        <text class="wx_text" x="170" y="145">,</text>
        <text class="wx_text" x="170" y="320">,</text>
    </g>`
//Light freezing drizzle
const MIN_FZDZ =
    `<g id="-DZ">
        <text class="wx_text" x="130" y="240">,</text>
        ${sine}
    </g>`
//Moderate to heavy freezing drizzle
const FZDZ =
    `<g id="-DZ">
        <text class="wx_text" x="130" y="240">,,</text>
        ${sine}    
    </g>`
//Light drizzle and rain
const MIN_DZRA = 
    `<g id="MIN_DZRA>
        <text style="fill: rgb(51, 51, 51); font-family: Georgia; font-size: 300px; white-space: pre;" x="198.442" y="348.054" dx="0.743" dy="-39.081">,</text>
        <text style="fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 100px; white-space: pre;" x="313.598" y="154.93" dx="-105.782" dy="92.343">●</text>
    </g>`
//Moderate to heavy drizzle and rain
const DZRA = 
    `<g id="MIN_DZRA>
        <text x="198.442" y="348.054" style="white-space: pre; fill: rgb(51, 51, 51); font-family: &quot;Georgia&quot;; font-size: 300px;">,</text>
        <text style="fill: rgb(51, 51, 51); font-family: Georgia; font-size: 300px; white-space: pre;" x="200.662" y="301.835" dx="-0.441" dy="-136.772">,</text>
        <text style="fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 100px; white-space: pre;" x="313.598" y="154.93" dx="-106.683" dy="133.71">●</text>
    </g>`

//RAIN

//Light rain
const MIN_RA =
    `<g id="-RA">
        <text class="wx_text" x="130" y="240">..</text>
    </g>`
//Moderate rain
const RA =
    `<g id="RA">
        <text class="wx_text" x="130" y="285">..</text>
        <text class="wx_text" x="170" y="175">.</text>
    </g>`
//Heavy rain
const PLUS_RA =
    `<g id="RA">
        <text class="wx_text" x="130" y="240">..</text>
        <text class="wx_text" x="170" y="145">.</text>
        <text class="wx_text" x="170" y="320">.</text>
    </g>`
//Light freezing rain
const MIN_FZRA =
    `<g id="-RA">
        <text class="wx_text" x="130" y="240">.</text>
        ${sine}
    </g>`
//Moderate to heavy freezing rain
const FZRA =
    `<g id="-RA">
    <text class="wx_text" x="130" y="240">..</text>
    ${sine}
    </g>`
//Light rain and snow
const MIN_RASN =
    `<g id="MIN_RASN">
        <text style="fill: rgb(51, 51, 51); font-family: Georgia; font-size: 200px; white-space: pre;" x="198.442" y="348.054" dx="-0.648" dy="82.18">*</text>
        <text style="fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 200px; white-space: pre;" x="313.598" y="154.93" dx="-129.822" dy="98.015">●</text>
    </g>`
//Moderate to heavy rain and snow
const RASN = 
    `<g id="RASN">
        <text style="fill: rgb(51, 51, 51); font-family: Georgia; font-size: 200px; white-space: pre;" x="198.442" y="348.054" dx="6.111" dy="137.208">*</text>
        <text style="fill: rgb(51, 51, 51); font-family: &quot;Roboto Slab&quot;; font-size: 200px; white-space: pre;" x="313.598" y="154.93" dx="-124.964" dy="158.382">●</text>
        <text transform="matrix(1, 0, 0, 1, 11.82478, 80.656288)" style="fill: rgb(51, 51, 51); font-family: Georgia; font-size: 200px; white-space: pre;" x="198.442" y="348.054" dx="-10.654" dy="-182.434">*</text>
    </g>`
//SNOW and MISC FROZEN PERCIP

//Light snow
const MIN_SN =
    `<g id="-SN">
        <text class="snow" x="50" y="370">**</text>
    </g>
    `
//Moderate snow
const SN =
    `<g id="SN">
        <text class="snow" x="50" y="460">**</text>
        <text class="snow" x="120" y="325">*</text>
    </g>`
//Heavy snow
const PLUS_SN =
    `<g id="+SN">
        <text class="snow" x="50" y="460">**</text>
        <text class="snow" x="120" y="325">*</text>
        <text class="snow" x="120" y="580">*</text>
    </g>`
//Snow grains
const SG = 
    `<g id="SG">
        <polygon class="wx_graphic" points="250 150 150 300 350 300"></polygon>
        <line class="wx_graphic" x1="50" y1="230" x2="197" y2="230"></line>
        <line class="wx_graphic" x1="303" y1="230" x2="450" y2="230"></line>
    </g>`
//Ice crystals
const IC = 
    `<g id="IC">
        <line class="wx_graphic" x1="50" y1="250" x2="450" y2="250"></line>
        <line class="wx_graphic" x1="175" y1="175" x2="325" y2="325"></line>
        <line class="wx_graphic" x1="325" y1="175" x2="174" y2="325"></line>  
    </g>`
//Ice pellets
const PE_PL = 
    `<g id="PE_PL">
      <polygon class="wx_graphic" points="250 150 150 300 350 300"></polygon>
      <text style="fill: black; font-size: 100px;" x="237.271" y="242.526" dx="-18.412" dy="32.137">●</text>
    </g>`
//SHOWERY PERCIPITATION

//Light rain showers
const MIN_SHRA = 
    `<g id="MIN_SHRA">
        <polygon class="wx_graphic"  points="150 160 350 160 250 475"></polygon>
        <text x="190" y="140" style="font-size: 200px;">●</text>
    </g>`
//Moderate to heavy rain showers
const SHRA = ""
//Light rain and snow showers
const MIN_SHRASN = ""
//Moderate to heavy rain and snow showers
const SHRASN = ""
//Light snow showers
const MIN_SHSN = ""
//Moderate to heavy snow showers
const SHSN = ""
//Light showers with hail, not with thunder
const MIN_GR = ""
//Moderate to heavy showers with hail, not with thunder
const GR = ""

// THUNDERSTORMS

//Light to moderate thunderstorm with rain
const TSRA = ""
//Light to moderate thunderstorm with hail
const TSGR = ""
//Thunderstorm with heavy rain
const PLUS_TSRA = ""

/**
 * Map of weather abbriviation to SVG data and Full text
 */
 export const WEATHER: any = {
    "FU": { svg: FU_VA, text: "Smoke" },
    "VA": { svg: FU_VA, text: "Volcanic Ash" },
    "HZ": { svg: HZ, text: "Haze" },
    "DU": { svg: DU_SA, text: "Dust" },
    "SA": { svg: DU_SA, text: "Sand" },
    "BLDU": { svg: BLDU_BLSA, text: "Blowing Dust" },
    "BLDA": { svg: BLDU_BLSA, text: "Blowing Sand" },
    "PO": { svg: PO, text: "Dust Devil" },
    "VCSS": { svg: VCSS, text: "Vicinity Sand Storm" },
    "BR": { svg: BR, text: "Mist or light fog" },
    "MIFG": { svg: MIFG, text: "Continuous Shallow Fog" },
    "VCTS": { svg: VCTS, text: "Vicinity Thunderstorm" },
    "VIRGA": { svg: VIRGA, text: "Virga" },
    "VCSH": { svg: VCSH, text: "Vicinity showers" },
    "TS": { svg: TS, text: "Thunderstorm" },
    "SQ": { svg: SQ, text: "Squall" },
    "FC": { svg: FC, text: "Funnel Cloud/Tornado"},
    "SS": { svg: SS, text: "Sand/Dust Storm" },
    "+SS": { svg: PLUS_SS, text: "Strong Sand/Dust Storm" },
    "BLSN": { svg: BLSN, text: "Blowing Snow" },
    "DRSN": { svg: DRSN, text: "Drifting Snow" },
    "VCFG": { svg: VCFG, text: "Vicinity Fog" },
    "BCFG": { svg: BCFG, text: "Patchy Fog" },
    "PRFG": { svg: PRFG, text: "Fog, Sky Discernable" },
    "FG": { svg: FG, text: "Fog, Sky Undiscernable" },
    "FZFG": { svg: FZFG, text: "Freezing Fog" },
    "-DZ": { svg: MIN_DZ, text: "Light Drizzle" },
    "DZ": { svg: DZ, text: "Moderate Drizzle" },
    "+DZ": { svg: PLUS_DZ, text: "Heavy Drizzle" },
    "-FZDZ": { svg: MIN_FZDZ, text: "Light Freezing Drizzle" },
    "FZDZ": { svg: FZDZ, text: "Moderate Freezing Drizzle" },
    "+FZDZ": { svg: FZDZ, text: "Heavy Freezing Drizzle" },
    "-DZRA": { svg: MIN_DZRA, text: "Light Drizzle & Rain" },
    "DZRA": { svg: DZRA, text: "Moderate to Heavy Drizzle & Rain" },
    "-RA": { svg: MIN_RA, text: "Light Rain" },
    "RA": { svg: RA, text: "Moderate Rain" },
    "+RA": { svg: PLUS_RA, text: "Heavy Rain" },
    "-FZRA": { svg: MIN_FZRA, text: "Light Freezing Rain" },
    "FZRA": { svg: FZRA, text: "Moderate Freezing Rain" },
    "+FZRA": { svg: FZRA, text: "Heavy Freezing Rain" },
    "-RASN": { svg: MIN_RASN, text: "Light Rain & Snow" },
    "RASN": { svg: RASN, text: "Moderate Rain & Snow" },
    "+RASN": { svg: RASN, text: "Heavy Rain & Snow" },
    "-SN": { svg: MIN_SN, text: "Light Snow" },
    "SN": { svg: SN, text: "Moderate Snow" },
    "+SN": { svg: PLUS_SN, text: "Heavy Snow" },
    "SG": { svg: SG, text: "Snow Grains" },
    "IC": { svg: IC, text: "Ice Crystals" },
    "PE": { svg: PE_PL, text: "Ice Pellets" },
    "PL": { svg: PE_PL, text: "Ice Pellets" }
}

const RECENT_WEATHER: any = {
    REBLSN: "Moderate/heavy blowing snow (visibility significantly reduced)reduced",
    REDS: "Dust Storm",
    REFC: "Funnel Cloud",
    REFZDZ: "Freezing Drizzle",
    REFZRA: "Freezing Rain",
    REGP: "Moderate/heavy snow pellets",
    REGR: "Moderate/heavy hail",
    REGS: "Moderate/heavy small hail",
    REIC: "Moderate/heavy ice crystals",
    REPL: "Moderate/heavy ice pellets",
    RERA: "Moderate/heavy rain",
    RESG: "Moderate/heavy snow grains",
    RESHGR: "Moderate/heavy hail showers",
    RESHGS: "Moderate/heavy small hail showers",
    // RESHGS: "Moderate/heavy snow pellet showers", // dual meaning?
    RESHPL: "Moderate/heavy ice pellet showers",
    RESHRA: "Moderate/heavy rain showers",
    RESHSN: "Moderate/heavy snow showers",
    RESN: "Moderate/heavy snow",
    RESS: "Sandstorm",
    RETS: "Thunderstorm",
    REUP: "Unidentified precipitation (AUTO obs. only)",
    REVA: "Volcanic Ash",
};