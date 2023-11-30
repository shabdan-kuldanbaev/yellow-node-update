import React from 'react';
import dynamic from 'next/dynamic';
import LinkWrapper from 'UI/components/LinkWrapper';
import usePersonProps from './utils/usePersonProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const Media = dynamic(() => import('UI/components/Media'));
const Svg = dynamic(() => import('UI/components/Svg'));

const PersonIntro = ({ introSection, ...props }) => {
  const {
    avatar,
    fullName,
    position,
    quote,
    bio,
    socialMedia,
  } = usePersonProps(props);

  return (
    <section
      ref={introSection}
      className={styles.introSection}
    >
      <div className={styles.contentWrapper}>
        <Animated type="isReveal">
          <Media
            asset={avatar}
            className={styles.avatar}
          />
        </Animated>
        <div className={styles.infoContainer}>
          {fullName && <h1 className={styles.fullName}>{fullName}</h1>}
          {position && <p className={styles.position}>{position}</p>}
          {quote && (
            <p className={styles.quote}>
              <Svg
                type="bookMarkQuote"
                className={styles.bookMarkQuoteIcon}
              />
              {quote}
            </p>
          )}
          {bio && <p className={styles.biography}>{bio}</p>}
          {!!socialMedia.length && (
            <div className={styles.socialMediaList}>
              {socialMedia.map(({ svgType, url }) => (
                <LinkWrapper
                  key={svgType}
                  path={url}
                >
                  <Svg
                    type={svgType}
                    className={styles.socialMediaIcon}
                  />
                </LinkWrapper>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PersonIntro;
