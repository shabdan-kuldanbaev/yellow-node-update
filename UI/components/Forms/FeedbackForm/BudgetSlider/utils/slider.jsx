import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

export const SliderComponent = withStyles((theme) => ({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.background.default,
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: 0,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 0 0 8px rgba(255, 230, 3, 0.16)',
    },
  },
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
    background: theme.palette.yellow.dark,
  },
  rail: {
    height: 4,
    borderRadius: 4,
    opacity: 1,
    background: theme.palette.yellow.light,
  },
  mark: {
    width: 0,
    height: 4,
    borderRadius: 4,
  },
  markLabel: {
    color: theme.palette.text.secondary,
    transform: 'none',
    left: 'auto !important',
    top: 30,
    '&[data-index="0"]': {
      left: 0,
    },
    '&[data-index="1"]': {
      right: 0,
    },
    cursor: 'default',
  },
}))(Slider);
