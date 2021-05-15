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
        <text class="wx_text" x="100" y="365">♾️</text>
    </g>`
//Dust or Sand
const DU_SA =
    `<g id-"DU_SA">
        <text class="wx_text" x="160" y="360">S</text>
    </g>
    `
//Blowing dust or sand
const BLDU_BLSA =
    `<g id-"BLDU_BLSA">
        <text class="wx_text" x="160" y="360">$</text>
    </g>`
//Dust Devil
const PO = ""
//Vicinity sand storm
const VCSS =
    `<g id-"VCSS">
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
const VCTS = ""
//Virga or precipitation not hitting ground
const VIRGA = ""
//Vicinity showers
const VCSH =
    `<g id-"VCSS">
        <text class="wx_text" x="50" y="360">( )</text>
        <circle style="fill: black" cx="180" cy="290" r="50"></circle>
    </g>`
//Thunderstorm with or without precipitation
const TS = ""
//Squalls
const SQ = ""
//Funnel cloud or tornado
const FC = ""

//BLOWING WEATHER

//Sand or dust storm
const SS =
    `<g id-"SS">
        <text class="wx_text" x="160" y="360">S</text>
        <line class="wx_graphic_thin" x1="50" y1="250" x2="450" y2="250" ></line>
        <line class="wx_graphic_thin" x1="450" y1="250" x2="420" y2="230"></line>
        <line class="wx_graphic_thin" x1="450" y1="250" x2="420" y2="270"></line>
    </g>`
//Strong sand or dust storm
const PLUS_SS =
    `<g id-"+SS">
        <text class="wx_text" x="160" y="360">S</text>
    </g>`
//Blowing snow
const BLSN = ""
//Drifting snow
const DRSN = ""

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
const MIN_DZRA = ``

//Moderate to heavy drizzle and rain
const DZRA = ``

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
const MIN_RASN = ""
//Moderate to heavy rain and snow
const RASN = ""

//SNOW and MISC FROZEN PERCIP

//Light snow
const MIN_SN =
    `<g id="-SN">
        <text class="wx_text" x="50" y="460">**</text>
    </g>
    `
//Moderate snow
const SN =
    `<g id="SN">
        <text class="wx_text" x="50" y="460">**</text>
        <text class="wx_text" x="120" y="325">*</text>
    </g>`
//Heavy snow
const PLUS_SN =
    `<g id="+SN">
        <text class="wx_text" x="50" y="460">**</text>
        <text class="wx_text" x="120" y="325">*</text>
        <text class="wx_text" x="120" y="580">*</text>
    </g>`
//Snow grains
const SG = ""
//Ice crystals
const IC = ""
//Ice pellets
const PE_PL = ""

//SHOWERY PERCIPITATION

//Light rain showers
const MIN_SHRA = ""
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

export const weather : any = {
    "FU" :FU_VA,
    "VA" :FU_VA,
    "HZ" :HZ,
    "DU" :DU_SA,
    "SA" :DU_SA,
    "BLDU": BLDU_BLSA,
    "BLDA": BLDU_BLSA,
    "PO": PO,
    "VCSS": VCSS,
    "BR": BR,
    "MIFG": MIFG,
    "VCTS": VCTS,
    "VIRGA": VIRGA,
    "VCSH": VCSH,
    "TS": TS,
    "SQ": SQ,
    "FC": FC,
    "SS": SS,
    "+SS": PLUS_SS,
    "BLSN": BLSN,
    "DRSN": DRSN,
    "VCFG": VCFG,
    "BCFG": BCFG,
    "PRFG": PRFG,
    "FG": FG,
    "FZFG": FZFG,
    "-DZ": MIN_DZ,
    "DZ": DZ,
    "+DZ": PLUS_DZ,
    "-FZDZ": MIN_FZDZ,
    "FZDZ": FZDZ,
    "+FZDZ": FZDZ,
    "-DZRA": MIN_DZRA,
    "DZRA": DZRA,
    "-RA": MIN_RA,
    "RA": RA,
    "+RA": PLUS_RA,
    "-FZRA": MIN_FZRA,
    "FZRA": FZRA,
    "+FZRA": FZRA,
    "-RASN": MIN_RASN,
    "RASN": RASN,
    "+RASN": RASN,
    "-SN": MIN_SN,
    "SN": SN,
    "+SN": PLUS_SN,
    "SG": SG,
    "IC": IC,
    "PE": PE_PL,
    "PL": PE_PL
}
export function getWeatherSVG(key: string): string {
    const WEATHER = weather[key] ?? "";
    return `<svg width="65" height="65" viewBox="0 0 500 500" x="160" y="220">
                <style>
                    .wx_text{ 
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
                ${WEATHER}
            </svg>`
}