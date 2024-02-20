import PropTypes from 'prop-types';
import Expand from 'react-expand-animated';

export const ExpandWrapper = ({ children, open }) => (
  <Expand open={open}>
    {children}
  </Expand>
);

ExpandWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
};
