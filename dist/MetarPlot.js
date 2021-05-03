"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metarToSVG = exports.rawMetarToSVG = exports.MetarPlot = void 0;
var Metar_1 = require("./Metar");
var Weather_1 = require("./Weather");
/**
 * Extracted Metar message
 */
var MetarPlot = /** @class */ (function () {
    function MetarPlot() {
    }
    return MetarPlot;
}());
exports.MetarPlot = MetarPlot;
var GUST_WIDTH = 2;
var WS_WIDTH = 4;
function rawMetarToSVG(rawMetar) {
    var _a, _b;
    var metar = new Metar_1.METAR(rawMetar);
    var wx = (_b = (_a = metar.weather[0]) === null || _a === void 0 ? void 0 : _a.abbreviation) !== null && _b !== void 0 ? _b : "";
    var plot = {
        visablity: metar.visibility,
        temp: metar.temperature,
        dew_point: metar.dewpoint,
        station: metar.station,
        wind_direction: (typeof metar.wind.direction === "number") ? metar.wind.direction : undefined,
        wind_speed: metar.wind.speed,
        gust_speed: metar.wind.gust,
        wx: wx
    };
    return metarToSVG(plot);
}
exports.rawMetarToSVG = rawMetarToSVG;
/**
 * Converts a Metar object to a svg metar plot
 * @param metar
 * @returns
 */
function metarToSVG(metar) {
    var _a, _b, _c, _d, _e;
    var VIS = (_a = metar.visablity) !== null && _a !== void 0 ? _a : "";
    var TMP = (_b = metar.temp) !== null && _b !== void 0 ? _b : "";
    var DEW = (_c = metar.dew_point) !== null && _c !== void 0 ? _c : "";
    var STA = (_d = metar.station) !== null && _d !== void 0 ? _d : "";
    var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 500 500\">\n         <style>\n            .txt{ font-size: 47.5px; font-family: sans-serif; }\n            .tmp{ fill: red; }\n            .sta{ fill: grey }\n            .dew{ fill: blue }\n            .vis{ fill: violet }\n         </style>\n         " + genWind(metar) + "\n         " + Weather_1.getWeatherSVG((_e = metar.wx) !== null && _e !== void 0 ? _e : "") + "\n         <g id=\"text\">\n            <text class=\"vis txt\" fill=\"#000000\" stroke=\"#000\" stroke-width=\"0\" x=\"80\"   y=\"260\" text-anchor=\"start\" xml:space=\"preserve\">" + VIS + "</text>\n            <text class=\"tmp txt\" fill=\"#000000\" stroke=\"#000\" stroke-width=\"0\" x=\"160\"  y=\"220\" text-anchor=\"start\" xml:space=\"preserve\" >" + TMP + "</text>\n            <text class=\"dew txt\" fill=\"#000000\" stroke=\"#000\" stroke-width=\"0\" x=\"160\"  y=\"315\" text-anchor=\"start\" xml:space=\"preserve\">" + DEW + "</text>\n            <text class=\"sta txt\" fill=\"#000000\" stroke=\"#000\" stroke-width=\"0\" x=\"270\"  y=\"315\" text-anchor=\"start\" xml:space=\"preserve\">" + STA + "</text>\n            <text class=\"alt txt\" fill=\"#000000\" stroke=\"#000\" stroke-width=\"0\" x=\"270\"  y=\"220\"  text-anchor=\"start\" xml:space=\"preserve\">" + "" + "</text>\n         </g>\n      </svg>";
    return svg;
}
exports.metarToSVG = metarToSVG;
/**
 * Creates a windbarb for the metar
 * @param metar
 * @returns
 */
function genWind(metar) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var WDD = metar.wind_direction ? metar.wind_direction : 0;
    var WSP = metar.wind_speed ? metar.wind_speed : 0;
    var wind = "";
    var gust = "";
    if (WSP === 0) {
        wind =
            "<g id=\"calm\">\n                <ellipse id=\"calm-marker\" stroke=\"#000\" fill=\"#00000000\" cx=\"250\" cy=\"250\" rx=\"35\" ry=\"35\"/>\n            </g>";
    }
    else {
        gust = metar.gust_speed == null ? "" :
            "<g id=\"gustBarb\" transform=\"rotate(" + WDD + ", 250, 250)\">\n                " + genBarb1((_a = metar.gust_speed) !== null && _a !== void 0 ? _a : 0, true) + "\n                " + genBarb2((_b = metar.gust_speed) !== null && _b !== void 0 ? _b : 0, true) + "\n                " + genBarb3((_c = metar.gust_speed) !== null && _c !== void 0 ? _c : 0, true) + "\n                " + genBarb4((_d = metar.gust_speed) !== null && _d !== void 0 ? _d : 0, true) + "\n                " + genBarb5((_e = metar.gust_speed) !== null && _e !== void 0 ? _e : 0, true) + "\n            </g>";
        wind =
            "<g id=\"windBard\" transform=\"rotate(" + WDD + ", 250, 250)\">\n                <line stroke-width=\"3\" y1=\"230\" x1=\"250\" y2=\"50\" x2=\"250\"  stroke=\"#000\" fill=\"none\" />\n                " + genBarb1((_f = metar.wind_speed) !== null && _f !== void 0 ? _f : 0, false) + "\n                " + genBarb2((_g = metar.wind_speed) !== null && _g !== void 0 ? _g : 0, false) + "\n                " + genBarb3((_h = metar.wind_speed) !== null && _h !== void 0 ? _h : 0, false) + "\n                " + genBarb4((_j = metar.wind_speed) !== null && _j !== void 0 ? _j : 0, false) + "\n                " + genBarb5((_k = metar.wind_speed) !== null && _k !== void 0 ? _k : 0, false) + "\n            </g>";
    }
    return gust + wind;
}
/**
 * Generate first barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns
 */
function genBarb1(speed, gust) {
    var fill = gust ? 'red' : '#000';
    var tag = gust ? 'gs' : 'ws';
    var width = gust ? GUST_WIDTH : WS_WIDTH;
    var barb = "";
    if (speed >= 10 && speed < 50) {
        barb = "<line id=\"" + tag + "-bard-1-long\" stroke-width=\"" + width + "\" y1=\"50\" x1=\"250\" y2=\"50\" x2=\"300\" stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 50)\"/>";
    }
    else if (speed >= 50) {
        barb = "<polygon id=\"" + tag + "-bard-1-flag\" points=\"248,60 290,30 248,30\" fill=\"" + fill + "\" />";
    }
    return barb;
}
/**
 * Generate second barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns
 */
function genBarb2(speed, gust) {
    var fill = gust ? 'red' : '#000';
    var tag = gust ? 'gs' : 'ws';
    var width = gust ? GUST_WIDTH : WS_WIDTH;
    var barb = "";
    if ((speed < 10) || (15 <= speed && speed < 20) || (55 <= speed && speed < 60)) {
        barb = "<line id=\"" + tag + "-bard-2-short\" stroke-width=\"" + width + "\" y1=\"70\" x1=\"250\" y2=\"70\" x2=\"275\" stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 70)\"/>";
    }
    else if ((15 < speed && speed < 50) || (speed >= 60)) {
        barb = "<line id=\"" + tag + "-bard-2-long\" stroke-width=\"" + width + "\" y1=\"70\" x1=\"250\" y2=\"70\" x2=\"300\" stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 70)\"/>";
    }
    return barb;
}
/**
 * Generate third barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns
 */
function genBarb3(speed, gust) {
    var fill = gust ? 'red' : '#000';
    var tag = gust ? 'gs' : 'ws';
    var width = gust ? GUST_WIDTH : WS_WIDTH;
    var barb = "";
    if ((25 <= speed && speed < 30) || (65 <= speed && speed < 70)) {
        barb = "<line id=\"" + tag + "-bard-3-short\" stroke-width=\"" + width + "\" y1=\"90\"  x1=\"250\" y2=\"90\" x2=\"275\" stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 90)\"/>";
    }
    else if ((25 < speed && speed < 50) || speed >= 70) {
        barb = "<line id=\"" + tag + "-bard-3-long\" stroke-width=\"" + width + "\" y1=\"90\"  x1=\"250\" y2=\"90\" x2=\"300\" stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 90)\"/>";
    }
    return barb;
}
/**
 * Generate forth barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns
 */
function genBarb4(speed, gust) {
    var fill = gust ? 'red' : '#000';
    var tag = gust ? 'gs' : 'ws';
    var width = gust ? GUST_WIDTH : WS_WIDTH;
    var barb = "";
    if ((35 <= speed && speed < 40) || (75 <= speed && speed < 80)) {
        barb = "<line id=\"" + tag + "-bard-4-short\" stroke-width=\"" + width + "\" y1=\"110\" x1=\"250\" y2=\"110\" x2=\"275\"  stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 110)\"/>";
    }
    else if ((35 < speed && speed < 50) || speed >= 80) {
        barb = "<line id=\"" + tag + "-bard-4-long\" stroke-width=\"" + width + "\" y1=\"110\" x1=\"250\" y2=\"110\" x2=\"300\"  stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 110)\"/>";
    }
    return barb;
}
/**
 * Generate fifth barb
 * @param speed wind or gust speed
 * @param gust set to true for gust
 * @returns
 */
function genBarb5(speed, gust) {
    var fill = gust ? 'red' : '#000';
    var tag = gust ? 'gs' : 'ws';
    var width = gust ? GUST_WIDTH : WS_WIDTH;
    var brab = "";
    if ((45 <= speed && speed < 50) || (85 <= speed && speed < 90)) {
        brab = "<line id=\"" + tag + "-bard-5-short\" stroke-width=\"" + width + "\" y1=\"130\" x1=\"250\" y2=\"130\" x2=\"275\"  stroke=\"" + fill + "\" transform=\"rotate(-35, 250, 130)\"/>";
    }
    return brab;
}
