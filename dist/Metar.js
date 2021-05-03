"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METAR = exports.RVR = exports.Cloud = exports.Weather = exports.Variation = exports.Wind = void 0;
var Wind = /** @class */ (function () {
    function Wind() {
    }
    return Wind;
}());
exports.Wind = Wind;
var Variation = /** @class */ (function () {
    function Variation() {
    }
    return Variation;
}());
exports.Variation = Variation;
var Weather = /** @class */ (function () {
    function Weather() {
    }
    return Weather;
}());
exports.Weather = Weather;
var Cloud = /** @class */ (function () {
    function Cloud() {
    }
    return Cloud;
}());
exports.Cloud = Cloud;
var RVR = /** @class */ (function () {
    function RVR(rvrString) {
        this.re = /(R\d{2})([L|R|C])?(\/)([P|M])?(\d+)(?:([V])([P|M])?(\d+))?([N|U|D])?(FT)?/g;
        var matches;
        while ((matches = this.re.exec(rvrString)) != null) {
            if (matches.index === this.re.lastIndex) {
                this.re.lastIndex++;
            }
            this.runway = matches[1];
            this.direction = matches[2];
            this.seperator = matches[3];
            this.minIndicator = matches[4];
            this.minValue = matches[5];
            this.variableIndicator = matches[6];
            this.maxIndicator = matches[7];
            this.maxValue = matches[8];
            this.trend = matches[9];
            this.unitsOfMeasure = matches[10];
        }
    }
    return RVR;
}());
exports.RVR = RVR;
var TYPES = ["METAR", "SPECI"];
var CLOUDS = {
    NCD: "no clouds",
    SKC: "sky clear",
    CLR: "no clouds under 12,000 ft",
    NSC: "no significant",
    FEW: "few",
    SCT: "scattered",
    BKN: "broken",
    OVC: "overcast",
    VV: "vertical visibility",
};
var WEATHER = {
    // Intensity
    "-": "light intensity",
    "+": "heavy intensity",
    VC: "in the vicinity",
    // Descriptor
    MI: "shallow",
    PR: "partial",
    BC: "patches",
    DR: "low drifting",
    BL: "blowing",
    SH: "showers",
    TS: "thunderstorm",
    FZ: "freezing",
    // Precipitation
    RA: "rain",
    DZ: "drizzle",
    SN: "snow",
    SG: "snow grains",
    IC: "ice crystals",
    PL: "ice pellets",
    GR: "hail",
    GS: "small hail",
    UP: "unknown precipitation",
    // Obscuration
    FG: "fog",
    VA: "volcanic ash",
    BR: "mist",
    HZ: "haze",
    DU: "widespread dust",
    FU: "smoke",
    SA: "sand",
    PY: "spray",
    // Other
    SQ: "squall",
    PO: "dust or sand whirls",
    DS: "duststorm",
    SS: "sandstorm",
    FC: "funnel cloud",
};
var RECENT_WEATHER = {
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
var METAR = /** @class */ (function () {
    function METAR(metarString) {
        this.wind = new Wind();
        this.weather = new Array();
        this.clouds = new Array();
        var fields = metarString
            .split(" ")
            .map(function (f) {
            return f.trim();
        })
            .filter(function (f) {
            return !!f;
        });
        var i = 0;
        //Parse Type
        if (TYPES.indexOf(fields[i]) !== -1) {
            this.type = fields[i];
            i++;
        }
        else {
            this.type = "METAR";
        }
        //Parse Correction
        if (fields[i].lastIndexOf("CC", 0) == 0) {
            this.correction = true;
            i++;
        }
        if (fields[i].lastIndexOf("COR", 0) == 0) {
            this.correction = true;
            i++;
        }
        //Parse Station
        this.station = fields[i];
        i++;
        //Parse Date
        var d = new Date();
        d.setUTCDate(parseInt(fields[i].slice(0, 2), 10));
        d.setUTCHours(parseInt(fields[i].slice(2, 4), 10));
        d.setUTCMinutes(parseInt(fields[i].slice(4, 6), 10));
        this.time = d;
        i++;
        //Parse Auto
        this.auto = fields[i] === "AUTO";
        if (this.auto) {
            i++;
        }
        //Parse Correction: Second possible position for the correction
        if (fields[i].lastIndexOf("CC", 0) == 0) {
            this.correction = true;
            i++;
        }
        if (fields[i].lastIndexOf("COR", 0) == 0) {
            this.correction = true;
            i++;
        }
        //Parse Wind
        i = this.parseWind(fields, i);
        //Parse CAVOK
        this.cavok = fields[i] === "CAVOK";
        if (this.cavok) {
            i++;
        }
        //Parse Visablility
        var re = /^([0-9]+)([A-Z]{1,2})/g;
        if (this.cavok === false && fields[i] !== "////") {
            this.visibility = parseInt(fields[i].slice(0, 4));
            // Look for a directional variation report
            if (fields[i + 1].match(/^[0-9]+[N|E|S|W|NW|NE|SW|SE]/)) {
                i++;
                var matches;
                while ((matches = re.exec(fields[i])) != null) {
                    if (matches.index === re.lastIndex) {
                        re.lastIndex++;
                    }
                    if (matches[1] !== null) {
                        //  this.visibilityVariation = matches[1]
                    }
                    //this.visibilityVariationDirection = matches[2];
                }
            }
            i++;
        }
        //Parse Runway VIS
        if (this.cavok === false) {
            if (fields[i].match(/^R[0-9]+/)) {
                this.rvr = new RVR(fields[i]);
                // TODO: peek is more than one RVR in METAR and parse
                i++;
            }
        }
        //Parse Weather
        i = this.parseWeather(fields, i);
        //Parse Clouds
        i = this.parseClouds(fields, i);
        //Parse Temp Point
        var replaced = fields[i].replace(/M/g, "-");
        var a = replaced.split("/");
        if (2 === a.length) {
            this.temperature = parseInt(a[0], 10);
            this.dewpoint = parseInt(a[1], 10);
            i++;
        }
        //Parse ALtimeter
        var temp;
        if (fields[i] !== undefined && fields[i] !== null) {
            // inches of mercury if AXXXX
            if (fields[i].length === 5 && "A" === fields[i][0]) {
                temp = fields[i].substr(1, 2);
                temp += ".";
                temp += fields[i].substr(3, 5);
                this.altimeterInHpa = parseFloat(temp);
            }
            else if (fields[i].length && "Q" === fields[i][0]) {
                temp = fields[i].substr(1);
                this.altimeterInHpa = parseInt(temp, 10);
            }
        }
        //Parse Sig Weather
        if (fields[i] !== undefined && fields[i] !== null) {
            if (RECENT_WEATHER[fields[i]]) {
                this.recentSignificantWeather = fields[i];
                this.recentSignificantWeatherDescription = RECENT_WEATHER[fields[i]];
            }
        }
    }
    METAR.prototype.parseWeatherAbbrv = function (s, res) {
        var _a;
        var weather = this.parseAbbreviation(s, WEATHER);
        if (weather != null) {
            res = res || [];
            res.push(weather);
            return this.parseWeatherAbbrv(s.slice((_a = weather.abbreviation) === null || _a === void 0 ? void 0 : _a.length), res);
        }
        return res;
    };
    METAR.prototype.parseAbbreviation = function (s, map) {
        var abbreviation, meaning, length = 3;
        if (!s)
            return;
        while (length && !meaning) {
            abbreviation = s.slice(0, length);
            meaning = map[abbreviation];
            length--;
        }
        if (meaning) {
            return {
                abbreviation: abbreviation,
                meaning: meaning,
            };
        }
    };
    METAR.prototype.parseWeather = function (fields, i) {
        if (this.cavok === false) {
            var weather = this.parseWeatherAbbrv(fields[i]);
            if (weather != null) {
                if (!this.weather)
                    this.weather = [];
                this.weather = this.weather.concat(weather);
                i++;
                return this.parseWeather(fields, i);
            }
        }
        return i;
    };
    METAR.prototype.parseClouds = function (fields, i) {
        var _a;
        if (this.cavok === false) {
            var cloud = this.parseAbbreviation(fields[i], CLOUDS);
            if (cloud !== undefined) {
                cloud.altitude = parseInt(fields[i].slice((_a = cloud.abbreviation) === null || _a === void 0 ? void 0 : _a.length)) * 100;
                cloud.cumulonimbus = /CB$/.test(fields[i]);
                this.clouds = this.clouds || [];
                this.clouds.push(cloud);
                i++;
                return this.parseClouds(fields, i);
            }
        }
        return i;
    };
    METAR.prototype.parseWind = function (field, i) {
        var variableWind = /^([0-9]{3})V([0-9]{3})$/;
        if (field[i].match(/^[0-9]{1,4}(SM?)/)) {
            return i;
        }
        var direction = field[i].slice(0, 3);
        if (direction === "VRB") {
            this.wind.direction = "VRB";
            this.wind.variation = true;
        }
        else {
            this.wind.direction = parseInt(direction, 10);
        }
        var gust = field[i].slice(5, 8);
        if (gust[0] === "G") {
            this.wind.gust = parseInt(gust.slice(1), 10);
        }
        this.wind.speed = parseInt(field[i].slice(3, 5), 10);
        var unitMatch;
        if ((unitMatch = field[i].match(/KT|MPS|KPH|SM$/))) {
            this.wind.unit = unitMatch[0];
        }
        else {
            throw new Error("Bad wind unit: " + field[i]);
        }
        i++;
        var varMatch;
        if ((varMatch = field[i].match(variableWind))) {
            this.wind.variation = {
                min: parseInt(varMatch[1], 10),
                max: parseInt(varMatch[2], 10),
            };
            i++;
        }
        return i;
    };
    return METAR;
}());
exports.METAR = METAR;
// http://www.met.tamu.edu/class/metar/metar-pg10-sky.html
// https://ww8.fltplan.com/AreaForecast/abbreviations.htm
// http://en.wikipedia.org/wiki/METAR
// http://www.unc.edu/~haines/metar.html
