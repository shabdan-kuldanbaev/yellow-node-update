/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import React, {
  useEffect,
  useRef,
  Fragment,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import { EffectComposer } from 'node_modules/three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'node_modules/three/examples/jsm/postprocessing/RenderPass';
import { animated, useSpring } from 'react-spring';
import { mobileResolution } from 'utils/helper';
import { animationTypes } from './utils/data';
import {
  three,
  slogan,
  getSpeed,
} from './utils/threeHelper';
import * as styles from './styles.module.scss';

let camera;
let animationId = 0;
let r = 0;
const meshes = [];
const meshClones = [];
let composer;
let mat = 0;

export const Duck = ({
  duck,
  isHomepageVisit,
}) => {
  const [isAnimate, setAnimate] = useState(false);
  const [isDuckLoad, setDuckLoad] = useState(false);
  const [canvas, setCanvas] = useState(null);

  const containerCanvas = useRef(null);
  const containerText = useRef(null);
  const sloganRef = useRef(null);

  const initialAnimationTime = 500; // 500 = 9s
  let animationDelay = 0.0001;
  let isMobile = 0;
  let scene;
  let renderer;
  let originals;
  let clones;
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouse = { x: 0, y: 0 };
  let scatterStep = 0;

  const options = {
    initial: {
      modelScale: 0,
      modelPositionX: 0,
      modelPositionY: 0,
      modelPositionZ: 0,
      meshScale: 2000, // 2000
      meshPositionX: 0,
      meshPositionY: -8000, // -8000
      meshPositionZ: 0,
      meshRotationX: 1, // 1
      meshRotationY: 1.55,
      meshRotationZ: 0,
      particleVelocity: 0.005,
      isAppear: false,
      currentAnimation: animationTypes[0],
      rotationSpeed: 0.0005,
      rotationDirection: 'left',
    },
    default: {
      meshPositionX: 0,
      meshPositionY: -300, // -300
      meshPositionZ: 0,
      meshRotationX: 0,
      meshRotationY: 1.2, // 1.2
      meshRotationZ: 0,
      meshScale: 80, // 80
      rotationSpeed: 0.009,
    },
  };

  // TODO a little late
  // const { asPath } = useRouter();
  // const currentPage = asPath.split('/')[1] || '';
  // const isHomePage = currentPage === '';
  // const meshes = [];
  // const meshClones = [];
  // let mat = 0;
  // let animationId = 0;
  // let movement = 0;
  // let composer;
  // let camera;

  // TODO remove this and add the parallax component
  const calc = (o) => `translateY(${o * 0.13}px)`;
  const calcForDuck = (o) => `translateY(${o * 0.09}px)`;
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));
  const [{ offset: duckOffset }, setDuckProps] = useSpring(() => ({ offset: 0 }));
  const handleOffset = () => {
    if (window.pageYOffset < 0) set({ offset: 0 });
    else set({ offset: window.pageYOffset - containerText.current.getBoundingClientRect().top });
  };
  const handleDuckOffset = () => {
    if (window.pageYOffset < 0) setDuckProps({ offset: 0 });
    else setDuckProps({ offset: window.pageYOffset - containerCanvas.current.getBoundingClientRect().top });
  };

  const creatShaderMaterialAfterLoadModel = (obj) => {
    mat = three.creatMat();

    const positions = three.combineBuffer(obj, 'position');

    three.createMesh(
      positions,
      scene,
      isMobile,
      originals,
      clones,
      mat,
      options,
      meshes,
      meshClones,
    );
  };

  const onWindowResize = () => {
    if (!isMobile) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      camera.lookAt(scene.position);
      if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
      if (composer) composer.setSize(window.innerWidth, window.innerHeight);
    }
  };

  const onDocumentMouseDown = () => {
    if (options.initial.isAppear && !isMobile) {
      options.initial.currentAnimation = animationTypes[2];
      sloganRef.current ? sloganRef.current.style.opacity = 0 : null;
      sloganRef.current ? sloganRef.current.style.transition = 'opacity 1s' : null;
    }
  };

  const onDocumentMouseUp = () => {
    if (options.initial.isAppear && !isMobile) {
      options.initial.currentAnimation = animationTypes[1];
      sloganRef.current ? sloganRef.current.style.opacity = 0.1 : null;
      sloganRef.current ? sloganRef.current.style.transition = 'opacity 1s' : null;
    }
  };

  const onDocumentMouseMove = (ev) => {
    if (mat) {
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mat.uniforms.mouse.value);
      meshes[0].worldToLocal(mat.uniforms.mouse.value);
    }
  };

  const render = () => {
    // animation
    switch (options.initial.currentAnimation) {
    case 'appear':
      meshes.forEach((mesh) => {
        const positions = mesh.geometry.attributes.position;
        mesh.rotation.y += -0.1 * options.initial.rotationSpeed;

        if (!options.initial.isAppear) {
          for (let i = 0; i < positions.count; i += 1) {
            positions.setXYZ(
              i,
              Math.random() * (Math.random() * (100) - 50),
              Math.random() * (Math.random() * (900) - 450),
              Math.random() * (Math.random() * (900) - 450),
            );
          }
        }

        positions.needsUpdate = true;
        options.initial.isAppear = true;
      });

      break;

    case 'getTogether':
      const initPos = meshes[0] ? meshes[0].geometry.attributes.initialPosition : null;
      const pos = meshes[0] ? meshes[0].geometry.attributes.position : null;

      const iF = initPos ? Math.trunc(1000 * initPos.array[0]) : 0;
      const pF = pos ? Math.trunc(1000 * pos.array[0]) : 0;

      if (iF !== pF) {
        meshes.forEach((mesh) => {
          const initialPosition = mesh.geometry.attributes.initialPosition;
          const positions = mesh.geometry.attributes.position;

          if (!(window.innerWidth < mobileResolution)) three.setRotateAnimation(mesh, options);

          for (let i = 0; i < positions.count; i += 1) {
            const ix = initialPosition.getX(i);
            const iy = initialPosition.getY(i);
            const iz = initialPosition.getZ(i);

            const px = positions.getX(i);
            const py = positions.getY(i);
            const pz = positions.getZ(i);

            const distanceX = px - ix;
            const distanceY = py - iy;
            const distanceZ = pz - iz;

            if (animationDelay < 0.01) animationDelay += 0.0000005;

            const animationTime = initialAnimationTime * animationDelay;

            const speedX = getSpeed(distanceX, animationTime);
            const speedY = getSpeed(distanceY, animationTime);
            const speedZ = getSpeed(distanceZ, animationTime);

            if (px !== ix && py !== iy && pz !== iz) {
              positions.setXYZ(i, px - speedX, py - speedY, pz - speedZ);
            }
          }

          positions.needsUpdate = true;
        });

        meshClones.forEach((mesh) => {
          if (!(window.innerWidth < mobileResolution)) three.setRotateAnimation(mesh, options);

          mesh.material.opacity = 0;
          mesh.geometry.attributes.position.needsUpdate = true;
          scatterStep = 0;
        });
      } else if (window.innerWidth < mobileResolution) r = 1;
      else {
        meshes.forEach((mesh) => { three.setRotateAnimation(mesh, options); });
        meshClones.forEach((mesh) => { three.setRotateAnimation(mesh, options); });
      }

      break;

    case 'pagination':
      meshes.forEach((mesh) => three.setRandomPosition(mesh, scatterStep));

      meshClones.forEach((mesh, index) => {
        mesh.material.opacity = 1.0;
        mesh.scale.x = options.default.meshScale + ((index + 1) * 2);
        mesh.scale.y = options.default.meshScale + ((index + 1) * 2);
        mesh.scale.z = options.default.meshScale + ((index + 1) * 2);

        three.setRandomPosition(mesh, scatterStep);
      });

      break;
    }

    if (composer) composer.render(0.01);
  };

  const animate = () => {
    if (r === 0) {
      animationId = requestAnimationFrame(animate);
      render();
    }
  };

  const handleOnScroll = () => {
    slogan.setOpacity(canvas, containerCanvas);
    slogan.setSloganOpacity(sloganRef, isMobile);
    handleOffset();
    handleDuckOffset();

    const { top } = containerCanvas.current.getBoundingClientRect();

    if (containerCanvas) {
      if (!(window.innerWidth < mobileResolution)) {
        if (top < -400) {
          setAnimate(false);
          r = 1;
        } else if (top <= -50 && top > -400) {
          setAnimate(true);
          r = 0;
        } else {
          options.initial.currentAnimation = animationTypes[1];
          setAnimate(true);
          r = 0;
        }
      }
    }
  };

  const init = () => {
    const { createdCamera, createdScene } = three.createCamera(isMobile);
    camera = createdCamera;
    scene = createdScene;
    renderer = three.createRenderer();

    if (duck) {
      creatShaderMaterialAfterLoadModel(duck);

      containerCanvas.current.innerHTML = '';
      containerCanvas.current.appendChild(renderer.domElement);
      setCanvas(renderer.domElement);

      // postprocessing
      const renderModel = new RenderPass(scene, camera);
      composer = new EffectComposer(renderer);
      composer.addPass(renderModel);
    }
  };

  useEffect(() => {
    let timer;

    if (containerCanvas.current && containerCanvas.current.getBoundingClientRect().top < -400) {
      cancelAnimationFrame(animationId);
      animationId = 0;
      r = 1;
    }

    isMobile = window.innerWidth < mobileResolution;

    if (!isAnimate) {
      cancelAnimationFrame(animationId);
      animationId = 0;

      if (duck && !isDuckLoad) {
        setDuckLoad(true);

        if (isMobile) options.default.meshScale = 70;

        r = 0;
        init();

        slogan.setOpacity(canvas, containerCanvas);
        slogan.animateSlogan(sloganRef);
        animate();

        if (!isHomepageVisit) {
          slogan.sloganOpacityAnimation(!isMobile ? 0.1 : 1);
        } else {
          slogan.sloganBlurAnimation(
            sloganRef,
            !isMobile ? 0.1 : 1,
            styles.setBlur,
          );
        }

        window.addEventListener('resize', onWindowResize, false);

        if (!isHomepageVisit) {
          timer = setTimeout(() => {
            options.initial.currentAnimation = animationTypes[1];
            if (sloganRef.current) sloganRef.current.classList.add(styles.setBlur);
            document.addEventListener('mousedown', onDocumentMouseDown, false);
            document.addEventListener('mouseup', onDocumentMouseUp, false);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
          }, 5700);
        } else {
          options.initial.currentAnimation = animationTypes[1];

          if (sloganRef.current) sloganRef.current.classList.add(styles.setBlur);
          document.addEventListener('mousedown', onDocumentMouseDown, false);
          document.addEventListener('mouseup', onDocumentMouseUp, false);
          document.addEventListener('mousemove', onDocumentMouseMove, false);
        }
      }
    } else {
      options.initial.isAppear = true;

      if (sloganRef.current) sloganRef.current.classList.add(styles.setBlur);
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);
      document.addEventListener('mousemove', onDocumentMouseMove, false);

      animate();
    }
    window.addEventListener('scroll', handleOnScroll, false);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleOnScroll);
      document.removeEventListener('mousedown', onDocumentMouseDown);
      document.removeEventListener('mouseup', onDocumentMouseUp);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);

      cancelAnimationFrame(animationId);
      animationId = 0;
    };
  }, [duck, isAnimate]);

  useEffect(() => () => {
    if (isHomepageVisit) {
      r = 0;
      meshes.length = 0;
      meshClones.length = 0;
      mat = 0;
    }
  }, []);

  return (
    <Fragment>
      <div className={styles.text} ref={containerText}>
        <animated.div style={{ position: 'absolute', transform: offset.interpolate(calc) }}>
          {!!duck && (
            <h1 ref={sloganRef} className="letter-container">
              {'WE CREATE\nFANTASTIC SOFTWARE'}
            </h1>
          )}
        </animated.div>
      </div>
      <animated.div
        className={styles.canvasContainer}
        ref={containerCanvas}
        style={{
          position: 'relative',
          transform: duckOffset.interpolate(calcForDuck),
        }}
      />
    </Fragment>
  );
};

Duck.defaultProps = {
  duck: null,
};

Duck.propTypes = {
  duck: PropTypes.instanceOf(Object),
  isHomepageVisit: PropTypes.bool.isRequired,
};

// TODO
// const onDocumentTouchMove = (ev) => {
//   cancelAnimationFrame(animationId);
//   animationId = 0;
// };
// const setTextPosition = pageYOffset => {
//   if (pageYOffset > 0 && pageYOffset < 200) {
//     movement = pageYOffset * .5;
//     text.style.transform = `translate3d(0, ${movement}px, 0)`;
//   };
// };
// document.addEventListener('touchmove', onDocumentTouchMove, false);
// document.addEventListener('touchstart', onDocumentMouseMove, false);
// const introBottom = containerCanvas.current.getBoundingClientRect().bottom;
