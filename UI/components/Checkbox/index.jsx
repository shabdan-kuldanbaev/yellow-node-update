import useProps from './utils/useProps';
import styles from './Checkbox.module.scss';

export default function Checkbox(props) {
  const {
    id,
    children,
    ...restProps
  } = useProps(props);

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        className={styles.checkbox}
        id={id}
        {...restProps}
      />
      <label
        htmlFor={id}
        className={styles.label}
      >
        {children}
      </label>
    </div>
  );
}
