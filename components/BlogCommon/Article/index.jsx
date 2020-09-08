import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Loader } from 'components';
import { DataTypes } from './DataTypes';
import styles from './styles.module.scss';

const Article = ({
  introSection,
  article,
  isLoading,
}) => (
  <Loader isLoading={!isLoading}>
    <section ref={introSection} className={styles.article}>
      <header className={styles.header}>
        <div>
          <div style={{ backgroundImage: `url(${get(article, 'header.image', '')})` }} />
        </div>
        <div className={styles.container}>
          <div>
            <h1 className={styles.h1}>{get(article, 'header.title', '')}</h1>
          </div>
          <div>
            <p>{get(article, 'header.subtitle', '')}</p>
          </div>
        </div>
      </header>
      <div className={styles.body}>
        {get(article, 'body', []).map((item) => <DataTypes type={item.tag} data={item.data} />)}
      </div>
    </section>
  </Loader>
);

Article.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  article: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Article;
