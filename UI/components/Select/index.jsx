import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select as MUISelect } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { useMenuStyles } from './utils/useMenuStyles';
import { chevronDown } from '../Svg/svgs';
import styles from './styles.module.scss';

const StyledSelect = withStyles(() => ({
  root: {
    paddingBottom: 12,
  },
  icon: {
    width: 20,
  },
}))(MUISelect);

const Select = ({
  className, placeholder, ...props
}) => {
  const classes = useMenuStyles();

  return (
    <FormControl className={className}>
      <InputLabel
        className={styles.label}
        disableAnimation
      >
        {placeholder}
      </InputLabel>
      <StyledSelect
        {...props}
        className={styles.styledSelect}
        IconComponent={chevronDown}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.select,
          },
        }}
      />
    </FormControl>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Select;
