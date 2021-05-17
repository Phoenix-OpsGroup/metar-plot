import { Weather, WEATHER } from "./parts/Weather"
import { Cloud , CLOUDS} from "./parts/Cloud"
import { Wind } from "./parts/Wind"
import { RVR } from "./parts/RVR"

//Meassage types
const TYPES = ["METAR", "SPECI"];

//Metar Object
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

    /**
     * Extracted Metar data in a human readable format.
     * @param metarString raw metar string if provided station and time will be ignored and replaced with the content in the raw METAR
     * @param station staion name for instance creation
     * @param time time for instance creation
     */
    constructor(metarString?: string, station?: string, time?: Date) {
        this.station = station ?? "----"
        this.time = time ?? new Date()
        if (metarString != null) {
            parseMetar(metarString, this)
        }
    }
}

/**
 * Parses a raw metar and binds or creates a METAR object
 * @param metarString Raw METAR string
 * @param ref Reference to a METAR object. This objects contents will be shallow replaced with the Raw metars values. 
 *  Meaning values will be updated or added but not removed.
 * @returns 
 */
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
    let obs_keys = Object.keys(WEATHER).join(' | ').replace(/\+/g, "\\+")
    let re = new RegExp(`( ${obs_keys} )`, 'g')
    let matches = metar.match(re)
    if (matches != null) {
        return matches.map(match => {
            let key = match.trim()
            return {
                abbreviation: key,
                meaning: WEATHER[key].text
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