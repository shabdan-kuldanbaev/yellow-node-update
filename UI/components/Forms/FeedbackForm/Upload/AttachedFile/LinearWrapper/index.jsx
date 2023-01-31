import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
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
