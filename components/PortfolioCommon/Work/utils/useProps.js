import { getImage } from 'utils/helper';
import { routes } from 'utils/routes';

export default ({
  work,
  position = 0,
}) => {
  const {
    title,
    description,
    slug,
    mainImage,
    backgroundImage,
  } = work;

  const rawImage = mainImage || backgroundImage;
  const image = getImage(rawImage);

  const link = routes.project.getRoute(slug);
  const revealDelay = 50 + 150 * (position % 2);

  return {
    title,
    description,
    slug,
    revealDelay,
    link,
    image,
  };
};
