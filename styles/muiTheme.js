import { createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffe603',
    },
    secondary: {
      main: '#fff492',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    text: {
      secondary: '#b8b8b8',
    },
    yellow: {
      dark: '#ffe603',
      light: '#fff492',
    },
    grey: {
      light: '#f1f1f2',
    },
  },
});
