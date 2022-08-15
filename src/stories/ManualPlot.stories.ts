import { Story, Meta } from '@storybook/html';
import { metarToImgSrc } from '../MetarPlot';
import { WEATHER } from '../parts/Weather';
import { CONDITIONS, CLOUDS } from '../parts/Cloud';

export default {
    title: 'MetarPlot/Manual Plot',
    argTypes: {
        visability: {
            control: {
                type: "number"
            }
        },
        temperature: {
            control: {
                type: "number"
            }
        },
        dewPoint: {
            control: {
                type: "number"
            }
        },
        station: {
            control: "text"
        },
        windDirection: {
            control: {
                type: "number",
                min: 0,
                max: 359
            }
        },
        windSpeed: {
            control: {
                type: "number"
            }
        },
        gustSpeed: {
            control: {
                type: "number"
            }
        },
        pressure: {
            control: {
                type: "number"
            }
        },
        wxCode: {
            control: { type: 'select' },
            options: Object.keys(WEATHER),
        },
        condition: {
            control: { type: 'select' },
            options: Object.keys(CONDITIONS),
        },
        coverage: {
            control: { type: 'select' },
            options: Object.keys(CLOUDS),
        },
        height: {
            control: "text"
        },
        width: {
            control: "text"
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
        ceiling: 15000,
        wxCode: "RA",
        condition: "VFR",
        coverage: "FEW",
        metric: false,
        height: "500px",
        width: "500px"
    },

} as Meta;

const Template: Story = (args) => {
    let metar = {
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
    }

    return `<img style="height:${args.height};width:${args.width}" src=${metarToImgSrc(metar)} alt="metar"/>`
};

export const Default = Template.bind({});
Default.parameters = {
    docs:{
      source: {
        code: `
import { metarToImgSrc, MetarPlot } from 'metar-plot';
let metar : MetarPlot = {
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
}
<img style={\`height:\${height};width:\${args.width}\`} src={metarToImgSrc(metar)} alt="metar"/>
`,
        language: "tsx",
        type: "auto"
      }
    }
  }


export const React = Template.bind({});
React.parameters = {
  docs:{
    source: {
      code: `
import { metarToImgSrc, MetarPlot } from 'metar-plot';
import React from 'react';

function getMetarImg(metar: MetarPlot){
  return (<img style={\`height:\${height};width:\${args.width}\`} src={metarToImgSrc(metar)} alt="metar"/>)
}`,
      language: "tsx",
      type: "auto"
    }
  }
}

export const Angular = Template.bind({}, );
Angular.args = {
  code: "RA",
};
Angular.parameters = {
  docs:{
    source: {
      code: `
import { metarToImgSrc, MetarPlot } from 'metar-plot';

@Component({
  selector:    'METAR',
  templateUrl: './weather.component.html',
})
export class Metar implements OnInit {
  let metar: MetarPlot = new MetarPlot()
  let style: string = "height:100px;width:100px"

  public getSrc(){
    return metarToImgSrc(code)
  }
}

weather.component.html:

<img style={{style}} src={{metarToImgSrc(metar)}} alt="metar"/>
`,
      language: "tsx",
      type: "auto"
    }
  }
}

export const Vue = Template.bind({}, );
Vue.args = {
  code: "RA",
};
Vue.parameters = {
  docs:{
    source: {
      code: `
<script>
  import { metarToImgSrc, MetarPlot } from 'metar-plot';
  let metar : MetarPlot;
</script>

<style scoped>
.metar {
    height: 100px;
    width: 100px;
}
</style>

<template>
  <img class="metar" src={metarToImgSrc(metar)} alt="metar"/>
</template>`,
      language: "tsx",
      type: "auto"
    }
  }
}

export const Svelte = Template.bind({}, );
Svelte.args = {
  code: "RA",
};
Svelte.parameters = {
  docs:{
    source: {
      code: `
<script lang="ts">
  import { metarToImgSrc, MetarPlot } from 'metar-plot';
  export let metar: MetarPlot;
</script>

<style>
.metar {
    height: 100px;
    width: 100px;
}
</style>

<img class="metar" src={metarToImgSrc(metar)} alt="metar"/>
`,
      language: "tsx",
      type: "auto"
    }
  }
}