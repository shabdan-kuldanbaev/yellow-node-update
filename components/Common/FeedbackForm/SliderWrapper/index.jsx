import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { commonSliderStyles } from './utils/data';

export const SliderWrapper = withStyles((theme) => ({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.default,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 0 0 8px rgba(255, 230, 3, 0.16)',
    },
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    ...commonSliderStyles,
  },
  rail: {
    ...commonSliderStyles,
  },
  mark: {
    width: 0,
    ...commonSliderStyles,
  },
  markLabel: {
    color: theme.palette.text.secondary,
    top: 30,
    '&[data-index="0"]': {
      left: '1% !important',
    },
    '&[data-index="1"]': {
      left: '90% !important',
    },
    cursor: 'default',
  },
  '@media (max-width: 768px)': {
    markLabel: {
      top: 40,
      '&[data-index="0"]': {
        left: '2% !important',
      },
      '&[data-index="1"]': {
        left: '85% !important',
      },
    },
  },
}))(Slider);
