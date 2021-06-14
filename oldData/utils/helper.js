export const formatDate = (date) => {
  let dd = date.getDate();

  if (dd < 10) dd = `0${dd}`;

  let mm = date.getMonth();

  if (mm < 10) mm = `0${mm}`;

  let yyyy = date.getFullYear();

  if (yyyy < 10) yyyy = `0${yyyy}`;

  if (yyyy > 1000) yyyy = Math.trunc(yyyy / 100).toString();

  return `${dd}/${mm}/${yyyy}`;
};