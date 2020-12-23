import React from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';
import {
  SectionTitle,
  ButtonMore,
  LinkWrapper,
  Animated,
} from 'components';
import { animatedType } from 'utils/constants';
import { socialNetworks } from './utils/data';
// TODO import { rocketIcon } from './images';
import rocket from './json/rocket.json';
import styles from './styles.module.scss';

export const Contacts = ({ handleOnClick }) => {
  const trackSocialIconClick = (event) => {
    const social = event.target.getAttribute('data-target');
    ReactGA.event({
      category: 'Social',
      action: social,
      label: window.location.pathname,
    });
  };

  const trackContacts = ({ target }) => {
    const type = target.getAttribute('data-target');
    ReactGA.event({
      category: type,
      action: 'Click',
      label: type,
    });
  };

  return (
    <div className={styles.contactsContainer}>
      <SectionTitle title="Contacts" styleTitle={styles.mobileFooterTitle} />
      <div className={styles.contacts}>
        <span>Email:</span>
        <span>
          <LinkWrapper
            path="mailto:hi@yellow.systems"
            isLocalLink
            additionalProps={{ 'data-target': 'Email' }}
            handleOnClick={trackContacts}
          >
            hi@yellow.systems
          </LinkWrapper>
        </span>
        <span>Phone US:</span>
        <span>
          <a href="tel:+14156709070" data-target="Phone">+1 415 670 9070</a>
        </span>
        <span>Phone BY:</span>
        <span>
          <LinkWrapper
            path="tel:+375293115249"
            isLocalLink
            additionalProps={{ 'data-target': 'Phone' }}
            handleOnClick={trackContacts}
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
              handleOnClick={trackSocialIconClick}
            >
              <img
                src={network.image}
                alt={network.title}
                data-target={network.title}
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
          type={animatedType.isJSON}
          jsonFile={rocket}
          className={styles.jsonWrapper}
        />
        <div className={styles.stars} />
        <div className={styles.stars2} />
        {/* TODO <div className={styles.stars3} /> */}
        {/* TODO <img src={rocketIcon} alt="roket" /> */}
      </div>
    </div>
  );
};
Contacts.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};
