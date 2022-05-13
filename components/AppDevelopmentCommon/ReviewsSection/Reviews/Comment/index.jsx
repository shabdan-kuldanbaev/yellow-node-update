import React from 'react';
import PropTypes from 'prop-types';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import styles from './styles.module.scss';

export const Comment = ({
  comment: {
    logo,
    name,
    message,
    text,
    avatar,
    position,
  },
  infoRef,
}) => (
  <div
    className={styles.commentWrapper}
  >
    <section
      className={styles.commentContainer}
      ref={infoRef}
    >
      <div className={styles.messageWrapper}>
        <div className={styles.imgContainer}>
          <Svg
            type={logo}
            className={styles.logo}
          />
        </div>
        <div
          className={styles.message}

        >
          {message}
          <ContentfulParser document={text} />
        </div>
      </div>
      <div
        className={styles.categoryName}
      >
        <div className={styles.person}>
          <div className={styles.avatarContainer}>
            <img
              src={avatar}
              alt={name}
              className={styles.photo}
            />
          </div>
          <div className={styles.info}>
            <span className={styles.name}>
              {name}
            </span>
            <span className={styles.position}>
              {position}
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

Comment.defaultProps = {
  infoRef: null,
};

Comment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
  infoRef: PropTypes.instanceOf(Object),
};
