import cn from 'classnames';
import { FieldsWrapper } from 'UI/components/FieldsWrapper';
import Typography from 'UI/components/Typography';
import styles from 'CompanyLocation.module.scss';

const CompanyLocation = ({
  addresses,
  containerClass,
  itemClass,
}) => (
  <div className={cn(styles.container, containerClass)}>
    {
      addresses.map(({
        title,
        text,
        path,
        pathText,
        type,
      }) => (
        <div
          key={title}
          className={itemClass}
        >
          <Typography
            className={styles.addressTitle}
            data-title
          >
            {title}
          </Typography>

          {Array.isArray(text) ? text.map((textItem) => (
            <Typography
              className={styles.addressText}
              data-text
            >
              {textItem}
            </Typography>
          )) : (
            <Typography
              className={styles.addressText}
              data-text
            >
              {text}
            </Typography>
          )}

          {path && (
            <FieldsWrapper
              className={styles.addressText}
              type={type}
              path={path}
              subtitle={pathText}
            />
          )}
        </div>
      ))
    }
  </div>
);

export default CompanyLocation;
