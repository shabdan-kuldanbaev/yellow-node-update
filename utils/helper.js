export const themes = {
  dark: {
    main: '#FFF',
    secondary: '#000',
  },
  light: {
    main: '#000',
    secondary: '#FFF',
  },
};

export const addThousandsSeparators = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const toInt = str => parseInt(str, 10);