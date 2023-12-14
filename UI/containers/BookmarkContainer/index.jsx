import dynamic from 'next/dynamic';
import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const BookmarkContainer = ({
  title,
  buttonTitle,
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
        {buttonTitle || 'Read more'}
      </LinkWrapper>
    </div>
  </div>
);

export default BookmarkContainer;
