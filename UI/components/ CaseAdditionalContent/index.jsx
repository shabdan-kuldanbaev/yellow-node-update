import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const CaseAdditionalContent = ({
  type,
  data,
  view,
}) => (
  <div className={cn(
    styles.additionalContent,
    styles[type],
    styles[view],
  )}
  >
    {data?.map(({ title, description, contentList }, index) => (
      <div
        key={title}
        className={cn(styles.container, styles[`container-${index + 1}`])}
      >
        {title && (
          <p className={styles.title}>
            {title}
          </p>
        )}
        {description && (
          <p className={styles.description}>
            {description}
          </p>
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
);

CaseAdditionalContent.defaultProps = {
  data: null,
};

CaseAdditionalContent.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object),
};

export default CaseAdditionalContent;
