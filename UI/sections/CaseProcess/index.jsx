import cn from 'classnames';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import Typography from 'UI/components/Typography';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const CaseProcess = (props) => {
  const {
    type,
    style,
    title,
    images,
    steps,
  } = useSectionProps(props);

  return (
    <section
      className={cn(styles.section, styles[type])}
      style={style}
    >
      <SectionTitle
        title={title}
        className={styles.titleStyle}
      />
      <div className={styles.container}>
        <div className={styles.stepsContainer}>
          {steps.map(({
            title: stepTitle,
            description,
            subtitle,
            imageBundles,
          }, index) => (
            <div
              className={styles.step}
              key={index}
            >
              <Typography
                variant="span"
                className={styles.stepNumber}
              >
                {subtitle}
              </Typography>
              <Typography
                variant="h3"
                className={styles.stepTitle}
              >
                {stepTitle}
              </Typography>
              {description
                && (
                  <Typography
                    variant="p"
                    className={styles.stepDescription}
                  >
                    {description}
                  </Typography>
                )}
              {imageBundles?.map((url, indexBundleImage) => (
                <img
                  className={cn(styles.bundleImage, styles[`bundleImage-${indexBundleImage + 1}`])}
                  src={url}
                  alt={stepTitle}
                  key={`images-bundles/${url}`}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.imagesContainer}>
          {images.map((url, index) => (
            <Illustration
              transparent
              priority
              className={cn(styles.image, styles[`image-${index + 1}`])}
              alt={url}
              src={url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

CaseProcess.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default CaseProcess;
