import cn from 'classnames';
import Svg from 'UI/components/Svg';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from './styles.module.scss';

const BookmarkContainer = ({
  title,
  buttonTitle = 'See post',
  url,
  containerClass,
  titleClass,
  buttonClass,
}) => (
  <div className={cn(styles.bookmarkContainer, containerClass)}>
    <Svg
      type="bookMark"
      className={styles.bookmarkIcon}
    />
    <div className={styles.content}>
      <h3 className={cn(styles.title, titleClass)}>
        {title}
      </h3>
      <LinkWrapper
        path={url}
        className={cn(styles.button, buttonClass)}
      >
        {buttonTitle}
      </LinkWrapper>
    </div>
  </div>
);

export default BookmarkContainer;
