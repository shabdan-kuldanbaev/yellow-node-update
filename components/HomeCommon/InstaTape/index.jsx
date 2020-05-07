import React from 'react';
import styles from './styles.module.scss';
import defaultImg from './images/default.png';

const InstaTape = () => {
  const photos = [
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/e35/c157.0.406.406a/91930941_344949039796726_6758521384290975459_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=utSV7V8u7CwAX8zInRn&oh=384283e8ccb9684c7fb2edf8fbd70b65&oe=5E9F845C',
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/e35/89338363_710910269442712_3118180154058149740_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=d1YOBLDlbJEAX-X_l5M&oh=31f9ebb9e99db2f6e774785693495624&oe=5EC74C32',
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/84066446_173951660717316_6172825938522163147_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=pqdIBH5AWt8AX-8iBPK&oh=3aacdf8df0895204905990b31214cc61&oe=5EC847E5',
    'https://instagram.fmsq1-1.fna.fbcdn.net/v/t51.2885-15/e35/79852677_170531214007970_3771760721511283164_n.jpg?_nc_ht=instagram.fmsq1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=7jja7PGMLbIAX-yYMZd&oh=e95c78a1a3a1b12838d86fbe72053df1&oe=5EC659FB',
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
