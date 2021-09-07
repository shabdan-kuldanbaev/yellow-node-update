import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { Svg } from 'components/Common/Svg';
import CaseStudiesFooter from 'components/CaseStudiesCommon/CaseStudiesFooter';
import Logo from 'components/Common/Logo';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import { footerData, socialMedia } from './utils/data';
import styles from './styles.module.scss';

export const Footer = ({ theme }) => {
  const { query: { project }, pathname } = useRouter();

  if (CASE_STUDIES_SLUGS.includes(project)) {
    return (
      <CaseStudiesFooter
        pathname={pathname}
        type={project}
      />
    );
  }

  const getItemContent = (type, item) => {
    switch (type) {
    case 'phone':
      return (
        <LinkWrapper
          path={item.path}
          isLocalLink
          googleAnalyticProps={{
            action: 'Click',
            data: 'Phone',
          }}
        >
          {item.subtitle}
        </LinkWrapper>
      );
    case 'email':
      return (
        <LinkWrapper
          path={item.path}
          isLocalLink
          googleAnalyticProps={{
            action: 'Click',
            data: 'Email',
          }}
          className={styles.email}
        >
          <span>{item.subtitle}</span>
        </LinkWrapper>
      );
    case 'navigation':
      return (
        <LinkWrapper
          path={item.path}
          isLocalLink
        >
          {item.subtitle}
        </LinkWrapper>
      );
    default:
      return null;
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.sideContent}>
          <Logo type="footer" />
          <p className={styles.text}>
            Software innovation powerhouse born to take
            your business to the top!
          </p>
          <div className={styles.socialMediaList}>
            {socialMedia && socialMedia.map(({
              type,
              title,
              link,
            }) => link && (
              <LinkWrapper
                key={`networks/${type}`}
                path={link}
                googleAnalyticProps={{
                  action: 'Click',
                  category: 'Social',
                  label: pathname,
                  data: title,
                }}
                isSocialLink
              >
                <Svg
                  type={type}
                  className={styles.svg}
                />
              </LinkWrapper>
            ))}
          </div>
        </div>
        <div className={styles.mainContent}>
          {footerData.map((item) => (
            <div className={styles.dataContainer}>
              <h3 className={styles.title}>{item.title}</h3>
              {item.links.map((link) => {
                const type = '';

                return (
                  <Fragment>
                    {link.title && <p className={cn(styles.text, styles.main)}>{link.title}</p>}
                    {link.path
                      ? getItemContent(link.type, link)
                      : <p className={styles.text}>{link.subtitle}</p>}
                  </Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomContent}>
        <div className={styles.text}>
          <span>© All right reserved. Yellow 2021</span>
        </div>
      </div>
    </footer>
  );
};

Footer.defaultProps = {
  theme: 'dark',
};

Footer.propTypes = {
  theme: PropTypes.string,
};
