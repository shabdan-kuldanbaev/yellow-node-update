/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import slugify from 'slugify';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE, HEADER_HEIGHT } from 'utils/constants';
import styles from './styles.module.scss';

export const NavigationByTitles = ({ articleBodyRef, articleSlug }) => {
  const [subtitles, setSubtitles] = useState([]);
  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  const handleOnExpandClick = () => setIsNavigationOpened(!isNavigationOpened);

  const handleOnItemClick = (event) => {
    const index = event.target.getAttribute('data-index');

    window.scrollBy({
      top: subtitles[index].element.getBoundingClientRect().top - HEADER_HEIGHT,
      behavior: 'smooth',
    });
    event.preventDefault();
  };

  useEffect(() => {
    if (articleBodyRef && articleBodyRef.current) {
      const subtitleRefs = articleBodyRef.current.getElementsByTagName('h2') || [];
      const subtitles = [...subtitleRefs].reduce((acc, subtitleRef) => {
        const subtitle = subtitleRef.textContent;
        const slug = slugify(subtitle);
        subtitleRef.setAttribute('id', slug);
        acc.push({
          id: slug,
          name: subtitle,
          element: subtitleRef,
        });

        return acc;
      }, []);

      setSubtitles(subtitles);
    }

    return () => setIsNavigationOpened(false);
  }, [articleBodyRef, articleSlug]);

  if (!subtitles.length) {
    return null;
  }

  return (
    <div className={styles.navigation}>
      <div className={styles.navigationHeader}>
        <span className={styles.title}>
          Contents
        </span>
        <button
          className={styles.expandButton}
          onClick={handleOnExpandClick}
          type="button"
        >
          <span className={styles.buttonText}>
            {isNavigationOpened ? 'hide' : 'expand'}
          </span>
          <div className={cn(styles.arrow, {
            [styles.reverseArrow]: !isNavigationOpened,
          })}
          >
            <span />
            <span />
          </div>
        </button>
      </div>
      <Animated
        type={ANIMATED_TYPE.expandByHeight}
        open={isNavigationOpened}
      >
        <div className={styles.navigationItems}>
          {subtitles.map((subtitle, index) => (
            <a
              data-index={index}
              key={subtitle.id}
              href={`#${subtitle.id}`}
              onClick={handleOnItemClick}
              className={styles.navigationLink}
            >
              {`${index + 1}. ${subtitle.name}`}
            </a>
          ))}
        </div>
      </Animated>
    </div>
  );
};

NavigationByTitles.defaultProps = {
  articleBodyRef: null,
  articleSlug: '',
};

NavigationByTitles.propTypes = {
  articleBodyRef: PropTypes.instanceOf(Object),
  articleSlug: PropTypes.string,
};
