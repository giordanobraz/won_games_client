import { Meta, StoryFn } from '@storybook/react';
import { BannerSlider, BannerSliderProps } from '.';
import { mock } from './mock';

export default {
  title: 'Components/BannerSlider',
  args: {
    items: mock,
  },
  argTypes: {
    items: { type: 'function' },
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  component: BannerSlider,
} as Meta;

export const Default: StoryFn<BannerSliderProps> = (args) => (
  <div className="mx-auto max-w-screen-lg">
    <BannerSlider {...args} />
  </div>
);
