import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import CustomImage from 'components/Common/CustomImage';
import Svg from 'components/Common/Svg';
import styles from './styles.module.scss';

export const Comment = ({
  comment: {
    logo,
    name,
    message,
    avatar,
    position,
  },
  animatioProps,
  infoRef,
}) => (
  <div className={styles.commentWrapper}>
    <Animated {...animatioProps}>
      <section>
        <div>
          <div>
            <div className={styles.messageWrapper}>
              <div className={styles.imgContainer}>
                <Svg
                  type={logo}
                  className={styles.logo}
                />
              </div>
              <div className={styles.message}>
                {message}
              </div>
            </div>
          </div>
          <div
            className={styles.categoryName}
            ref={infoRef}
          >
            <div className={styles.person}>
              <div>
                <CustomImage
                  src={avatar}
                  alt={name}
                  layout="responsive"
                  width={58}
                  height={58}
                  containerClasses={styles.avatarContainer}
                  className={styles.photo}
                />
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
          </div>
        </div>
      </section>
    </Animated>
  </div>
);

Comment.defaultProps = {
  infoRef: null,
};

Comment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
  infoRef: PropTypes.instanceOf(Object),
};
