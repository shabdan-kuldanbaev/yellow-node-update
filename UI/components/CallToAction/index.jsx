import cn from 'classnames';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import { LINK_TYPE } from 'utils/constants/linkType';
import Contact from './content/Contact';
import GetBook from './content/GetBook';
import Subscribe from './content/Subscribe';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const CallToAction = (props) => {
  const {
    titles,
    subtitle,
    buttonTitle,
    type,
    page,
    view,
    className,
    images,
    isNew,
    downloadLink,
    isSubscribed,
    isOpenFeedbackForm,
    handleOnClick,
    slug,
  } = useProps(props);

  return (
    <div
      className={cn(
        styles[type],
        styles[view],
        styles[page],
        className,
        {
          [styles.openContact]: isOpenFeedbackForm,
          [styles.new]: isNew,
          [styles.card]: !isNew,
          [styles.isSubscribed]: isSubscribed,
        },
      )}
    >
      {images.map(({ url, alt }, i) => (
        <Illustration
          src={url}
          alt={alt}
          className={cn(styles.image, styles[`image-${i}`])}
        />
      ))}
      {(() => {
        switch (type) {
        case LINK_TYPE.subscribe:
          return (
            <Subscribe
              titles={titles}
              isSubscribed={isSubscribed}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              slug={slug}
            />
          );
        case LINK_TYPE.book:
          return (
            <GetBook
              titles={titles}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              bookCover={images[0]}
              downloadLink={downloadLink}
              slug={slug}
            />
          );
        case LINK_TYPE.callToAction:
          return (
            <Contact
              titles={titles}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              handleOnClick={handleOnClick}
            />
          );
        default:
          return (
            <Contact
              titles={titles}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              handleOnClick={handleOnClick}
            />
          );
        }
      })()}
    </div>
  );
};

CallToAction.defaultProps = {
  href: '',
  handleOnClick: () => {},
  className: null,
  title: '',
  subtitle: '',
  data: {},
};

CallToAction.propTypes = {
  data: PropTypes.instanceOf(Object), // It's preferred to pass CTA data with single AS_IS entry. not separate fields
  title: PropTypes.string,
  subtitle: PropTypes.string,
  buttonTitle: PropTypes.string,
  href: PropTypes.string,
  type: PropTypes.string,
  handleOnClick: PropTypes.func,
  className: PropTypes.string,
};

export default CallToAction;
