import React from 'react';
import InstaLogo from 'components/HomeCommon/InstaLogo';
import InstaTape from 'components/HomeCommon/InstaTape';
import SectionTitle from 'components/Common/SectionTitle';
import ButtonMore from 'components/Common/ButtonMore';
import styles from './styles.module.scss';

const Insta = () => (
  <section className={styles.insta}>
    <InstaLogo />
    <SectionTitle
      title="Live"
      subtitle="How we live and work"
    />
    <InstaTape />
    <ButtonMore
      href="/insta"
      title="Follow on Instagram"
      buttonStyle={styles.instaButton}
    />
  </section>
);

export default Insta;
