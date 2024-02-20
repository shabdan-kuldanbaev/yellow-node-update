import { instaPhotos } from './utils/data';
import styles from './styles.module.scss';

const InstaTape = ({ instaPhotos: photos = instaPhotos }) => (
  <div className={styles.instaTape}>
    {photos && photos.map((photo) => (
      <div
        key={`insta/${photo}`}
        className={styles.imgContainer}
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${photo})` }}
        />
      </div>
    ))}
  </div>
);

export default InstaTape;
