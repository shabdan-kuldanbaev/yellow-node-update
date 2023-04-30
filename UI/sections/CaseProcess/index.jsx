import cn from 'classnames';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import Typography from 'UI/components/Typography';
import Svg from 'UI/components/Svg';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const CaseProcess = (props) => {
  const {
    type,
    view,
    style,
    title,
    subtitle,
    description,
    images,
    steps,
  } = useSectionProps(props);

  return (
    <section
      className={cn(styles[view], styles[type], styles.section)}
      style={style}
    >
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        className={styles.titleStyle}
      />
      <div className={styles.container}>
        <div className={styles.stepsContainer}>
          {steps?.map(({
            stepTitle,
            text,
            stepSubtitle,
            imageBundles,
            icon,
            image,
          }, index) => (
            <div
              className={cn(styles.step, styles[`step-${index + 1}`])}
              key={index}
            >
              {image
                && (
                  <Illustration
                    priority
                    unoptimized
                    src={image}
                    className={styles.stepImage}
                  />
                )}
              {icon
                && (
                  <Svg
                    type={icon}
                    className={styles.stepIcon}
                  />
                )}
              {stepSubtitle && (
                <Typography
                  variant="span"
                  className={styles.stepNumber}
                >
                  {stepSubtitle}
                </Typography>
              )}
              {stepTitle && (
                <Typography
                  variant="h3"
                  className={styles.stepTitle}
                >
                  {stepTitle}
                </Typography>
              )}
              {text && (
                <ContentfulParser document={text} />
              )}
              {imageBundles?.map((url, indexBundleImage) => (
                <Illustration
                  trasparent
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
          {images?.map((url, index) => (
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
