import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Video, Animated } from 'components';
import { animatedType } from 'utils/constants';
import styles from './styles.module.scss';

export const Project = ({ project, introSection }) => (
  <section ref={introSection} className={styles.project}>
    <header className={styles.header} style={{ backgroundImage: `url(${get(project, 'header.image', '')})` }}>
      <div className={styles.container}>
        <div>
          <h1>{get(project, 'header.title', '')}</h1>
        </div>
        <div>
          <p>{get(project, 'header.subtitle', '')}</p>
        </div>
      </div>
    </header>
    <div className={styles.body}>
      {get(project, 'body', []).map((item) => (
        <Fragment>
          {item.title && <div><h2>{item.title}</h2></div>}
          {item.subtitle1 && <div><p>{item.subtitle1}</p></div>}
          {item.image1_1 && item.image1_2 ? (
            <div className={styles.mediasWrapper}>
              {item.image1_1 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <img src={item.image1_1} alt="" />
                  </Animated>
                </div>
              )}
              {item.image1_2 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <img src={item.image1_2} alt="" />
                  </Animated>
                </div>
              )}
            </div>
          ) : item.image1_1 && (
            <div>
              <Animated type={animatedType.imageZoom}>
                <img src={item.image1_1} alt="" />
              </Animated>
            </div>
          )}
          {item.video1_1 && item.video1_2 ? (
            <div className={styles.mediasWrapper}>
              {item.video1_1 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <Video src={item.video1_1} className={styles.video} />
                  </Animated>
                </div>
              )}
              {item.video1_2 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <Video src={item.video1_2} className={styles.video} />
                  </Animated>
                </div>
              )}
            </div>
          ) : item.video1_1 && (
            <div>
              <Animated type={animatedType.imageZoom}>
                <Video src={item.video1_1} className={styles.video} />
              </Animated>
            </div>
          )}
          {item.subtitle2 && <div><p className={styles.additionSubtitle}>{item.subtitle2}</p></div>}
          {item.image2_1 && item.image2_2 ? (
            <div className={styles.mediasWrapper}>
              {item.image2_1 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <img src={item.image2_1} alt="" />
                  </Animated>
                </div>
              )}
              {item.image2_2 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <img src={item.image2_2} alt="" />
                  </Animated>
                </div>
              )}
            </div>
          ) : item.image2_1 && (
            <div>
              <Animated type={animatedType.imageZoom}>
                <img src={item.image2_1} alt="" />
              </Animated>
            </div>
          )}
          {item.video2_1 && item.video2_2 ? (
            <div className={styles.mediasWrapper}>
              {item.video2_1 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <Video src={item.video2_1} className={styles.video} />
                  </Animated>
                </div>
              )}
              {item.video2_2 && (
                <div>
                  <Animated type={animatedType.imageZoom}>
                    <Video src={item.video2_2} className={styles.video} />
                  </Animated>
                </div>
              )}
            </div>
          ) : item.video2_1 && (
            <div>
              <Animated type={animatedType.imageZoom}>
                <Video src={item.video2_1} className={styles.video} />
              </Animated>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  </section>
);

Project.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  project: PropTypes.instanceOf(Object).isRequired,
};
