
//DUST OR SAND

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
    `<g id-"DU_SA">
        <text class="wx_text" x="160" y="360">$</text>
    </g>`
//Dust Devil
const PO = ""
//Vicinity sand storm
const VCSS = ""

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
const VCSH = ""
//Thunderstorm with or without precipitation
const TS = ""
//Squalls
const SQ = ""
//Funnel cloud or tornado
const FC = ""

//BLOWING WEATHER

//Sand or dust storm
const SS = ""
//Strong sand or dust storm
const PLUS_SS = ""
//Blowing snow
const BLSN = ""
//Drifting snow
const DRSN = ""

//FOG

//Vicinity fog
const VCFG = ""
//Patchy fog
const BCFG = ""
//Fog, sky discernable
const PRFG = ""
//Fog, sky undiscernable
const FG = ""
//Freezing fog
const FZFG = ""

//Drizzle

//Light rain
const MIN_RA = ""
//Moderate rain
const RA = ""
//Heavy rain
const PLUS_RA = ""
//Light freezing rain
const MIN_FZRA = ""
//Moderate to heavy freezing rain
const FZRA = ""
//Light rain and snow
const MIN_RASN = ""
//Moderate to heavy rain and snow
const RASN = ""

//SNOW and MISC FROZEN PERCIP

//Light snow
const MIN_SN = ""
//Moderate snow
const SN = ""
//Heavy snow
const PLUS_SN = ""
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

const weather = {
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
    const WEATHER = ""
    const svg = 
    `<svg width="65" height="65" viewBox="0 0 500 500" x="160" y="220">
        <style>
            .wx_text{ 
                color: black;
                font-size: 300px;
                font-family: sans-serif;
            }
            .wx_graphic {
                stroke: black;
                fill: none;
                stroke-width: 30
            }
        </style>
        ${WEATHER}
    </svg>`
    return svg
    
}