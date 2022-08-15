"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svelte = exports.Vue = exports.Angular = exports.React = exports.Default = void 0;
var MetarPlot_1 = require("../MetarPlot");
var Weather_1 = require("../parts/Weather");
var Cloud_1 = require("../parts/Cloud");
exports.default = {
    title: 'MetarPlot/Manual Plot',
    parameters: {
        docs: {
            description: {
                component: "This Story follows the creation of a plot via manual insertion of data fields.  Use this is you already have a decoded METAR and want to feed those decoded fields to the plot. If you only have the raw METAR check out Raw Plot"
            }
        }
    },
    argTypes: {
        visability: {
            control: {
                type: "number"
            },
            description: "Raw visablity no unit convertion"
        },
        temperature: {
            control: {
                type: "number"
            },
            description: "Raw Temperature no unit convertion"
        },
        dewPoint: {
            control: {
                type: "number"
            },
            description: "Raw Dew Point no unit convertion"
        },
        station: {
            control: "text",
            description: "Station ICO Abreviation"
        },
        windDirection: {
            control: {
                type: "number",
                min: 0,
                max: 359
            },
            description: "Wind direction in degrees"
        },
        windSpeed: {
            control: {
                type: "number"
            },
            description: "Wind speed in Knots"
        },
        gustSpeed: {
            control: {
                type: "number"
            },
            description: "Gust speed in Knots"
        },
        pressure: {
            control: {
                type: "number"
            },
            description: "Raw Pressure no unit convertion"
        },
        wxCode: {
            control: { type: 'select' },
            options: Object.keys(Weather_1.WEATHER),
            description: "Weather observation code"
        },
        condition: {
            control: { type: 'select' },
            options: Object.keys(Cloud_1.CONDITIONS),
            description: "Flight Rule conditions, changes color of coverage"
        },
        coverage: {
            control: { type: 'select' },
            options: Object.keys(Cloud_1.CLOUDS),
            description: "Cloud Coverage code"
        },
        height: {
            control: "text",
            description: "CSS Height"
        },
        width: {
            control: "text",
            description: "CSS Width"
        }
    },
    args: {
        visability: 10,
        temperature: 96,
        dewPoint: 64,
        station: "KBWI",
        windDirection: 22,
        windSpeed: 12,
        gustSpeed: 3,
        pressure: 29,
        wxCode: "RA",
        condition: "VFR",
        coverage: "FEW",
        metric: false,
        height: "500px",
        width: "500px"
    },
};
var Template = function (args) {
    var metar = {
        //Visbailiy in SM or m if metric is true
        visablity: args.visability,
        //temp in C
        temp: args.temperature,
        //dew point in C
        dew_point: args.dewPoint,
        //Staion Name
        station: args.station,
        //Wind direction in degrees
        wind_direction: args.windDirection,
        //Wind speed in Kts or mps if metric is true
        wind_speed: args.windSpeed,
        //Wind speed in Kts or mps if metric is true
        gust_speed: args.gustSpeed,
        //Weather condition abbriviation 
        wx: args.wxCode,
        //Flight condition
        condition: args.condition,
        //presure in inHg or hPa if metric is true
        pressure: args.pressure,
        //Prevailing cloud coverage
        coverage: args.coverage,
    };
    return "<img style=\"height:" + args.height + ";width:" + args.width + "\" src=" + (0, MetarPlot_1.metarToImgSrc)(metar) + " alt=\"metar\"/>";
};
exports.Default = Template.bind({});
exports.Default.parameters = {
    docs: {
        source: {
            code: "\nimport { metarToImgSrc, MetarPlot } from 'metar-plot';\nlet metar : MetarPlot = {\n    //Visbailiy in SM or m if metric is true\n    visablity: args.visability,\n    //temp in C\n    temp: args.temperature,\n    //dew point in C\n    dew_point: args.dewPoint,\n    //Staion Name\n    station: args.station,\n    //Wind direction in degrees\n    wind_direction: args.windDirection,\n    //Wind speed in Kts or mps if metric is true\n    wind_speed: args.windSpeed,\n    //Wind speed in Kts or mps if metric is true\n    gust_speed: args.gustSpeed,\n    //Weather condition abbriviation \n    wx: args.wxCode,\n    //Flight condition\n    condition: args.condition,\n    //presure in inHg or hPa if metric is true\n    pressure: args.pressure,\n    //Prevailing cloud coverage\n    coverage: args.coverage,\n}\n<img style={`height:${height};width:${args.width}`} src={metarToImgSrc(metar)} alt=\"metar\"/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
exports.React = Template.bind({});
exports.React.parameters = {
    docs: {
        source: {
            code: "\nimport { metarToImgSrc, MetarPlot } from 'metar-plot';\nimport React from 'react';\n\nfunction getMetarImg(metar: MetarPlot){\n  return (<img style={`height:${height};width:${args.width}`} src={metarToImgSrc(metar)} alt=\"metar\"/>)\n}",
            language: "tsx",
            type: "auto"
        }
    }
};
exports.Angular = Template.bind({});
exports.Angular.args = {
    code: "RA",
};
exports.Angular.parameters = {
    docs: {
        source: {
            code: "\nimport { metarToImgSrc, MetarPlot } from 'metar-plot';\n\n@Component({\n  selector:    'METAR',\n  templateUrl: './weather.component.html',\n})\nexport class Metar implements OnInit {\n  let metar: MetarPlot = new MetarPlot()\n  let style: string = \"height:100px;width:100px\"\n\n  public getSrc(){\n    return metarToImgSrc(code)\n  }\n}\n\nweather.component.html:\n\n<img style={{style}} src={{metarToImgSrc(metar)}} alt=\"metar\"/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
exports.Vue = Template.bind({});
exports.Vue.args = {
    code: "RA",
};
exports.Vue.parameters = {
    docs: {
        source: {
            code: "\n<script>\n  import { metarToImgSrc, MetarPlot } from 'metar-plot';\n  let metar : MetarPlot;\n</script>\n\n<style scoped>\n.metar {\n    height: 100px;\n    width: 100px;\n}\n</style>\n\n<template>\n  <img class=\"metar\" src={metarToImgSrc(metar)} alt=\"metar\"/>\n</template>",
            language: "tsx",
            type: "auto"
        }
    }
};
exports.Svelte = Template.bind({});
exports.Svelte.args = {
    code: "RA",
};
exports.Svelte.parameters = {
    docs: {
        source: {
            code: "\n<script lang=\"ts\">\n  import { metarToImgSrc, MetarPlot } from 'metar-plot';\n  export let metar: MetarPlot;\n</script>\n\n<style>\n.metar {\n    height: 100px;\n    width: 100px;\n}\n</style>\n\n<img class=\"metar\" src={metarToImgSrc(metar)} alt=\"metar\"/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
