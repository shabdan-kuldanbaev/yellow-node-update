import PropTypes from 'prop-types';
import cn from 'classnames';
import Typography from 'UI/components/Typography';
import { FieldsWrapper } from 'UI/components/FieldsWrapper';
import { mainContent } from '../utils/data';
import styles from './styles.module.scss';

const MainContent = ({ mainContent: footerLinksData = mainContent }) => footerLinksData?.map(({
  title,
  links,
  type,
}) => (
  <div
    key={`footer/${type}`}
    className={cn(
      styles.container,
      styles[type],
    )}
  >
    <Typography
      variant="span"
      className={styles.title}
    >
      {title}
    </Typography>
    {links && links.map(({
      path,
      subtitle,
      type: linkType,
    }) => (
      <FieldsWrapper
        key={path}
        type={linkType}
        path={path}
        subtitle={subtitle}
      />
    ))}
  </div>
));

MainContent.propTypes = {
  mainContent: PropTypes.instanceOf(Array),
};

export default MainContent;
