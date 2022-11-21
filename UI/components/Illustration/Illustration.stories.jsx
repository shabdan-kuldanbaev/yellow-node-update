import Illustration from '.';

export default {
  title: 'Design system/Components/Illustration',
  component: Illustration,
};

const Template = (args) => (
  <Illustration
    style={{ width: 500, height: 300, img: { objectFit: 'cover' } }}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://images.ctfassets.net/0nm5vlv2ad7a/1kZBFa2d0unNSTRMho8O3H/07bb606a139b832d1930d467d56defdf/wf1.png',
};

export const Svg = Template.bind({});
Svg.args = {
  src: 'https://images.ctfassets.net/0nm5vlv2ad7a/1LtSRbPv8iiXlbCqOEvpPI/3b9fbad33205d7f4c8d8cd61187719a6/MobileBankAppTechnologyMobile.svg',
};

export const Webp = Template.bind({});
Webp.args = {
  src: 'https://images.ctfassets.net/0nm5vlv2ad7a/4iM7e9x8qtQ6GeDD7sOlBT/c331e351c8dd595c9a3f07af2cbe7d6f/chat__1_.webp',
};

export const WithApi = Template.bind({});
WithApi.args = {
  src: 'https://images.ctfassets.net/0nm5vlv2ad7a/1kZBFa2d0unNSTRMho8O3H/07bb606a139b832d1930d467d56defdf/wf1.png',
  apiParams: {
    r: 120,
    q: 15,
  },
};
