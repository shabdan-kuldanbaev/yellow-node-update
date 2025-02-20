import dynamic from 'next/dynamic';
import Button from 'UI/components/Button';
import SectionTitle from 'UI/components/SectionTitle';
import CardContainer from 'UI/containers/CardContainer';
import styles from './BlogSubscribeCard.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const BlogSubscribeCard = ({ toggleFullscreenSubscribe }) => (
  <CardContainer className={styles.card}>
    <Svg
      type="processLaunch"
      className={styles.image}
    />

    <SectionTitle
      className={styles.titleSection}
      title="Subscribe"
      secondTitle="to new posts"
      secondDescription="Get weekly updates on the newest design stories, case studies and tips right in your mailbox."
    />
    <Button onClick={toggleFullscreenSubscribe}>Subscribe</Button>
  </CardContainer>
);

export default BlogSubscribeCard;
