import { weather } from "./Weather"

export class Wind {
    public speed?: number;
    public gust?: number;
    public direction?: string | number;
    public variation?: Variation | boolean;
    public unit?: string;
}

export class Variation {
    public min?: number;
    public max?: number;
}

export class Weather {
    public abbreviation?: string;
    public meaning?: string;
}

export class Cloud {
    public abbreviation?: string;
    public meaning?: string;
    public altitude?: number;
    public cumulonimbus?: boolean;
}

export class RVR {
    public runway?: string
    public direction?: string
    public seperator?: string
    public minIndicator?: string
    public minValue?: string
    public variableIndicator?: string
    public maxIndicator?: string
    public maxValue?: string
    public trend?: string
    public unitsOfMeasure?: string

    private re = /(R\d{2})([L|R|C])?(\/)([P|M])?(\d+)(?:([V])([P|M])?(\d+))?([N|U|D])?(FT)?/g;

    constructor(rvrString: string) {
        var matches;
        while ((matches = this.re.exec(rvrString)) != null) {
            if (matches.index === this.re.lastIndex) {
                this.re.lastIndex++;
            }
            this.runway = matches[1]
            this.direction = matches[2]
            this.seperator = matches[3]
            this.minIndicator = matches[4]
            this.minValue = matches[5]
            this.variableIndicator = matches[6]
            this.maxIndicator = matches[7]
            this.maxValue = matches[8]
            this.trend = matches[9]
            this.unitsOfMeasure = matches[10]
        }
    }
}

const TYPES = ["METAR", "SPECI"];

const CLOUDS: any = {
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

export class METAR {
    public type?: string
    public correction?: boolean;
    public station: string;
    public time: Date;
    public auto?: boolean
    public wind: Wind = new Wind();
    public cavok?: boolean;
    public visibility?: number;
    public visibilityVariation?: number;
    public visibilityVariationDirection?: number;
    public weather: Array<Weather> = new Array<Weather>();
    public clouds: Array<Cloud> = new Array<Weather>();
    public temperature?: number;
    public dewpoint?: number;
    public altimeterInHpa?: number;
    public recentSignificantWeather?: string;
    public recentSignificantWeatherDescription?: string;
    public rvr?: RVR;

    constructor(metarString?: string, station?: string, time?: Date) {
        this.station = station ?? "----"
        this.time = time ?? new Date()
        if (metarString != null) {
            parseMetar(metarString, this)
        }
    }
}

export function parseMetar(metarString: string, ref?: METAR): METAR {
    let station = parseStation(metarString)
    let time = parseDate(metarString);
    if (ref != null) {
        ref.station = station
        ref.time = time
    } else {
        ref = new METAR(undefined, station, time)
    }
    //Parse Auto
    ref.auto = parseAuto(metarString)
    //Parse Wind
    ref.wind = parseWind(metarString);
    //Parse CAVOK
    ref.cavok = parseCavok(metarString)
    //Parse Visablility
    ref.visibility = parseVisibility(metarString)
    //Parse Runway VIS
    //TODO
    //Parse Weather
    ref.weather = parseWeather(metarString);
    //Parse Clouds
    ref.clouds = parseClouds(metarString);
    //Parse Temp Point Internations 
    let temps_int = parseTempInternation(metarString)
    if (temps_int != null) {
        ref.temperature = temps_int[0];
        ref.dewpoint = temps_int[1];
    }
    //Parse Temp North american Will overwirte international since it is more precise
    let temps_ne = parseTempNA(metarString)
    if (temps_ne != null) {
        ref.temperature = temps_ne[0];
        ref.dewpoint = temps_ne[1];
    }
    return ref;
}

export function parseStation(metar: string): string {
    let re = /^(METAR\s)?([A-Z]{1,4})\s/g
    let matches = re.exec(metar)
    if (matches != null) {
        return matches[2]
    } else {
        throw new Error("Station could not be found invalid metar")
    }
}

export function parseDate(metar: string): Date {
    let re = /([\d]{2})([\d]{2})([\d]{2})Z/g
    let matches = re.exec(metar)
    if (matches != null) {
        var d = new Date();
        d.setUTCDate(parseInt(matches[1]));
        d.setUTCHours(parseInt(matches[2]));
        d.setUTCMinutes(parseInt(matches[3]));
        d.setUTCSeconds(0)
        d.setUTCMilliseconds(0)
        return d
    } else {
        throw new Error("Failed to parse Date")
    }
}

export function parseCavok(metar: string): boolean {
    let re = /\sCAVOK\s/g
    return metar.match(re) != null ? true : false
}

export function parseAuto(metar: string): boolean {
    let re = /\s(AUTO)?(AO1)?(AO2)?\s/g
    return metar.match(re) != null ? true : false
}

export function parseTempInternation(metar: string): [number, number] | undefined {
    let re = /\s(M)?(\d{2})\/(M)?(\d{2})\s/g
    let matches = re.exec(metar)
    if (matches != null) {
        let temp = parseInt(matches[2]) * (matches[1] == null ? 1 : -1)
        let dew_point = parseInt(matches[4]) * (matches[3] == null ? 1 : -1)
        return [temp, dew_point]
    }
}

export function parseTempNA(metar: string): [number, number] | undefined {
    let re = /(T)(\d{1})(\d{2})(\d{1})(\d{1})(\d{2})(\d{1})/g
    let matches = re.exec(metar)
    if (matches != null) {
        let temp = parseInt(matches[3] + "." + matches[4]) * (matches[2] === "0" ? 1 : -1)
        let dew_point = parseInt(matches[6] + "." + matches[7]) * (matches[5] === "0" ? 1 : -1)
        return [temp, dew_point]
    }
}

export function parseWeather(metar: string): Array<Weather> {
    let obs_keys = Object.keys(weather).join(' | ').replace(/\+/g, "\\+")
    let re = new RegExp(`( ${obs_keys} )`, 'g')
    let matches = metar.match(re)
    if (matches != null) {
        return matches.map(match => {
            let key = match.trim()
            return {
                abbreviation: key,
                meaning: weather[key].text
            }
        })
    } else {
        return new Array<Weather>()
    }

}

export function parseVisibility(metar: string): number | undefined {
    var re = /\s([0-9]{1,2}\/[0-9]{1,2})?([0-9]{1,4})?(SM)?\s/g;
    if (metar.match(re)) {
        let vis_parts = re.exec(metar)
        if (vis_parts != null) {
            if (vis_parts[1] != null) {
                return parseFloat(eval(vis_parts[1]))
            } else {
                let num = parseInt(vis_parts[2])
                return vis_parts[3] === "SM" ? num : Math.round(num * 0.000621371)
            }
        }
    }
    return undefined
}

export function parseClouds(metarString: string): Cloud[] {
    let re = /(NCD|SKC|CLR|NSC|FEW|SCT|BKN|OVC|VV)(\d{3})/g
    let matches = metarString.match(re)
    let clouds = new Array<Cloud>()
    if (matches != null) {
        matches.forEach(match => {
            let parts = re.exec(match)
            if (parts != null) {
                let cloud: Cloud = {
                    abbreviation: parts[1],
                    meaning: CLOUDS[parts[1]],
                    altitude: parseInt(parts[2]) * 100
                }
                clouds.push(cloud)
            }
        })
    }
    return clouds
}

export function parseWind(metar: string): Wind {
    let wind: Wind = new Wind()
    let re = /\s(\d{3})(\d{2})(G)?(\d{2})?(KT|MPS)\s/g
    let matches = re.exec(metar)
    if (matches != null) {
        wind.direction = parseInt(matches[1]);
        wind.speed = parseInt(matches[2]);
        wind.unit = matches[5]
    }
    return wind
}