import { createTheme } from '@mui/material';
import red from '@mui/material/colors/red';

export const customTheme = createTheme({
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
      light: '#FFF59A',
    },
    grey: {
      light: '#f1f1f2',
    },
  },
});
