import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { Animated } from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import { LinkWrapper } from 'components/Common/LinkWrapper';
import { SectionTitle } from 'components/Common/SectionTitle';
import { Svg } from 'components/Common/Svg';
import { ANIMATED_TYPE } from 'utils/constants';
import { socialNetworks } from './utils/data';
import rocket from './json/rocket.json';
import styles from './styles.module.scss';

const Contacts = ({
  handleOnClick,
  router,
  socialNetworks: socialLinks,
}) => (
  <div className={styles.contactsContainer}>
    <SectionTitle
      title="Contacts"
      styleTitle={styles.mobileFooterTitle}
    />
    <div className={styles.contacts}>
      <span>Email:</span>
      <span>
        <LinkWrapper
          path="mailto:hi@yellow.systems"
          isLocalLink
          googleAnalyticProps={{
            action: 'Click',
            data: 'Email',
          }}
        >
          hi@yellow.systems
        </LinkWrapper>
      </span>
      <span>Phone US:</span>
      <span>
        <LinkWrapper
          path="tel:+1 415 670 9070"
          isLocalLink
          googleAnalyticProps={{
            action: 'Click',
            data: 'Phone',
          }}
        >
          +1 415 670 9070
        </LinkWrapper>
      </span>
      <span>Phone BY:</span>
      <span>
        <LinkWrapper
          path="tel:+375293115249"
          isLocalLink
          googleAnalyticProps={{
            action: 'Click',
            data: 'Phone',
          }}
        >
          +375 29 311 52 49
        </LinkWrapper>
      </span>
    </div>
    <div className={styles.social}>
      <div className={styles.icons}>
        {socialLinks && socialLinks.map(({ title, href, type }) => (
          <LinkWrapper
            key={`networks/${title}`}
            path={href}
            googleAnalyticProps={{
              category: 'Social',
              label: router.pathname,
              data: title,
            }}
            isSocialLink
          >
            <Svg type={type} />
          </LinkWrapper>
        ))}
      </div>
    </div>
    <div className={styles.estimationButton}>
      <ButtonMore
        title="Get an estimation"
        buttonStyle={styles.button}
        handleOnClick={handleOnClick}
      />
    </div>
    <div className={styles.text}>
      <span>© Copyright 2020 Yellow.</span>
      <span> All Rights Reserved. Privacy Policy</span>
    </div>
    <div className={styles.rocket}>
      <Animated
        type={ANIMATED_TYPE.isJSON}
        jsonFile={rocket}
        className={styles.jsonWrapper}
      />
      <div className={styles.stars} />
      <div className={styles.stars2} />
    </div>
  </div>
);

Contacts.defaultProps = {
  socialNetworks,
};

Contacts.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  router: PropTypes.instanceOf(Object).isRequired,
  socialNetworks: PropTypes.instanceOf(Array),
};

export default withRouter(Contacts);
