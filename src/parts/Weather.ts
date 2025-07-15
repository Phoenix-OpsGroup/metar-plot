import { MetarPlotOptions } from "../MetarPlot";

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
 * Returns SVG icon 
 * @param key weather abbriviation
 */
export function getWeatherSVG(key: string, options?: MetarPlotOptions) : string {
    const weather = WEATHER[key] != null ? WEATHER[key].svg : "";
    return `<svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 500 500" x="140" y="220">
                <style>
                    .wx_graphic {
                        stroke: ${options?.symbol_color ?? "black"};
                        fill: none;
                        stroke-width: 30
                    }
                    .wx_graphic_fill {
                        stroke: ${options?.symbol_color ?? "black"};
                        fill: ${options?.symbol_color ?? "black"};
                        stroke-width: 30
                    }
                </style>
                ${weather}
            </svg>`
}

/**
 * Returns a raw base64 src for img tag
 * @param key 
 * @returns 
 */
export function getWeatherImgSrc(key: string, options?: MetarPlotOptions): string {
    const weather = WEATHER[key] != null ? WEATHER[key].svg : "";
    let data = btoa(unescape(encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 500 500">
                <style>
                    .wx_graphic {
                        stroke: ${options?.symbol_color ?? "black"};
                        fill: none;
                        stroke-width: 30
                    }
                    .wx_graphic_fill {
                        stroke: ${options?.symbol_color ?? "black"};
                        fill: ${options?.symbol_color ?? "black"};
                        stroke-width: 30
                    }
                    
                </style>
                ${weather}
            </svg>`)))
    return `data:image/svg+xml;base64,${data}`
}

const BRK_DWN_ARW =
    `<line class="wx_graphic" x1="350" y1="50" x2="175" y2="250"></line>
    <line class="wx_graphic" x1="170" y1="245" x2="350" y2="415"></line>
    <line class="wx_graphic" x1="350" y1="415" x2="250" y2="415"></line>
    <line class="wx_graphic" x1="350" y1="425" x2="350" y2="315"></line>`

const RIGHT_ARROW =
    `<line class="wx_graphic" x1="120" y1="250" x2="430" y2="250"></line>
    <line class="wx_graphic" x1="380" y1="250" x2="465" y2="250" transform="rotate(-45, 450, 250)"></line>
    <line class="wx_graphic" x1="380" y1="250" x2="450" y2="250" transform="rotate(45, 450, 250)"></line>`

const COMMA =
    `<ellipse
      class="wx_graphic_fill"
      cx="238"
      cy="178"
      rx="88"
      ry="87" />
    <path
      class="wx_graphic"
      d="m 174,335 c 9,2 19,3 30,3 h 2 c 56,0 101,-34 101,-76 v -68 c 0,-42 -45,-76 -101,-76 h -2" />`

const STAR =
    `<rect
        class="wx_graphic_fill"
        width="50"
        height="350"
        x="225"
        y="-25" />
    <rect
        class="wx_graphic_fill"
        width="50"
        height="350"
        x="235"
        y="-300"
        transform="rotate(55)" />
    <rect
        class="wx_graphic_fill"
        width="50" height="350"
        x="-10" y="115"
        transform="rotate(-55)" />`

const DWN_TRI =
`<path
    class="wx_graphic" 
    style="stroke-linecap:butt;stroke-linejoin:round"
    d="M 245,420 175,150 320,146 Z" />`

const DWN_TRI_SMALL = 
    `<path
        class="wx_graphic"
        style="stroke-linecap:butt;stroke-linejoin:round"
        d="M 240,435 190,275 290,275 Z"/>`

const SINE =
    `<g>
        <path
            class="wx_graphic" 
            d="m 430,230 a 85,90 0 0 1 -45,80 85,90 0 0 1 -85,0 85,90 0 0 1 -45,-80"/>
        <path
            class="wx_graphic" 
            d="m -80,-230 a 85,90 0 0 1 -45,80 85,90 0 0 1 -85,0 85,90 0 0 1 -45,-80"
            transform="rotate(180)" />
    </g>`
/*
SVG Icons
*/

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
        <ellipse
        class="wx_graphic" 
        cx="155"
        cy="255"
        rx="90"
        ry="75" />
    <ellipse
        class="wx_graphic" 
        cx="340"
        cy="255"
        rx="90"
        ry="75" />
    </g>`
//Dust or Sand
const DU_SA =
    `<g id="DU_SA">
        <path
        id="path342"
        class="wx_graphic"
        d="m 322.61133,125.13086 c -16.56384,-20.34934 -42.43354,-31.823704 -69.45117,-30.804688 -11.39949,0.429681 -22.58631,3.074347 -32.87305,7.771488 -35.54781,16.23274 -54.37418,53.88954 -45.19336,90.39648 9.18079,36.50727 43.87857,61.96066 83.29297,61.10156 m -69.90625,126.18555 c 23.94628,29.96696 67.31576,40.40903 104.10937,25.06641 36.79392,-15.34204 57.03041,-52.30668 48.57813,-88.73438 -8.45193,-36.42761 -43.29946,-62.43592 -83.65235,-62.43359" />
    </g>`
//Blowing dust or sand
const BLDU_BLSA =
    `<g id="BLDU_BLSA">
        ${DU_SA}
        <rect
            class="wx_graphic"
            width="0.75"
            height="385"
            x="255"
            y="60" />
    </g>`
//Dust Devil
const PO =
    `<g id="PO">
        <path
            class="wx_graphic" 
            d="M 371.02339,260.54119 327.623,186.08416 175.04878,186.71893 99.310495,319.1701 l 76.835945,131.81445 152.57421,-0.63281 42.2129,-73.82227" />
        <path
            class="wx_graphic" 
            d="M 369.42563,141.09136 326.02524,66.634336 173.45102,67.269101 97.712737,199.72027 174.54868,331.53472 327.1229,330.90191 369.33579,257.07964" />
    </g>`
//Vicinity sand storm
const VCSS =
    `<g id="VCSS">
        ${DU_SA}
        <path
            class="wx_graphic"
            d="m 130,245 240,-0.0781 -25,-50" />
        <path
            class="wx_graphic" 
            d="M 390,200 A 195,190 0 0 1 195,150 195,190 0 0 1 145,-40"
            transform="matrix(0.7,0.7,-0.7,0.7,0,0)" />
        <path
            class="wx_graphic" 
            d="M -285,225 A 190,185 0 0 1 -485,185 190,185 0 0 1 -540,-5"
            transform="matrix(-0.65,-0.75,0.75,-0.65,0,0)"/>
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
        <ellipse
            class="wx_graphic_fill"
            cx="250"
            cy="250"
            rx="80"
            ry="80"/>
        <path
            class="wx_graphic" 
            d="M 415,310 A 185,190 25 0 1 245,415 185,190 25 0 1 80,305" />
    </g>`
//Vicinity showers
const VCSH =
    `<g id="VCSH">
        <ellipse
            class="wx_graphic_fill"
            cx="250"
            cy="250"
            rx="80"
            ry="80" />
        <path
            class="wx_graphic" 
            d="M 390,200 A 195,190 0 0 1 195,150 195,190 0 0 1 145,-40"
            transform="matrix(0.7,0.7,-0.7,0.7,0,0)" />
        <path
            class="wx_graphic" 
            d="M -285,225 A 190,185 0 0 1 -485,185 190,185 0 0 1 -540,-5"
            transform="matrix(-0.65,-0.75,0.75,-0.65,0,0)"/>
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
        ${DU_SA}
        <path
            class="wx_graphic"
            d="m 130,245 240,-0.0781 -25,-50" />
    </g>`
//Strong sand or dust storm
const PLUS_SS =
    `<g id="+SS">
        ${DU_SA}
        <path
            class="wx_graphic"
            d="m 135,230 c 80,-0.025 150,-0.050 240,-0.078 l -30,-50"/>
        <path
            class="wx_graphic"
            d="m 135,285 240,0.078 -30,50" />
    </g>`
//Blowing snow
const BLSN =
    `<g id="BLSN">
        <rect
            class="wx_graphic"
            width="336.96838"
            height="3.2715375"
            x="74.154854"
            y="248.36423" />
        <path
            class="wx_graphic"
            d="m 370.77355,286.68722 58.29491,-38.25 -58.29491,-34.99609" />
        <g transform="rotate(-90,250,250)">
            <rect
                class="wx_graphic"
                width="335"
                height="5"
                x="75"
                y="250" />
            <path
                class="wx_graphic"
                d="m 370.77355,286.68722 58.29491,-38.25 -58.29491,-34.99609" />
        </g>
    </g>`
//Drifting snow
const DRSN =
    `<g id="DRSN">
        <rect
            class="wx_graphic"
            width="336.96838"
            height="3.2715375"
            x="74.154854"
            y="248.36423" />
        <path
            class="wx_graphic"
            d="m 370.77355,286.68722 58.29491,-38.25 -58.29491,-34.99609" />
        <g transform="rotate(90,250,250)">
            <rect
                class="wx_graphic"
                width="335"
                height="5"
                x="75"
                y="250" />
            <path
                class="wx_graphic"
                d="m 370.77355,286.68722 58.29491,-38.25 -58.29491,-34.99609" />
        </g>
    </g>
    `
//FOG//////////////////////////////////////////////

//Vicinity fog
const VCFG =
    `<g id="VCFG">
        <line class="wx_graphic" x1="100" y1="150" x2="400" y2="150"></line>
        <line class="wx_graphic" x1="100" y1="250" x2="400" y2="250"></line>
        <line class="wx_graphic" x1="100" y1="350" x2="400" y2="350"></line>
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
        <g transform="matrix(0.6,0,0,0.6,20,114)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,203,114)">${COMMA}</g>
    </g>`
//Moderate drizzle
const DZ =
    `<g id="DZ">
        <g transform="matrix(0.6,0,0,0.6,18,158)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,201,158)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,106,12)">${COMMA}</g>
    </g>`
//Heavy drizzle
const PLUS_DZ =
    `<g id="+DZ">
        <g transform="matrix(0.6,0,0,0.6,20,114)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,203,114)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,108,-31)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,108,261)">${COMMA}</g>
    </g>`
//Light freezing drizzle
const MIN_FZDZ =
    `<g id="-FZDZ">
        <g transform="matrix(0.6,0,0,0.6,28,136)">${COMMA}</g>
        ${SINE}
    </g>`
//Moderate to heavy freezing drizzle
const FZDZ =
    `<g id="-DZ">
        <g transform="matrix(0.6,0,0,0.6,28,136)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,204,66)">${COMMA}</g>
        ${SINE}    
    </g>`
//Light drizzle and rain
const MIN_DZRA =
    `<g id="-DZRA">
        <g transform="matrix(0.6,0,0,0.6,107,193)">${COMMA}</g>
        <ellipse
            class="wx_graphic_fill"
            cx="250"
            cy="150"
            rx="50"
            ry="55"/>
    </g>`
//Moderate to heavy drizzle and rain
const DZRA =
    `<g id="DZRA" transform="matrix(1,0,0,0.9,0.6,120)">
        <g transform="matrix(0.6,0,0,0.6,105,170)">${COMMA}</g>
        <g transform="matrix(0.6,0,0,0.6,105,-140)">${COMMA}</g>
        <ellipse
            class="wx_graphic_fill"
            cx="250"
            cy="150"
            rx="50"
            ry="55"/>
    </g>`

//RAIN

//Light rain
const MIN_RA =
    `<g id="-RA">
        <ellipse
            class="wx_graphic_fill"
            cx="130"
            cy="245"
            rx="80"
            ry="80" />
        <ellipse
            class="wx_graphic_fill"
            cx="370"
            cy="245"
            rx="80"
            ry="80" />
    </g>`
//Moderate rain
const RA =
    `<g id="RA">
        <ellipse
            class="wx_graphic_fill"
            cx="135"
            cy="355"
            rx="80"
            ry="80" />
        <ellipse
            class="wx_graphic_fill"
            cx="250"
            cy="145"
            rx="80"
            ry="80" />
        <ellipse
            class="wx_graphic_fill"
            cx="365"
            cy="355"
            rx="80"
            ry="80" />
    </g>`
//Heavy rain
const PLUS_RA =
    `<g id="+RA">
        <ellipse
            class="wx_graphic_fill"
            style="stroke-width:15;"
            cx="140"
            cy="250"
            rx="80"
            ry="80" />
        <ellipse
            class="wx_graphic_fill"
            style="stroke-width:15;"
            cx="250"
            cy="100"
            rx="80"
            ry="80" />
        <ellipse
            class="wx_graphic_fill"
            style="stroke-width:15;"
            cx="250"
            cy="400"
            rx="80"
            ry="80" />
        <ellipse
            class="wx_graphic_fill"
            style="stroke-width:15;"
            cx="360"
            cy="250"
            rx="80"
            ry="80" />
    </g>`
//Light freezing rain
const MIN_FZRA =
    `<g id="-FZRA">
        <ellipse
            class="wx_graphic_fill"
            cx="170"
            cy="250"
            rx="50"
            ry="55"/>
        ${SINE}
    </g>`
//Moderate to heavy freezing rain
const FZRA =
    `<g id="FZRA">
        <ellipse
            class="wx_graphic_fill"
            cx="170"
            cy="250"
            rx="50"
            ry="55"/>
        <ellipse
            class="wx_graphic_fill"
            cx="345"
            cy="215"
            rx="50"
            ry="55"/>
        ${SINE}
    </g>`
//Light rain and snow
const MIN_RASN = 
    `<g id="-RASN" transform="translate(-0.45,160)">
        <g transform="matrix(0.45,0,0,0.4,140,140)">${STAR}</g>
        <ellipse
            class="wx_graphic_fill"
            cx="250"
            cy="-15"
            rx="70"
            ry="70" />
    </g>`
//Moderate to heavy rain and snow
const RASN =
    `<g id="RASN" transform="translate(-0.43,155)">
        <g transform="matrix(0.45,0,0,0.4,140,200)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,140,-130)">${STAR}</g>
        <ellipse
            class="wx_graphic_fill"
            style="stroke-width:15;"
            cx="250"
            cy="95"
            rx="70"
            ry="70" />
    </g>`
//SNOW and MISC FROZEN PERCIP

//Light snow
const MIN_SN =
    `<g id="-SN" transform="translate(-0.435,100)">
        <g transform="matrix(0.45,0,0,0.4,40,90)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,240,90)">${STAR}</g>
    </g>`
//Moderate snow
const SN =
    `<g id="SN" transform="translate(-0.435,170)">
        <g transform="matrix(0.45,0,0,0.4,40,90)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,240,90)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,140,-55)">${STAR}</g>
    </g>`
//Heavy snow
const PLUS_SN =
    `<g id="+SN" transform="translate(-0.435,100)">
        <g transform="matrix(0.45,0,0,0.4,40,90)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,240,90)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,140,-55)">${STAR}</g>
        <g transform="matrix(0.45,0,0,0.4,140,240)">${STAR}</g>
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
      <text class="wx_graphic_fill" style="font-size: 100px;stroke-width: 15;" x="237" y="240" dx="-18" dy="32">●</text>
    </g>`
//SHOWERY PERCIPITATION

//Light rain showers
const MIN_SHRA =
    `<g id="MIN_SHRA">
        <ellipse
            class="wx_graphic_fill"
            cx="245"
            cy="70"
            rx="50"
            ry="50" />
        ${DWN_TRI}
    </g>`
//Moderate to heavy rain showers
const SHRA = 
    `<g transform="translate(3.14,20)">
        <ellipse
            class="wx_graphic_fill"
                cx="245"
                cy="70"
                rx="50"
                ry="50" />
        ${DWN_TRI}
        <rect
            class="wx_graphic"
            style="stroke-width:15;"
            width="100"
            height="5"
            x="195"
            y="205" />
    </g>`
//Light rain and snow showers
const MIN_SHRASN = 
    `<g transform="translate(9,20)">
        <ellipse
            class="wx_graphic_fill"
            cx="240"
            cy="195"
            rx="50"
            ry="50"/>
        ${DWN_TRI_SMALL}
        <g transform="matrix(0.3,0,0,0.3,165,35)">
            ${STAR}
        </g>
    </g>`
//Moderate to heavy rain and snow showers
const SHRASN = 
    `<g transform="translate(9,20)">
        <ellipse
            class="wx_graphic_fill"
            cx="240"
            cy="195"
            rx="50"
            ry="50"/>
        ${DWN_TRI_SMALL}
        <g transform="matrix(0.3,0,0,0.3,165,35)">
            ${STAR}
        </g>
        <rect
            class="wx_graphic_fill"
            width="70"
            height="20"
            x="205"
            y="305" />
    </g>`
//Light snow showers
const MIN_SHSN = 
    `<g id="MIN_SHRA">
        ${DWN_TRI}
        <g transform="matrix(0.325,0,0,0.3,165,35)">
            ${STAR}
        </g>
    </g>`
//Moderate to heavy snow showers
const SHSN =
    `<g id="MIN_SHRA">
        ${DWN_TRI}
        <g transform="matrix(0.325,0,0,0.3,165,35)">
            ${STAR}
        </g>
        <rect
            class="wx_graphic"
            style="stroke-width:15;"
            width="100"
            height="5"
            x="195"
            y="205" />
    </g>`
//Light showers with hail, not with thunder
const MIN_GR = 
    `<g transform="translate(3.1476804,20.168937)">
        <path
            class="wx_graphic"
            style="stroke-linecap:butt;stroke-linejoin:round"
            d="M 200,350 80,140 325,140 Z"
            transform="matrix(0.54819594,0,0,1.1522448,135.14291,26.25069)" />
        <path
            class="wx_graphic_fill"
            style="stroke-linecap:butt;stroke-linejoin:round;stroke-width:15"
            d="M 215,106.41301 271.14262,9.7515746 327.2378,105.91474 Z"
            transform="matrix(1.25,0,0,1.2,-90,25)" />
    </g>`
//Moderate to heavy showers with hail, not with thunder
const GR = 
    `<g transform="translate(3.1476804,20.168937)">
        <path
            class="wx_graphic"
            style="stroke-linecap:butt;stroke-linejoin:round"
            d="M 200,350 80,140 325,140 Z"
            transform="matrix(0.55,0,0,1.15,135,25)" />
        <path
            class="wx_graphic_fill"
            style="stroke-linecap:butt;stroke-linejoin:round;stroke-width:15"
            d="M 215,105 270,10 325,105 Z"
            transform="matrix(1.25,0,0,1.2,-90,25)" />
        <rect
            class="wx_graphic"
            style="stroke-width:15"
            width="95"
            height="5"
            x="200"
            y="235" />
    </g>`

// THUNDERSTORMS

const THUNDER = 
    `<path
        class="wx_graphic"
        style="stroke-linecap:butt;stroke-linejoin:round"    
        d="M 375,425 230,290 355,125 H 125 v 300"/>
    <path
        class="wx_graphic"
        style="stroke-linecap:butt;stroke-linejoin:round"
        d="M 250,405 380,425 335,305"/>`
//Light to moderate thunderstorm with rain
const TSRA =
`  <g transform="matrix(0.59808265,0,0,0.58004786,205.87825,107.57905)">
    <ellipse
        class="wx_graphic_fill"
        cx="75"
        cy="-75"
        rx="70"
        ry="70" />
    </g>
    ${THUNDER}`
//Light to moderate thunderstorm with hail
const TSGR = 
    `<path
        class="wx_graphic"
        d="m 190,45 40,-70 40,70 z"
        transform="matrix(0.8,0,0,0.7,55,60)" />
        ${THUNDER}`
//Thunderstorm with heavy rain
const PLUS_TSRA = 
    `<g transform="matrix(0.6,0,0,0.6,205,105)">
        <ellipse
            class="wx_graphic_fill"
            cx="75"
            cy="-75"
            rx="70"
            ry="70" />
    </g>
    <path
        class="wx_graphic"
        style="stroke-linecap:butt;stroke-linejoin:round"
        d="M 235,420 295,350 230,290 355,125 H 125 v 300" />
    <path
        class="wx_graphic"
        style="stroke-linecap:butt;stroke-linejoin:round"
        d="m 240,355 -25,80 80,-20"/>`

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
    "FC": { svg: FC, text: "Funnel Cloud/Tornado" },
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
    "PL": { svg: PE_PL, text: "Ice Pellets" },
    "-SHRA": { svg: MIN_SHRA, text: "Light rain showers" },
    "SHRA": { svg: SHRA, text: "Moderate rain showers" },
    "+SHRA": { svg: SHRA, text: "Heavy rain showers" },
    "-SHRASN": { svg: MIN_SHRASN, text: "Light rain and snow showers" },
    "SHRASN": { svg: SHRASN, text: "Moderate rain and snow showers" },
    "+SHRASN": { svg: SHRASN, text: "Heavy rain and snow showers" },
    "-SHSN": { svg: MIN_SHSN, text: "Light snow showers" },
    "SHSN": { svg: SHSN, text: "Moderate snow showers" },
    "+SHSN": { svg: SHSN, text: "Heavy snow showers" },
    "-GR": { svg: MIN_GR, text: "Light showers with hail, not with thunder" },
    "GR": { svg: GR, text: "Moderate to heavy showers with hail, not with thunder" },
    "-TSRA": { svg: TSRA, text: "Light thunderstorm with rain" },
    "TSRA": { svg: TSRA, text: "Moderate thunderstorm with rain" },
    "-TSGR": { svg: TSGR, text: "Light thunderstorm with hail" },
    "TSGR": { svg: TSGR, text: "Moderate thunderstorm with hail" },
    "+TSRA": { svg: PLUS_TSRA, text: "Thunderstorm with heavy rain" }
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