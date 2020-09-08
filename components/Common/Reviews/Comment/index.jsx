import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components';
import styles from './styles.module.scss';

export const Comment = ({ comment, animatioProps }) => (
  <div className={styles.commentWrapper}>
    <Animated {...animatioProps}>
      <section>
        <div>
          <div>
            <div className={styles.messageWrapper}>
              <img
                src={comment.logo}
                alt={comment.name}
                className={styles.logo}
              />
              <div className={styles.message}>{comment.message}</div>
            </div>
          </div>
          <div className={styles.categoryName}>
            <div className={styles.person}>
              <div>
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className={styles.photo}
                />
                <div className={styles.info}>
                  <span className={styles.name}>{comment.name}</span>
                  <span className={styles.position}>{comment.position}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Animated>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
};
