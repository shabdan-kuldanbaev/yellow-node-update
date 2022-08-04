const appendParamsToUrl = (url, params) => {
  Object.entries(params).map(
    ([key, value]) => value && url.searchParams.append(key, `${value}`),
  );

  return url;
};

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

  let url;

  try {
    url = new URL(imageUrl);
  } catch {
    // TODO: remove as soon as the entire project will be testedd
    console.log({ imageUrl });

    return imageUrl;
  }

  return appendParamsToUrl(url, queryProps).toString();
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
