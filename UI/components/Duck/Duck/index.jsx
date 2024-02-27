/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Plane,
  Raycaster,
  Vector3,
  EffectComposer,
  RenderPass,
} from 'utils/threeModule';
import Animated from 'UI/containers/Animated';
import { mobileResolution } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import { animationTypes } from 'UI/components/Duck/utils/constant';
import { slogan, three } from 'UI/components/Duck/utils/helpers';
import { getSpeed } from './utils/herlpers';
import * as styles from './styles.module.scss';

let camera;
let animationId = 0;
let isRender = true;
let isDuckBuilt = false;
const meshes = [];
const meshClones = [];
let composer;
let mat = 0;

const Duck = ({ sloganRef, duck }) => {
  const [isAnimate, setAnimate] = useState(false);
  const [isDuckLoad, setDuckLoad] = useState(false);
  const [canvas, setCanvas] = useState(null);

  const containerCanvas = useRef(null);

  useEffect(() => () => {
    meshes.length = 0;
    meshClones.length = 0;
    mat = 0;
  }, []);

  const initialAnimationTime = 500; // 500 = 9s
  let animationDelay = 0.0001;
  let isMobile = 0;
  let scene;
  let renderer;
  let originals;
  let clones;
  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
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
  // const currentPage = asPath.split('/')[1] || '';
  // const isHomePage = currentPage === '';
  // const meshes = [];
  // const meshClones = [];
  // let mat = 0;
  // let animationId = 0;
  // let movement = 0;
  // let composer;
  // let camera;

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

      renderer?.setSize(window.innerWidth, window.innerHeight);
      composer?.setSize(window.innerWidth, window.innerHeight);
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

  const positionsCalculations = (positions, startIndex, endIndex) => new Promise((resolve, reject) => {
    for (let i = startIndex; i < endIndex; i += 1) {
      positions.setXYZ(
        i,
        Math.random() * (Math.random() * (100) - 50),
        Math.random() * (Math.random() * (900) - 450),
        Math.random() * (Math.random() * (900) - 450),
      );
    }

    resolve();
  });

  const render = () => {
    // animation
    switch (options.initial.currentAnimation) {
    case 'appear':
      meshes.forEach(async (mesh) => {
        const positions = mesh.geometry.attributes.position;
        mesh.rotation.y += -0.1 * options.initial.rotationSpeed;

        if (!options.initial.isAppear) {
          const tasksCount = positions.count / 17;
          const tasks = new Array(17);
          // eslint-disable-next-line prefer-const,no-restricted-syntax
          for (let [index, task] of tasks.entries()) {
            task = positionsCalculations(positions, tasksCount * index, tasksCount * (index + 1));
          }

          await Promise.all(tasks);
          await positionsCalculations(positions, 0, positions.count);
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
        isDuckBuilt = true;
      } else if (window.innerWidth < mobileResolution) {
        isRender = false;
      } else {
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
    if (isRender) {
      animationId = requestAnimationFrame(animate);
      render();
    }
  };

  const handleOnScroll = () => {
    slogan.setOpacity(canvas, containerCanvas);
    slogan.setSloganOpacity(sloganRef, isMobile);

    const { scrollY } = window;

    if (containerCanvas) {
      if (!(window.innerWidth < mobileResolution)) {
        if (scrollY > 400) {
          if (isDuckBuilt) {
            options.initial.currentAnimation = animationTypes[1];
            setAnimate(false);
            isRender = false;
          }
        } else if (scrollY >= 50 && scrollY < 400) {
          setAnimate(true);
          isRender = true;
        } else {
          options.initial.currentAnimation = animationTypes[1];
          setAnimate(true);
          isRender = true;
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

    if (window?.srollY > 400 && isDuckBuilt) {
      cancelAnimationFrame(animationId);
      animationId = 0;
      isRender = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    isMobile = window.innerWidth < mobileResolution;

    if (!isAnimate) {
      cancelAnimationFrame(animationId);
      animationId = 0;

      if (duck && !isDuckLoad) {
        setDuckLoad(true);

        if (isMobile) options.default.meshScale = 70;

        isRender = true;
        init();
        animate();

        window.addEventListener('resize', onWindowResize, false);

        timer = setTimeout(() => {
          options.initial.currentAnimation = animationTypes[1];

          if (sloganRef.current) sloganRef.current.classList.add(styles.setBlur);

          document.addEventListener('mousedown', onDocumentMouseDown, false);
          document.addEventListener('mouseup', onDocumentMouseUp, false);
          document.addEventListener('mousemove', onDocumentMouseMove, false);
        }, 6500);
      }
    } else {
      options.initial.isAppear = true;

      if (isDuckBuilt) options.initial.currentAnimation = animationTypes[1];

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

  return (
    <Animated
      type={ANIMATED_TYPE.isParallaxSpring}
      className={styles.canvasContainer}
      elementRef={containerCanvas}
      position="relative"
      speed={0.09}
      isHomepageIntro
    />
  );
};

export default Duck;
