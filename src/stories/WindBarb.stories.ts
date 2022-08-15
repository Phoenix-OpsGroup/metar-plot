import { Story, Meta } from '@storybook/html';
import { MetarPlot } from '../MetarPlot';
import { windImgSrc } from '../parts/Wind';

export default {
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
} as Meta;

const Template: Story = (args) => {
    let metar : MetarPlot = {
        wind_speed: args.windSpeed,
        gust_speed: args.gustSpeed,
        wind_direction: args.windDirection,
    }
  return `<img src=${windImgSrc(metar)} alt="wind"/>`
};

export const Default = Template.bind({});

Default.parameters = {
  docs:{
    source: {
      code: `
import { windImgSrc } from 'metar-plot';
let metar : MetarPlot = {
    wind_speed: args.windSpeed,
    gust_speed: args.gustSpeed,
    wind_direction: args.windDirection,
}
<img src=\${windImgSrc(metar)} alt="wind"/>
`,
      language: "ts",
      type: "auto"
    }
  }
}

export const React = Template.bind({});
React.parameters = {
  docs:{
    source: {
      code: `
import { windImgSrc } from 'metar-plot';
import React from 'react';

function getWindBarb(wind_speed: string){
    let metar : MetarPlot = {
        wind_speed: windSpeed,
        gust_speed: gustSpeed,
        wind_direction: .windDirection,
    }
    return (<img src=\${windImgSrc(metar)} alt="wind"/>)
}`,
      language: "ts",
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
import { windImgSrc } from 'metar-plot';

@Component({
  selector:    'Weather',
  templateUrl: './weather.component.html',
})
export class Weather implements OnInit {
  code: string = "TA"
  let metar : MetarPlot = {
    wind_speed: args.windSpeed,
    gust_speed: args.gustSpeed,
    wind_direction: args.windDirection,
  }

  public getSrc(){
    return windImgSrc(metar)
  }
}

weather.component.html:

<img src={{getSrc()}} alt="wind"/>
`,
      language: "ts",
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
  import { windImgSrc } from 'metar-plot';
  let code : string = "RA"
</script>

<template>
    <img src=\${windImgSrc(metar)} alt="wind"/>
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
  import { windImgSrc } from 'metar-plot';
  let code: string = "RA"
</script>

<img src=\${windImgSrc(metar)} alt="wind"/>
`,
      language: "tsx",
      type: "auto"
    }
  }
}


