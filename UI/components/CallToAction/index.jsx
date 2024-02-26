'use client';

import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import { LINK_TYPE } from 'utils/constants/linkType';
import useProps from './utils/useProps';
import styles from './styles.module.scss';

const Contact = dynamic(() => import('./content/Contact'));
const GetBook = dynamic(() => import('./content/GetBook'));
const Subscribe = dynamic(() => import('./content/Subscribe'));
const ScrollBlock = dynamic(() => import('./content/ScrollBlock'));

const CallToAction = (props) => {
  const {
    titles,
    buttonTitle,
    type,
    images,
    downloadLink,
    handleOnClick,
    slug,
    ctaUrl,
    sectionRef,
    show,
    setShow,
    classNames,
    scrollTop,
    subtitle = '',
  } = useProps(props);

  return (
    <div className={classNames}>
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
              url={ctaUrl}
            />
          );
        case LINK_TYPE.scrollBlock:
          return (
            <ScrollBlock
              sectionRef={sectionRef}
              titles={titles}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              bookCover={images[0]}
              downloadLink={downloadLink}
              slug={slug}
              show={show}
              setShow={setShow}
            />
          );
        case LINK_TYPE.scrollTop:
          return (
            <Contact
              titles={titles}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              handleOnClick={scrollTop}
              url={ctaUrl}
            />
          );
        default:
          return (
            <Contact
              titles={titles}
              subtitle={subtitle}
              buttonTitle={buttonTitle}
              handleOnClick={handleOnClick}
              url={ctaUrl}
            />
          );
        }
      })()}
    </div>
  );
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
