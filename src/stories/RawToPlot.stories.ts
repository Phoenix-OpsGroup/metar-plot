import { Story, Meta } from '@storybook/html';
import { metarToImgSrc, rawMetarToMetarPlot } from '../MetarPlot';

export default {
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

} as Meta;

const Template: Story = (args) => {
  let metar = rawMetarToMetarPlot(args.metar, args.metric)

  return `<img style="height:${args.height};width:${args.width}" src=${metarToImgSrc(metar)} alt="metar"/>`
};

export const Default = Template.bind({});
Default.parameters = {
  docs: {
    source: {
      code: `
import { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';
let metar : MetarPlot = rawMetarToMetarPlot(args.metar,args.metric)
<img style={\`height:\${height};width:\${args.width}\`} src={metarToImgSrc(metar)} alt="metar"/>
`,
      language: "tsx",
      type: "auto"
    }
  }
}

export const React = Template.bind({});
React.parameters = {
  docs: {
    source: {
      code: `
import { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';
import React from 'react';

function getMetarImg(rawMetar: string){
   let rawMetar = "KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233"
   let metar = rawMetarToMetarPlot(rawMetar)
   return (<img style={\`height:\${height};width:\${args.width}\`} src={metarToImgSrc(metar)} alt="metar"/>)
}`,
      language: "tsx",
      type: "auto"
    }
  }
}

export const Angular = Template.bind({},);
Angular.args = {
  code: "RA",
};
Angular.parameters = {
  docs: {
    source: {
      code: `
import { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';

@Component({
  selector:    'METAR',
  templateUrl: './weather.component.html',
})
export class Metar implements OnInit {
  let rawMetar = "KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233"
  let metar: MetarPlot = rawMetarToMetarPlot(rawMetar)
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

export const Vue = Template.bind({},);
Vue.args = {
  code: "RA",
};
Vue.parameters = {
  docs: {
    source: {
      code: `
<script>
  import { metarToImgSrc, rawMetarToMetarPlot, MetarPlot } from 'metar-plot';
  let rawMetar : string = "KMCO 142008Z 31008KT 7SM TSRA FEW012 BKN024CB BKN110 OVC250 27/23 A2997 RMK AO2 LTG DSNT E-S RAB1955 OCNL LTGICCG OHD-N-E TS OHD-N-E MOV SE CB DSNT E-S P0000 T02720233"
  let metar : MetarPlot = rawMetarToMetarPlot(rawMetar)
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

export const Svelte = Template.bind({},);
Svelte.args = {
  code: "RA",
};
Svelte.parameters = {
  docs: {
    source: {
      code: `
<script lang="ts">
  import { metarToImgSrc, MetarPlot } from 'metar-plot';
  export let rawMetar: string
  let metar: MetarPlot = rawMetarToMetarPlot(rawMetar)
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