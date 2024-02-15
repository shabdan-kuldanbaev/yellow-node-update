import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import Button from 'UI/components/Button';
import SectionTitle from 'UI/components/SectionTitle';
import CustomSwiper from 'UI/containers/CustomSwiper';
import { REVEAL_ANIMATION_PROPS, ROUTES } from 'utils/constants';
import { useBlog } from './utils/useBlog';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const BlogCard = dynamic(() => import('UI/components/Cards/BlogCard'), { ssr: false });

const Blog = async (props) => {
  const {
    title,
    description,
    articles,
    swiperProps,
  } = await useBlog(props);

  return (
    <section className={styles.blog}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <CustomSwiper
          isShowNavigation
          swiperParams={swiperProps}
          className={styles.swiperWrapper}
          navigationClassName={styles.swiperNavigation}
        >
          {articles?.slice(0, 3).map((article, index) => (
            <SwiperSlide key={index}>
              <BlogCard
                {...article}
                index={index}
              />
            </SwiperSlide>
          ))}

        </CustomSwiper>

        <Animated {...REVEAL_ANIMATION_PROPS}>
          <Button
            secondary
            href={ROUTES.blog.path}
            className={styles.blogButton}
          >
            Read more
          </Button>
        </Animated>
      </div>
    </section>
  );
};

Blog.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
};

export default Blog;
