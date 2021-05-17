/**
 * Wind Data
 */
 export class Wind {
    //wind speed
    public speed?: number;
    //Gust Speed
    public gust?: number;
    //Direction in degrees
    public direction?: string | number;
    public variation?: Variation | boolean;
    //Unit (MPS|KTS)
    public unit?: string;
}

export class Variation {
    public min?: number;
    public max?: number;
}