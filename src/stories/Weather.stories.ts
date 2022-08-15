import { Story, Meta } from '@storybook/html';
import { getWeatherImgSrc, WEATHER } from '../parts/Weather';

export default {
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
      options: Object.keys(WEATHER),
    },
  },
  args: {
    code: 'RA'
  },

} as Meta;

const Template: Story = (args) => {
  return `<img src=${getWeatherImgSrc(args.code)} alt=${args.code}/>`
};

const AllTemplate: Story = () => {
  let icons = `
  <style>
    .iconContainer{
      width:100px;
      height:full;
      display:flex;
      flex-flow:column;
      margin:10px;
      background-color:lightgrey;
      border-radius:15px;
      text-align: center;
    }
  </style>
  `
  Object.keys(WEATHER).forEach(code => {
    icons += 
    `<div class="iconContainer">
      <img src="${getWeatherImgSrc(code)}" alt="${code}"/>
      <div style="display:flex;justify-items:center;justify-content:center;width:100px;">
        <span>${code}</span>
      </div>
      <div style="display:flex;justify-items:center;justify-content:center;width:100px;">
        <span>${WEATHER[code].text}</span>
      </div>
    </div>`
  });
  return `<div style="display:flex;flex-flow:wrap">${icons}</div>`
}


export const Default = Template.bind({});

Default.parameters = {
  docs:{
    source: {
      code: `
import { getWeatherImgSrc } from 'metar-plot';

<img src={getWeatherImgSrc(code)} alt={code}/>
`,
      language: "ts",
      type: "auto"
    }
  }
}

export const All = AllTemplate.bind({})
All.parameters = {
  docs:{
    source: {
      code: `
let icons = \`
<style>
  .iconContainer{
    width:100px;
    height:full;
    display:flex;
    flex-flow:column;
    margin:10px;
    background-color:lightgrey;
    border-radius:15px;
    text-align: center;
  }
</style>
\`
Object.keys(WEATHER).forEach(code => {
  icons += 
  \`<div class="iconContainer">
    <img src="\${getWeatherImgSrc(code)}" alt="\${code}"/>
    <div style="display:flex;justify-items:center;justify-content:center;width:100px;">
      <span>\${code}</span>
    </div>
    <div style="display:flex;justify-items:center;justify-content:center;width:100px;">
      <span>\${WEATHER[code].text}</span>
    </div>
  </div>\`
});
return \`<div style="display:flex;flex-flow:wrap">\${icons}</div>\`
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
import { getWeatherImgSrc } from 'metar-plot';
import React from 'react';

function getWeatherImg(code: string){
  return <img src={getWeatherImgSrc(code)} alt={code}/>
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
import { getWeatherImgSrc } from 'metar-plot';

@Component({
  selector:    'Weather',
  templateUrl: './weather.component.html',
})
export class Weather implements OnInit {
  code: string = "TA"
  
  public getSrc(){
    return getWeatherImgSrc(code)
  }
}

weather.component.html:

<img src={{getSrc()}} alt={{code}}/>
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
  import { getWeatherImgSrc } from 'metar-plot';
  let code : string = "RA"
</script>

<template>
  <img src={getWeatherImgSrc(code)} alt={code}/>
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
  import { getWeatherImgSrc } from 'metar-plot';
  let code: string = "RA"
</script>

<img src={getWeatherImgSrc(code)} alt={code}/>
`,
      language: "tsx",
      type: "auto"
    }
  }
}


