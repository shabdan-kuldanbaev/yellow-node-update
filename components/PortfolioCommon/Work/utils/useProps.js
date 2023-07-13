import { getImage } from 'utils/helper';
import { routes } from 'utils/routes';

export default ({
  work,
  customSlug: slugProp,
  position,
}) => {
  const {
    title,
    description,
    slug: rawSlug,
    mainImage,
    backgroundImage,
  } = work;

  const rawImage = mainImage || backgroundImage;
  const image = getImage(rawImage);

  const link = routes.project.getRoute(rawSlug);
  const revealDelay = 50 + 150 * (position % 2);

  const slug = slugProp || rawSlug;

  return {
    title,
    description,
    slug,
    revealDelay,
    link,
    image,
  };
};
