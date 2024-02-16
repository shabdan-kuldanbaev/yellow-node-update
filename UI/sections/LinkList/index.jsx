import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import LinkWrapper from 'UI/components/LinkWrapper';
import SectionTitle from 'UI/components/SectionTitle';
import Typography from 'UI/components/Typography';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const LinkList = (props) => {
  const {
    className,
    titleProps,
    linksList,
  } = useSectionProps(props);

  return (
    <section className={className}>
      <SectionTitle {...titleProps} />
      <div className={styles.container}>
        {linksList.map(({
          linkTitle,
          svgType,
          url,
        }) => (
          <div
            key={linkTitle}
            className={styles.linkContainer}
          >
            <LinkWrapper path={url}>
              <>
                <Svg
                  type={svgType}
                  className={styles.linkSvg}
                />
                <Typography
                  variant="p"
                  className={styles.linkTitle}
                >
                  {linkTitle}
                </Typography>
                <Svg
                  type={SVG_IMAGES_TYPES.arrowRight}
                  className={styles.arrow}
                />
              </>
            </LinkWrapper>
          </div>
        ))}
      </div>
    </section>
  );
};

LinkList.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default LinkList;
