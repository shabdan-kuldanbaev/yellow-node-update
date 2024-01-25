import { withStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { commonSliderStyles } from './utils/data';

export const LinearWrapper = withStyles((theme) => ({
  root: {
    height: 5,
    position: 'absolute',
    transform: 'translateX(-10px) translateY(11.5px)',
    width: '100%',
    ...commonSliderStyles,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey.light,
  },
  bar: {
    backgroundColor: theme.palette.yellow.dark,
    ...commonSliderStyles,
  },
}))(LinearProgress);
