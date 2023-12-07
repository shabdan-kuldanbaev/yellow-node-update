import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';

export const FieldsWrapper = ({
  type,
  path,
  subtitle,
  className,
}) => {
  switch (type) {
  case 'phone':
    return (
      <LinkWrapper
        path={path}
        isLocalLink
        className={className}
        googleAnalyticProps={{
          action: 'Click',
          data: 'Phone',
        }}
      >
        {subtitle}
      </LinkWrapper>
    );
  case 'navigation':
    return (
      <LinkWrapper
        path={path}
        className={className}
        isLocalLink
      >
        {subtitle}
      </LinkWrapper>
    );
  default:
    return null;
  }
};

FieldsWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
