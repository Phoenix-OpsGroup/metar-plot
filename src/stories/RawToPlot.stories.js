"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svelte = exports.Vue = exports.Angular = exports.React = exports.Default = void 0;
var MetarPlot_1 = require("../MetarPlot");
exports.default = {
    title: 'MetarPlot/Raw Plot',
    parameters: {
        docs: {
            description: {
                component: "This Story follows the creation of a plot via a RAW Metar.  This will decode a raw METAR and generate a plot in metric or USCS.  If your METAR is already decoded, take a look at Manual Plot it will allow for manual mapping of data fields to the plot."
            }
        }
    },
    argTypes: {
        metar: {
            description: "Raw Metar",
            control: "text"
        },
        metric: {
            description: "Sets Units for Metar Plot, Metric: true, USCS: false",
            control: "boolean"
        },
        height: {
            description: "CSS height",
            control: "text"
        },
        width: {
            description: "CSS width",
            control: "text"
        }
    },
    args: {
        metar: "KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233",
        metric: false,
        height: "500px",
        width: "500px"
    },
};
var Template = function (args) {
    var metar = (0, MetarPlot_1.rawMetarToMetarPlot)(args.metar, args.metric);
    return "<img style=\"height:" + args.height + ";width:" + args.width + "\" src=" + (0, MetarPlot_1.metarToImgSrc)(metar) + " alt=\"metar\"/>";
};
exports.Default = Template.bind({});
exports.Default.parameters = {
    docs: {
        source: {
            code: "\nimport { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';\nlet metar : MetarPlot = rawMetarToMetarPlot(args.metar,args.metric)\n<img style={`height:${height};width:${args.width}`} src={metarToImgSrc(metar)} alt=\"metar\"/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
exports.React = Template.bind({});
exports.React.parameters = {
    docs: {
        source: {
            code: "\nimport { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';\nimport React from 'react';\n\nfunction getMetarImg(rawMetar: string){\n   let rawMetar = \"KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233\"\n   let metar = rawMetarToMetarPlot(rawMetar)\n   return (<img style={`height:${height};width:${args.width}`} src={metarToImgSrc(metar)} alt=\"metar\"/>)\n}",
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
            code: "\nimport { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';\n\n@Component({\n  selector:    'METAR',\n  templateUrl: './weather.component.html',\n})\nexport class Metar implements OnInit {\n  let rawMetar = \"KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233\"\n  let metar: MetarPlot = rawMetarToMetarPlot(rawMetar)\n  let style: string = \"height:100px;width:100px\"\n\n  public getSrc(){\n    return metarToImgSrc(code)\n  }\n}\n\nweather.component.html:\n\n<img style={{style}} src={{metarToImgSrc(metar)}} alt=\"metar\"/>\n",
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
            code: "\n<script>\n  import { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';\n  let rawMetar : string = \"KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233\"\n  let metar : MetarPlot = rawMetarToMetarPlot(rawMetar)\n</script>\n\n<style scoped>\n.metar {\n    height: 100px;\n    width: 100px;\n}\n</style>\n\n<template>\n  <img class=\"metar\" src={metarToImgSrc(metar)} alt=\"metar\"/>\n</template>",
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
            code: "\n<script lang=\"ts\">\n  import { metarToImgSrc, MetarPlot } from 'metar-plot';\n  export let rawMetar: string\n  let metar: MetarPlot = rawMetarToMetarPlot(rawMetar)\n</script>\n\n<style>\n.metar {\n    height: 100px;\n    width: 100px;\n}\n</style>\n\n<img class=\"metar\" src={metarToImgSrc(metar)} alt=\"metar\"/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
