const getQueryString = (params) => params && Object
  .entries(params)
  .map(([key, value]) => value && `${key}=${value}`)
  .join('&');

export const getOptimizedContentfulImage = (imageUrl, {
  width,
  height,
  fit,
  focusArea,
  fl,
  fm,
  isRounded,
  bg,
}) => {
  if (!imageUrl) {
    return '';
  }

  const queryProps = {
    w: width,
    h: height,
    f: focusArea,
    fm,
    fit,
    fl,
    bg,
  };

  if (isRounded) {
    queryProps.r = height;
  }

  const queryString = getQueryString(queryProps);

  return queryString
    ? `${imageUrl}?${queryString}`
    : imageUrl;
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
