import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));
const Animated = dynamic(() => import('UI/containers/Animated'));

export const Comment = ({
  comment: {
    logo,
    name,
    message,
    avatar,
    position,
  },
  animatioProps,
  infoRef = null,
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
              <Illustration
                src={avatar}
                alt={name}
                width={58}
                height={58}
                quality={undefined}
                containerClasses={styles.avatarContainer}
                className={styles.photo}
                isStatic
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
      </section>
    </Animated>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.instanceOf(Object).isRequired,
  animatioProps: PropTypes.instanceOf(Object).isRequired,
  infoRef: PropTypes.instanceOf(Object),
};
