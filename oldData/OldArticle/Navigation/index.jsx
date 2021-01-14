import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import slugify from 'slugify';
import styles from './styles.module.scss';

export const Navigation = ({ articleBodyRef }) => {
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    if (articleBodyRef && articleBodyRef.current) {
      const subtitleRefs = articleBodyRef.current.getElementsByTagName('h2');
      const subtitles = [];
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
  }, []);

  const onClick = (event) => {
    const index = event.target.getAttribute('data-index');
    window.scrollBy({
      // height of header is 85px
      top: subtitles[index].element.getBoundingClientRect().top,
      behavior: 'smooth',
    });

    event.preventDefault();
  };

  return (subtitles.length
    ? (
      <div className={`${styles.Navigation}`}>
        <div className={styles.Title}>Sections</div>
        {subtitles.map(({ id, name }, index) => (
          <Fragment>
            <a
              data-index={index}
              key={id}
              href={`#${id}`}
              onClick={onClick}
            >
              {name}
            </a>
            <br />
          </Fragment>
        ))}
      </div>
    ) : null
  );
};
