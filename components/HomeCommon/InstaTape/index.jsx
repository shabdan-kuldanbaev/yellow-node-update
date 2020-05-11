import React from 'react';
import styles from './styles.module.scss';
import defaultImg from './images/default.png';

const InstaTape = () => {
  const photos = [
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/65268880_999049766960224_3483200276137989660_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=H6zAgwtIt30AX8E1GQp&oh=18784e87c7aa3618193f66dffe0523fe&oe=5EE45833',
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/e35/89338363_710910269442712_3118180154058149740_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=d1YOBLDlbJEAX-X_l5M&oh=31f9ebb9e99db2f6e774785693495624&oe=5EC74C32',
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/60407515_362694081256152_3926802915297229202_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=3Rm0rEhDQ1UAX9acNyN&oh=6fc4b2bc0f3286deb22e0dd17a482bd3&oe=5EE40BD8',
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/84066446_173951660717316_6172825938522163147_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=pqdIBH5AWt8AX-8iBPK&oh=3aacdf8df0895204905990b31214cc61&oe=5EC847E5',
  ];

  return (
    <div className={styles.instaTape}>
      {photos.map((photo, index) => (
        <div key={`insta/${index}`} className={styles.imgContainer}>
          <div className={styles.image} style={{ backgroundImage: `url(${photo})` }} />
        </div>
      ))}
    </div>
  );
};

export default InstaTape;
