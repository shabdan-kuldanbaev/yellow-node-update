import cn from 'classnames';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Media from 'UI/components/Media';
import Animated from 'UI/containers/Animated';
import Typography from 'UI/components/Typography';
import styles from './styles.module.scss';

const CaseImageContent = ({
  image,
  textContent,
  type,
  view,
}) => (
  (image || textContent) && (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={cn(styles.blockContainer, styles[type], styles[view])}>
        {image && (
          <Media
            asset={image}
            className={styles.image}
          />
        )}
        <div className={styles.container}>
          {textContent?.map(({
            title,
            description,
            contentList,
          }, index) => (
            <div
              key={title}
              className={cn(styles.textContainer, styles[`textContainer-${index + 1}`])}
            >
              {title && (
                <Typography
                  variant="p"
                  className={styles.title}
                >
                  {title}
                </Typography>
              )}
              {description && (
                <Typography
                  variant="p"
                  className={styles.description}
                >
                  {description}
                </Typography>
              )}
              {contentList?.length > 0 && (
                <ul className={styles.listContainer}>
                  {contentList?.map((info) => (
                    <li
                      key={info}
                      className={styles.listItem}
                    >
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </Animated>
  )
);

export default CaseImageContent;
