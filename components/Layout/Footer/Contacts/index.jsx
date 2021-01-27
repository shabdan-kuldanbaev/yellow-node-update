import React from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitle,
  ButtonMore,
  LinkWrapper,
  Animated,
} from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import { withRouter } from 'next/router';
import { socialNetworks } from './utils/data';
import rocket from './json/rocket.json';
import styles from './styles.module.scss';

const Contacts = ({ handleOnClick, router }) => (
  <div className={styles.contactsContainer}>
    <SectionTitle title="Contacts" styleTitle={styles.mobileFooterTitle} />
    <div className={styles.contacts}>
      <span>Email:</span>
      <span>
        <LinkWrapper
          path="mailto:hi@yellow.systems"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Email' }}
        >
          hi@yellow.systems
        </LinkWrapper>
      </span>
      <span>Phone US:</span>
      <span>
        <LinkWrapper
          path="tel:+1 415 670 9070"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
        >
          +1 415 670 9070
        </LinkWrapper>
      </span>
      <span>Phone BY:</span>
      <span>
        <LinkWrapper
          path="tel:+375293115249"
          isLocalLink
          googleAnalyticProps={{ action: 'Click', data: 'Phone' }}
        >
          +375 29 311 52 49
        </LinkWrapper>
      </span>
    </div>
    <div className={styles.social}>
      <div className={styles.icons}>
        {socialNetworks.map((network) => (
          <LinkWrapper
            key={`networks/${network.title}`}
            path={network.href}
            googleAnalyticProps={{
              category: 'Social',
              label: router.pathname,
              data: network.title,
            }}
          >
            <img
              src={network.image}
              alt={network.title}
            />
          </LinkWrapper>
        ))}
      </div>
    </div>
    <div className={styles.estimationButton}>
      <ButtonMore
        href="/"
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

Contacts.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  router: PropTypes.instanceOf(Object).isRequired,
};

export default withRouter(Contacts);
