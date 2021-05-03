"use strict";
//DUST OR SAND
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherSVG = void 0;
//Smoke or volcanic ash
var FU_VA = "<g id=\"FU_VA\">\n        <line class=\"wx_graphic\" x1=\"100\" y1=\"150\" x2=\"100\" y2=\"400\"></line>\n        <path class=\"wx_graphic\" d=\"M 100 150 C 115 75 185 75 200 150\"></path>\n        <path class=\"wx_graphic\" d=\"M 200 150 C 215 215 285 215 300 150\"></path>\n        <path class=\"wx_graphic\" d=\"M 300 150 C 315 75 380 75 400 150\"></path>\n    </g>";
//Haze
var HZ = "<g id=\"HZ\">\n        <text class=\"wx_text\" x=\"100\" y=\"365\">\u267E\uFE0F</text>\n    </g>";
//Dust or Sand
var DU_SA = "<g id-\"DU_SA\">\n        <text class=\"wx_text\" x=\"160\" y=\"360\">S</text>\n    </g>\n    ";
//Blowing dust or sand
var BLDU_BLSA = "<g id-\"DU_SA\">\n        <text class=\"wx_text\" x=\"160\" y=\"360\">$</text>\n    </g>";
//Dust Devil
var PO = "";
//Vicinity sand storm
var VCSS = "";
//FOG OR SPEACIAL WEATHER
//Mist or light fog
var BR = "<g id=\"BR\">\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"200\" x2=\"450\" y2=\"200\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"300\" x2=\"450\" y2=\"300\"></line>\n    </g>";
//More or less continuous shallow fog
var MIFG = "<g id=\"MIFG\">\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"200\" x2=\"200\" y2=\"200\"></line>\n        <line class=\"wx_graphic\" x1=\"300\" y1=\"200\" x2=\"450\" y2=\"200\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"300\" x2=\"450\" y2=\"300\"></line>\n    </g>\n    ";
//Vicinity thunderstorm
var VCTS = "";
//Virga or precipitation not hitting ground
var VIRGA = "";
//Vicinity showers
var VCSH = "";
//Thunderstorm with or without precipitation
var TS = "";
//Squalls
var SQ = "";
//Funnel cloud or tornado
var FC = "";
//BLOWING WEATHER
//Sand or dust storm
var SS = "";
//Strong sand or dust storm
var PLUS_SS = "";
//Blowing snow
var BLSN = "";
//Drifting snow
var DRSN = "";
//FOG
//Vicinity fog
var VCFG = "<g id=\"VCFG\">\n        <line class=\"wx_graphic\" x1=\"75\" y1=\"150\" x2=\"425\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"75\" y1=\"250\" x2=\"425\" y2=\"250\"></line>\n        <line class=\"wx_graphic\" x1=\"75\" y1=\"350\" x2=\"425\" y2=\"350\"></line>\n        <path class=\"wx_graphic\" d=\"M 60 135 C 15 165 15 335 65 365\"></path>\n        <path class=\"wx_graphic\" d=\"M 435 135 C 485 150 500 345 435 365\"></path>\n    </g>";
//Patchy fog
var BCFG = "<g id=\"BCFG\">\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"150\" x2=\"150\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"350\" y1=\"150\" x2=\"450\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"250\" x2=\"450\" y2=\"250\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"350\" x2=\"150\" y2=\"350\"></line>\n        <line class=\"wx_graphic\" x1=\"350\" y1=\"350\" x2=\"450\" y2=\"350\"></line>\n    </g>";
//Fog, sky discernable
var PRFG = "<g id=\"BCFG\">\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"150\" x2=\"150\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"350\" y1=\"150\" x2=\"450\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"250\" x2=\"450\" y2=\"250\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"350\" x2=\"450\" y2=\"350\"></line>\n    </g>";
//Fog, sky undiscernable
var FG = "<g id=\"FG\">\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"150\" x2=\"450\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"250\" x2=\"450\" y2=\"250\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"350\" x2=\"450\" y2=\"350\"></line>\n    </g>";
//Freezing fog
var FZFG = "<g id=\"FG\">\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"150\" x2=\"450\" y2=\"150\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"250\" x2=\"450\" y2=\"250\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"350\" x2=\"450\" y2=\"350\"></line>\n        <line class=\"wx_graphic\" x1=\"50\" y1=\"150\" x2=\"250\" y2=\"350\"></line>\n        <line class=\"wx_graphic\" x1=\"450\" y1=\"150\" x2=\"250\" y2=\"350\"></line>\n    </g>";
//Drizzle
//Light rain
var MIN_RA = "<g id=\"-RA\">\n        <text class=\"wx_text\" x=\"130\" y=\"240\">..</text>\n    </g>";
//Moderate rain
var RA = "<g id=\"RA\">\n        <text class=\"wx_text\" x=\"130\" y=\"285\">..</text>\n        <text class=\"wx_text\" x=\"180\" y=\"175\">.</text>\n    </g>";
//Heavy rain
var PLUS_RA = "<g id=\"RA\">\n        <text class=\"wx_text\" x=\"130\" y=\"240\">..</text>\n        <text class=\"wx_text\" x=\"180\" y=\"145\">.</text>\n        <text class=\"wx_text\" x=\"180\" y=\"320\">.</text>\n    </g>";
//Light freezing rain
var MIN_FZRA = "";
//Moderate to heavy freezing rain
var FZRA = "";
//Light rain and snow
var MIN_RASN = "";
//Moderate to heavy rain and snow
var RASN = "";
//SNOW and MISC FROZEN PERCIP
//Light snow
var MIN_SN = "<g id=\"-SN\">\n        <text class=\"wx_text\" x=\"50\" y=\"460\">**</text>\n        <text class=\"wx_text\" x=\"150\" y=\"325\">*</text>\n    </g>\n    ";
//Moderate snow
var SN = "<g id=\"SN\">\n        <text class=\"wx_text\" x=\"50\" y=\"460\">**</text>\n        <text class=\"wx_text\" x=\"150\" y=\"325\">*</text>\n    </g>";
//Heavy snow
var PLUS_SN = "<g id=\"+SN\">\n        <text class=\"wx_text\" x=\"50\" y=\"460\">**</text>\n        <text class=\"wx_text\" x=\"150\" y=\"325\">*</text>\n        <text class=\"wx_text\" x=\"150\" y=\"580\">*</text>\n    </g>";
//Snow grains
var SG = "";
//Ice crystals
var IC = "";
//Ice pellets
var PE_PL = "";
//SHOWERY PERCIPITATION
//Light rain showers
var MIN_SHRA = "";
//Moderate to heavy rain showers
var SHRA = "";
//Light rain and snow showers
var MIN_SHRASN = "";
//Moderate to heavy rain and snow showers
var SHRASN = "";
//Light snow showers
var MIN_SHSN = "";
//Moderate to heavy snow showers
var SHSN = "";
//Light showers with hail, not with thunder
var MIN_GR = "";
//Moderate to heavy showers with hail, not with thunder
var GR = "";
// THUNDERSTORMS
//Light to moderate thunderstorm with rain
var TSRA = "";
//Light to moderate thunderstorm with hail
var TSGR = "";
//Thunderstorm with heavy rain
var PLUS_TSRA = "";
var weather = {
    "FU": FU_VA,
    "VA": FU_VA,
    "HZ": HZ,
    "DU": DU_SA,
    "SA": DU_SA,
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
};
function getWeatherSVG(key) {
    var _a;
    var WEATHER = (_a = weather[key]) !== null && _a !== void 0 ? _a : "";
    var svg = "<svg width=\"65\" height=\"65\" viewBox=\"0 0 500 500\" x=\"160\" y=\"220\">\n        <style>\n            .wx_text{ \n                color: black;\n                font-size: 300px;\n                font-family: \"Noto Sans\";\n            }\n            .wx_graphic {\n                stroke: black;\n                fill: none;\n                stroke-width: 30\n            }\n        </style>\n        " + WEATHER + "\n    </svg>";
    return svg;
}
exports.getWeatherSVG = getWeatherSVG;
