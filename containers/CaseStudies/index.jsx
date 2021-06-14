import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CaseStudiesCommon from 'components/CaseStudiesCommon';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import FeedbackForm from 'containers/Home/FeedbackForm';
import { COMPONENTS } from './util/data';

const CaseStudiesContainer = ({ introSection, currentProject }) => (
  <Fragment>
    {COMPONENTS[currentProject] && COMPONENTS[currentProject].map(({ type, header, data }) => (
      <CaseStudiesCommon
        key={type}
        introSection={introSection}
        component={type}
        type={currentProject}
        data={data}
        header={header}
      >
        {header && (
          <SectionTitle
            type={currentProject}
            {...header}
          />
        )}
      </CaseStudiesCommon>
    ))}
    <FeedbackForm />
  </Fragment>
);

CaseStudiesContainer.defaultProps = {
  currentProject: '',
};

CaseStudiesContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentProject: PropTypes.string,
};

export default CaseStudiesContainer;

// <Fragment>
//   <Intro
//     type={currentProject}
//     introSection={introSection}
//     {...INTRO[currentProject]}
//   />
//   {COMPONENTS[currentProject] && COMPONENTS[currentProject].map(({
//     type,
//     title,
//     alignLeft,
//     description,
//     tag,
//     props,
//     images,
//     image,
//   }, index) => (
//     <section
//       key={index}
//       className={cn(styles.container, styles[type], { [styles.sideIndent]: type })}
//     >
//       {title && (
//         <SectionTitle
//           type={type}
//           title={title}
//           description={description}
//         />
//       )}
//       {tag && React.createElement(tag, props)}
//       {images && images.map((imageUrl) => (
//         <Wireframe
//           key={imageUrl}
//           type={type}
//           imageUrl={imageUrl}
//         />
//       ))}
//       {image && (
//         <div className={styles.imagContainer}>
//           <img
//             src={image}
//             className={styles.image}
//             alt=""
//           />
//         </div>
//       )}
//     </section>
//   ))}
// </Fragment>
