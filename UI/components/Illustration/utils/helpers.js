export const getContentfulImage = ({
  src,
  width,
  quality,
  progressive,
  format,
  transparent,
  ...params
}) => {
  try {
    const url = new URL(src);

    let fm = format || (transparent ? 'webp' : 'jpg');
    let fl = null;

    if (!format && src.includes('.svg')) {
      fm = null;
    }

    if (fm === 'jpg') {
      fl = 'progressive';
    }

    fm && url.searchParams.set('fm', fm);
    width && url.searchParams.set('w', width);
    quality && url.searchParams.set('q', quality);
    fl && url.searchParams.set('fl', fl);

    Object.entries(params).forEach(([key, value]) => key && value && url.searchParams.set(key, value));

    return url;
  } catch {
    return src;
  }
};
