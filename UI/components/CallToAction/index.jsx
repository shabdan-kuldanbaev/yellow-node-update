import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Button from 'UI/components/Button';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import { TYPOGRAPHY_SIZE, TYPOGRAPHY_TAGS } from 'UI/components/Typography/utils/useTypography';
import { LINK_TYPE } from 'utils/constants/linkType';
import GetBookModal from 'UI/components/Modals/GetBookModal';
import useProps from './utils/useProps';
import SubscribeInCTAForm from '../Forms/SubscribeInCTAForm';
import styles from './styles.module.scss';

const CallToAction = (props) => {
  const {
    titles,
    subtitle,
    buttonTitle,
    type,
    page,
    view,
    handleOnClick,
    className,
    images,
    isNew,
    isSubscribeFormShown,
    isGetBookShown,
    toggleGetBookModalShown,
    downloadLink,
    isSubscribed,
    onSubscribeSubmit,
    href,
    isOpenFeedbackForm,
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

      <div className={styles.content}>
        {
          (() => {
            switch (type) {
            case LINK_TYPE.book:
              return (
                <>
                  {titles?.map((titleText, index) => (
                    titleText && (
                      <Typography
                        variant={TYPOGRAPHY_TAGS.h3}
                        size={TYPOGRAPHY_SIZE.headline24}
                        className={cn(styles.h3, styles.title)}
                        key={`titleText/${index}`}
                      >
                        {titleText}
                      </Typography>
                    )
                  ))}
                  {subtitle && (
                    <Typography
                      variant={TYPOGRAPHY_TAGS.p}
                      className={cn(styles.p, styles.subtitle)}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </>
              );
            case LINK_TYPE.callToAction:
              return (
                <>
                  {isSubscribed && (
                    <Typography
                      variant={TYPOGRAPHY_TAGS.h3}
                      size={TYPOGRAPHY_SIZE.headline24}
                      className={cn(styles.h3, styles.title)}
                    >
                      Thanks for your attention!
                    </Typography>
                  )}
                  {isSubscribed && (
                    <Typography
                      variant={TYPOGRAPHY_TAGS.p}
                      className={cn(styles.p, styles.subtitle)}
                    >
                      Check Inbox to confirm your subscription
                    </Typography>
                  )}
                  {!isSubscribed && titles?.map((titleText, index) => (
                    titleText && (
                      <Typography
                        variant={TYPOGRAPHY_TAGS.h3}
                        size={TYPOGRAPHY_SIZE.headline24}
                        className={cn(styles.h3, styles.title)}
                        key={`titleText/${index}`}
                      >
                        {titleText}
                      </Typography>
                    )
                  )) }
                  {!isSubscribed && subtitle && (
                    <Typography
                      variant={TYPOGRAPHY_TAGS.p}
                      className={cn(styles.p, styles.subtitle)}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </>
              );
            default:
              return (
                <>
                  {titles?.map((titleText, index) => (
                    titleText && (
                      <Typography
                        variant={TYPOGRAPHY_TAGS.h3}
                        size={TYPOGRAPHY_SIZE.headline24}
                        className={styles.h3}
                        key={`titleText/${index}`}
                      >
                        {titleText}
                      </Typography>
                    )
                  ))}

                  {subtitle && (
                    <Typography
                      variant={TYPOGRAPHY_TAGS.p}
                      className={styles.p}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </>
              );
            }
          })()
        }
      </div>

      {isNew && isSubscribeFormShown && <SubscribeInCTAForm onSubmit={onSubscribeSubmit} />}

      {!isSubscribeFormShown && (
        <Button
          href={href}
          onClick={handleOnClick}
          className={styles.button}
          data-button
        >
          {buttonTitle}
        </Button>
      )}

      {type === LINK_TYPE.book && (
        <GetBookModal
          show={isGetBookShown}
          close={toggleGetBookModalShown}
          bookCover={images[0]}
          buttonText={buttonTitle}
          downloadLink={downloadLink}
        />
      )}
    </div>
  );
};

CallToAction.defaultProps = {
  href: '',
  handleOnClick: () => {},
  className: '',
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
