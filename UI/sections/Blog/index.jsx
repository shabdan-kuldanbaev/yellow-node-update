import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SwiperSlide } from 'swiper/react';
import Button from 'UI/components/Button';
import BlogCard from 'UI/components/Cards/BlogCard';
import SectionTitle from 'UI/components/SectionTitle';
import CustomSwiper from 'UI/containers/CustomSwiper';
import { REVEAL_ANIMATION_PROPS, ROUTES } from 'utils/constants';
import Animated from 'UI/containers/Animated';
import { selectArticles } from 'redux/selectors/blog';
import { useBlog } from './utils/useBlog';
import styles from './styles.module.scss';

const Blog = (props) => {
  const {
    title,
    description,
    articles,
    swiperProps,
  } = useBlog(props);

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
            <SwiperSlide>
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
  articles: PropTypes.instanceOf(Array).isRequired,
  sectionData: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ articles: selectArticles(state) }),
)(Blog);
