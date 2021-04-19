import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

export const LinearWrapper = withStyles((theme) => ({
  root: {
    height: 5,
    borderRadius: '2.5px',
    position: 'absolute',
    transform: 'translateX(-10px) translateY(11.5px)',
    width: '100%',
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey.light,
  },
  bar: {
    borderRadius: '2.5px',
    backgroundColor: theme.palette.yellow.dark,
  },
}))(LinearProgress);
