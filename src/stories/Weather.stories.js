"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Svelte = exports.Vue = exports.Angular = exports.React = exports.All = exports.Default = void 0;
var Weather_1 = require("../src/parts/Weather");
exports.default = {
    title: 'MetarPlot/Weather Symbols',
    parameters: {
        docs: {
            description: {
                component: "This Story shows how to create weather symbols in isolation.  This is useful for creating a legend or key on what the symbols mean."
            }
        }
    },
    argTypes: {
        code: {
            control: { type: 'select' },
            options: Object.keys(Weather_1.WEATHER),
        },
    },
    args: {
        code: 'RA'
    },
};
var Template = function (args) {
    return "<img src=" + (0, Weather_1.getWeatherImgSrc)(args.code) + " alt=" + args.code + "/>";
};
var AllTemplate = function () {
    var icons = "\n  <style>\n    .iconContainer{\n      width:100px;\n      height:full;\n      display:flex;\n      flex-flow:column;\n      margin:10px;\n      background-color:lightgrey;\n      border-radius:15px;\n      text-align: center;\n    }\n  </style>\n  ";
    Object.keys(Weather_1.WEATHER).forEach(function (code) {
        icons +=
            "<div class=\"iconContainer\">\n      <img src=\"" + (0, Weather_1.getWeatherImgSrc)(code) + "\" alt=\"" + code + "\"/>\n      <div style=\"display:flex;justify-items:center;justify-content:center;width:100px;\">\n        <span>" + code + "</span>\n      </div>\n      <div style=\"display:flex;justify-items:center;justify-content:center;width:100px;\">\n        <span>" + Weather_1.WEATHER[code].text + "</span>\n      </div>\n    </div>";
    });
    return "<div style=\"display:flex;flex-flow:wrap\">" + icons + "</div>";
};
exports.Default = Template.bind({});
exports.Default.parameters = {
    docs: {
        source: {
            code: "\nimport { getWeatherImgSrc } from 'metar-plot';\n\n<img src={getWeatherImgSrc(code)} alt={code}/>\n",
            language: "ts",
            type: "auto"
        }
    }
};
exports.All = AllTemplate.bind({});
exports.All.parameters = {
    docs: {
        source: {
            code: "\nlet icons = `\n<style>\n  .iconContainer{\n    width:100px;\n    height:full;\n    display:flex;\n    flex-flow:column;\n    margin:10px;\n    background-color:lightgrey;\n    border-radius:15px;\n    text-align: center;\n  }\n</style>\n`\nObject.keys(WEATHER).forEach(code => {\n  icons += \n  `<div class=\"iconContainer\">\n    <img src=\"${getWeatherImgSrc(code)}\" alt=\"${code}\"/>\n    <div style=\"display:flex;justify-items:center;justify-content:center;width:100px;\">\n      <span>${code}</span>\n    </div>\n    <div style=\"display:flex;justify-items:center;justify-content:center;width:100px;\">\n      <span>${WEATHER[code].text}</span>\n    </div>\n  </div>`\n});\nreturn `<div style=\"display:flex;flex-flow:wrap\">${icons}</div>`\n",
            language: "ts",
            type: "auto"
        }
    }
};
exports.React = Template.bind({});
exports.React.parameters = {
    docs: {
        source: {
            code: "\nimport { getWeatherImgSrc } from 'metar-plot';\nimport React from 'react';\n\nfunction getWeatherImg(code: string){\n  return <img src={getWeatherImgSrc(code)} alt={code}/>\n}",
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
            code: "\nimport { getWeatherImgSrc } from 'metar-plot';\n\n@Component({\n  selector:    'Weather',\n  templateUrl: './weather.component.html',\n})\nexport class Weather implements OnInit {\n  code: string = \"TA\"\n  \n  public getSrc(){\n    return getWeatherImgSrc(code)\n  }\n}\n\nweather.component.html:\n\n<img src={{getSrc()}} alt={{code}}/>\n",
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
            code: "\n<script>\n  import { getWeatherImgSrc } from 'metar-plot';\n  let code : string = \"RA\"\n</script>\n\n<template>\n  <img src={getWeatherImgSrc(code)} alt={code}/>\n</template>",
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
            code: "\n<script lang=\"ts\">\n  import { getWeatherImgSrc } from 'metar-plot';\n  let code: string = \"RA\"\n</script>\n\n<img src={getWeatherImgSrc(code)} alt={code}/>\n",
            language: "tsx",
            type: "auto"
        }
    }
};
