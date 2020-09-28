import React from 'react';
import { Cover, Twitter } from './images';
import styles from './styles.module.scss';

export const BookmarkCard = () => (
  <div className={styles.bookmarkContainer}>
    <div className={styles.bookmarkCard}>
      <a>
        <div className={styles.content}>
          <h3>Ghost (@Ghost) | Twitter</h3>
          <div className={styles.description}>
            Najnowsze tweety od Ghost (@Ghost). Fiercely independent publishing.⁣
            ⁣
            Need help? For support, please visit:⁣
            https://t.co/doya2PtBYd. Everywhere
          </div>
          <div className={styles.metadata}>
            <div className={styles.metadataImageContainer}>
              <div className={styles.metadataImage} style={{ backgroundImage: `url(${Twitter})` }} />
            </div>
            <span>Ghost</span>
            <span>•</span>
            <span>Twitter</span>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <div className={styles.img} style={{ backgroundImage: `url(${Cover})` }} />
        </div>
      </a>
    </div>
  </div>
);
