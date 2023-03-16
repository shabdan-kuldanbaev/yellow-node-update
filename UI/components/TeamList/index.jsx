import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useTeamSection } from './utils/useTeamSection';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const TeamList = (props) => {
  const {
    type,
    style,
    title,
    images,
    contentList,
    specialTeamList,
  } = useTeamSection(props);

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div
        style={style}
        className={cn(styles[type], styles.container)}
      >
        <Typography
          variant="h2"
          className={styles.title}
        >
          {title}
        </Typography>
        {contentList?.map((member) => (
          <Typography
            key={member}
            variant="p"
            className={styles.teamItem}
          >
            {member}
          </Typography>
        ))}
        {specialTeamList?.map(({ list, listTitle }, index) => (
          <div
            key={listTitle}
            className={styles.teamList}
          >
            <Typography
              variant="p"
              className={cn(styles.listTitle, styles[`listTitle-${index + 1}`])}
            >
              {listTitle}
            </Typography>
            {list.map((item) => (
              <Typography
                variant="p"
                key={item}
                className={styles.listItem}
              >
                {item}
              </Typography>
            ))}
          </div>
        ))}
        {images.map((imgUrl, index) => (
          <Illustration
            layout="responsive"
            className={cn(styles.bundleImage, styles[`bundleImage-${index + 1}`])}
            src={imgUrl}
            alt={title}
            key={`intro-images-bundles/${imgUrl}`}
          />
        ))}
      </div>
    </Animated>
  );
};

TeamList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamList;
