import { useEffect, memo } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import TypeSelector from 'components/TypeSelector';
import { ROUTES } from 'utils/constants';
import { isNumeric, setOverflowForBody } from 'utils/helper';
import styles from './styles.module.scss';

const Categories = ({ isMobileCategoties = false }) => {
  const { asPath, query: { slug: currentCategory }, push: routerPush } = useRouter();

  const categories = ROUTES.blog.categories.map(({ title, slug }) => ({ displayName: title, slug }));
  const selectedCategory = (!currentCategory || isNumeric(currentCategory))
    ? categories[0]
    : categories.slice(1).find((category) => currentCategory.includes(category.slug));

  useEffect(() => {
    setOverflowForBody(isMobileCategoties);
  }, [isMobileCategoties]);

  const goToCategory = ({ slug }) => {
    const { path } = ROUTES.blog.getRoute(slug);

    routerPush(path);
  };

  return (
    <div className={styles.categories}>
      <TypeSelector
        typeList={categories}
        selectedType={selectedCategory}
        onSelectedTypeChange={goToCategory}
      />
    </div>
  );
};

Categories.propTypes = {
  isMobileCategoties: PropTypes.bool,
};

export default memo(Categories);
