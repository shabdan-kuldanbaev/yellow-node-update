import React from 'react';
import PropTypes from 'prop-types';
import {
  SectionTitle,
  ButtonMore,
  LinkWrapper,
  Animated,
} from 'components';
import { animatedType } from 'utils/constants';
import { socialNetworks } from './utils/data';
import { rocketIcon } from './images';
import rocket from './json/rocket.json';
import styles from './styles.module.scss';

export const Contacts = ({ handleOnClick }) => (
  <div className={styles.contactsContainer}>
    <SectionTitle title="Contacts" styleTitle={styles.mobileFooterTitle} />
    <div className={styles.contacts}>
      <span>Email:</span>
      <span>
        <LinkWrapper path="mailto:hi@yellow.systems" isLocalLink>
          hi@yellow.systems
        </LinkWrapper>
      </span>
      <span>Phone US:</span>
      <span>
        <a href="tel:+14156709070">+1 415 670 9070</a>
      </span>
      <span>Phone BY:</span>
      <span>
        <LinkWrapper path="tel:+375293115249" isLocalLink>
          +375 29 311 52 49
        </LinkWrapper>
      </span>
    </div>
    <div className={styles.social}>
      <div className={styles.icons}>
        {socialNetworks.map((network) => (
          <LinkWrapper key={`networks/${network.title}`} path={network.href}>
            <img src={network.image} alt={network.title} />
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

Contacts.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};
