/**
 * Cloud Description
 */
export class Cloud {
    //Cloud description code
    public abbreviation?: string;
    //Human readable description
    public meaning?: string;
    //Altitude in ft
    public altitude?: number;
    //designates cumulonimbus
    public cumulonimbus?: boolean;
}
//Cloud abbreviation map
export const CLOUDS: any = {
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