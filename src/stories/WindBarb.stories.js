"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svelte = exports.Vue = exports.Angular = exports.React = exports.Default = void 0;
var Wind_1 = require("../src/parts/Wind");
exports.default = {
    title: 'MetarPlot/Wind Barb',
    parameters: {
        docs: {
            description: {
                component: "This Story shows how to create wind barbs in isolation.  This is useful for creating a legend or key on what the wind barbs mean."
            }
        }
    },
    argTypes: {
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
        windDirection: {
            control: {
                type: "number"
            },
            description: "Wind direction in degrees"
        }
    },
    args: {
        windSpeed: 20,
        gustSpeed: 30,
        windDirection: 90
    }
};
var Template = function (args) {
    var metar = {
        wind_speed: args.windSpeed,
        gust_speed: args.gustSpeed,
        wind_direction: args.windDirection,
    };
    return "<img src=" + (0, Wind_1.windImgSrc)(metar) + " alt=\"wind\"/>";
};
exports.Default = Template.bind({});
exports.Default.parameters = {
    docs: {
        source: {
            code: "\nimport { windImgSrc } from 'metar-plot';\nlet metar : MetarPlot = {\n    wind_speed: args.windSpeed,\n    gust_speed: args.gustSpeed,\n    wind_direction: args.windDirection,\n}\n<img src=${windImgSrc(metar)} alt=\"wind\"/>\n",
            language: "ts",
            type: "auto"
        }
    }
};
exports.React = Template.bind({});
exports.React.parameters = {
    docs: {
        source: {
            code: "\nimport { windImgSrc } from 'metar-plot';\nimport React from 'react';\n\nfunction getWindBarb(wind_speed: string){\n    let metar : MetarPlot = {\n        wind_speed: windSpeed,\n        gust_speed: gustSpeed,\n        wind_direction: .windDirection,\n    }\n    return (<img src=${windImgSrc(metar)} alt=\"wind\"/>)\n}",
            language: "ts",
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
            code: "\nimport { windImgSrc } from 'metar-plot';\n\n@Component({\n  selector:    'Weather',\n  templateUrl: './weather.component.html',\n})\nexport class Weather implements OnInit {\n  code: string = \"TA\"\n  let metar : MetarPlot = {\n    wind_speed: args.windSpeed,\n    gust_speed: args.gustSpeed,\n    wind_direction: args.windDirection,\n  }\n\n  public getSrc(){\n    return windImgSrc(metar)\n  }\n}\n\nweather.component.html:\n\n<img src={{getSrc()}} alt=\"wind\"/>\n",
            language: "ts",
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
            code: "\n<script>\n  import { windImgSrc } from 'metar-plot';\n  let code : string = \"RA\"\n</script>\n\n<template>\n    <img src=${windImgSrc(metar)} alt=\"wind\"/>\n</template>",
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
            code: "\n<script lang=\"ts\">\n  import { windImgSrc } from 'metar-plot';\n  let code: string = \"RA\"\n</script>\n\n<img src=${windImgSrc(metar)} alt=\"wind\"/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
