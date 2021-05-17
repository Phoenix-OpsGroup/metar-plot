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