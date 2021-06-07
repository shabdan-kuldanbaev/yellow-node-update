/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Expand from 'react-expand-animated';
import cn from 'classnames';
import slugify from 'slugify';
import { HEADER_HEIGHT } from 'utils/constants';
import styles from './styles.module.scss';

export const Navigation = ({ articleBodyRef, slug }) => {
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
      const subtitleRefs = articleBodyRef.current.getElementsByTagName('h2');
      const subtitles = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const subtitleRef of subtitleRefs) {
        const subtitle = subtitleRef.textContent;
        const slug = slugify(subtitleRef.textContent);
        subtitleRef.setAttribute('id', slug);
        subtitles.push({
          id: slug,
          name: subtitle,
          element: subtitleRef,
        });
      }

      setSubtitles(subtitles);
    }

    return () => setIsNavigationOpened(false);
  }, [articleBodyRef, slug]);

  return (subtitles.length
    ? (
      <div className={styles.navigation}>
        <div className={styles.navigationHeader}>
          <p>Contents</p>
          <div className={styles.expandButton}>
            <span
              onClick={handleOnExpandClick}
              role="button"
              tabIndex="0"
            >
              {isNavigationOpened ? 'hide' : 'expand'}
            </span>
            <div className={cn(styles.arrow, {
              [styles.reverseArrow]: !isNavigationOpened,
            })}
            >
              <span />
              <span />
            </div>
          </div>
        </div>
        <Expand open={isNavigationOpened}>
          <div className={styles.navigationItems}>
            {subtitles.map((subtitle, index) => (
              <a
                data-index={index}
                key={subtitle.id}
                href={`#${subtitle.id}`}
                onClick={handleOnItemClick}
              >
                {`${index + 1}. ${subtitle.name}`}
              </a>
            ))}
          </div>
        </Expand>
      </div>
    ) : null);
};

Navigation.defaultProps = {
  articleBodyRef: null,
};

Navigation.propTypes = {
  articleBodyRef: PropTypes.instanceOf(Object),
  slug: PropTypes.string.isRequired,
};
