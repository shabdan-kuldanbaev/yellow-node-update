const getQueryString = (params) => params && Object
  .entries(params)
  .reduce(([key, value], queryProps) => {
    if (value) {
      return [...queryProps, `${key}=${value}`];
    }

    return queryProps;
  }, [])
  .join('&');

export const getOptimizedContentfulImage = (imageUrl, {
  width,
  height,
  isRounded,
  focusArea,
  ...rest
}) => {
  if (!imageUrl) {
    return '';
  }

  const queryProps = {
    w: width,
    h: height,
    f: focusArea,
    ...rest,
  };

  if (isRounded) {
    queryProps.r = height;
  }

  const queryString = getQueryString(queryProps);

  return `${imageUrl}?${queryString}`;
};

export const patchImageUrl = (url, replace, replaceSymbol) => {
  const regexp = new RegExp(`${replaceSymbol}=\\d+`);

  if (url.match(regexp)) {
    const value = +regexp.exec(url)[0].slice(2);

    if (value > replace) {
      return url.replace(regexp, `${replaceSymbol}=${replace}`);
    }
  }

  return url;
};
