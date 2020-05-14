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
import { OBJLoader } from 'node_modules/three/examples/jsm/loaders/OBJLoader';
import { animated, useSpring } from 'react-spring';
import { mobileResolution } from 'utils/helper';
import { useRouter } from 'next/router';
import { shaders, animationTypes } from './utils/data';
import * as styles from './styles.module.scss';

export const Duck = ({ handleOnLoaded, isModelLoaded }) => {
  const { asPath } = useRouter();
  const currentPage = asPath.split('/')[1] || '';
  const isHomePage = currentPage === '';

  const [loadObj, setLoadObj] = useState(null);

  const containerCanvas = useRef(null);
  const containerText = useRef(null);
  const sloganRef = useRef(null);
  let canvas = null;
  // 500 = 9s
  const initialAnimationTime = 500;
  let animationDelay = 0.0001;
  let isMobile = 0;

  // for Parallax // ✅
  const calc = (o) => `translateY(${o * 0.13}px)`;
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));
  const handleOffset = () => {
    const posY = containerText.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    set({ offset });
  };

  // ✅
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

  // ✅
  let camera;
  let scene;
  let renderer;
  let originals;
  const meshes = [];
  let clones;
  const meshClones = [];
  let composer;
  const raycaster = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mouse = { x: 0, y: 0 };
  let scatterStep = 0;
  let mat = 0;
  let animationId = 0;
  // let movement = 0;

  // ✅
  const loadModel = () => {
    const loader = new OBJLoader();
    loader.load(
      'https://solidwood.s3.eu-central-1.amazonaws.com/Duck_0.3.obj',
      (obj) => setLoadObj(obj),
      (xhr) => ((xhr.loaded / xhr.total) * 100 === 100) && handleOnLoaded(true),
    );
  };

  // ✅
  const getSpeed = (distance, time) => distance / time;

  // ✅
  const createCamera = () => {
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 50000);
    if (isMobile) camera.position.set(6000, 0, 0);
    else camera.position.set(0, 0, 5000);
    scene = new THREE.Scene();
    camera.lookAt(scene.position);
  };

  // ✅
  const combineBuffer = (model, bufferName) => {
    let count = 0;
    model.traverse((child) => {
      if (child.isMesh) {
        const buffer = child.geometry.attributes[bufferName];
        count += buffer.array.length;
      }
    });

    const combined = new Float32Array(count);
    let localOffset = 0;
    model.traverse((child) => {
      if (child.isMesh) {
        const buffer = child.geometry.attributes[bufferName];
        combined.set(buffer.array, localOffset);
        localOffset += buffer.array.length;
      }
    });

    return new THREE.BufferAttribute(combined, 3);
  };

  // ✅
  const createMesh = (positions, scene) => {
    const geometry = new THREE.BufferGeometry();

    geometry.addAttribute('position', positions.clone());
    geometry.addAttribute('initialPosition', positions.clone());
    geometry.attributes.position.setDynamic(true);

    if (isMobile) {
      if (window.innerHeight <= 700) { originals = [{ positions: { x: 0, y: 250, z: 0 } }]; }
      if (window.innerHeight > 700 && window.innerHeight <= 800) { originals = [{ positions: { x: 0, y: 270, z: 0 } }]; }
      if (window.innerHeight > 800) { originals = [{ positions: { x: 0, y: 265, z: 0 } }]; }
    } else {
      originals = [{ positions: { x: 0, y: 0, z: 0 } }];
    }

    clones = [
      {
        positions: { x: 0, y: 0, z: 0 },
        color: { r: 252, g: 3, b: 3 },
        opacity: 0.0,
      },
      {
        positions: { x: 0, y: 0, z: 0 },
        color: { r: 2, g: 219, b: 35 },
        opacity: 0.0,
      },
      {
        positions: { x: 0, y: 0, z: 0 },
        color: { r: 25, g: 0, b: 247 },
        opacity: 0.0,
      },
    ];

    originals.forEach((original) => {
      const mesh = new THREE.Points(geometry, mat);

      mesh.scale.x = options.default.meshScale;
      mesh.scale.y = options.default.meshScale;
      mesh.scale.z = options.default.meshScale;

      mesh.position.x = options.default.meshPositionX + original.positions.x;
      mesh.position.y = options.default.meshPositionY + original.positions.y;
      mesh.position.z = options.default.meshPositionZ + original.positions.z;

      mesh.rotation.x = options.default.meshRotationX;
      mesh.rotation.y = options.default.meshRotationY;
      mesh.rotation.z = options.default.meshRotationZ;

      scene.add(mesh);
      meshes.push(mesh);
    });

    clones.forEach((clone) => {
      const mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 10 }));

      mesh.position.x = options.default.meshPositionX + clone.positions.x;
      mesh.position.y = options.default.meshPositionY + clone.positions.y;
      mesh.position.z = options.default.meshPositionZ + clone.positions.z;

      mesh.rotation.x = options.default.meshRotationX;
      mesh.rotation.y = options.default.meshRotationY;
      mesh.rotation.z = options.default.meshRotationZ;

      mesh.material.color = new THREE.Color(`rgb(${clone.color.r}, ${clone.color.g}, ${clone.color.b})`);
      mesh.material.transparent = true;
      mesh.material.opacity = clone.opacity;

      scene.add(mesh);
      meshClones.push(mesh);
    });
  };

  // ✅
  const creatShaderMaterialAfterLoadModel = (obj) => {
    mat = new THREE.ShaderMaterial({
      uniforms: {
        time: {
          type: 'f',
          value: 0,
        },
        resolution: {
          type: 'v2',
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        mouse: {
          type: 'v3',
          value: new THREE.Vector3(0, 0, 0),
        },
        scale: {
          type: 'f',
          value: window.innerHeight / 2,
        },
      },
      vertexShader: shaders.vs,
      fragmentShader: shaders.fs,
    });

    const positions = combineBuffer(obj, 'position'); // ✅
    createMesh(positions, scene); // ✅
  };

  // ✅
  const createRenderer = () => {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;
  };

  // ✅
  const setRandomPosition = (mesh) => {
    const positions = mesh.geometry.attributes.position;
    const { count } = positions;

    for (let i = 0; i < count; i += 1) {
      if (scatterStep < 0.0125) scatterStep += 0.01;

      positions.setXYZ(
        i,
        positions.getX(i) + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
        positions.getY(i) + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
        positions.getZ(i) + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
      );
    }

    positions.needsUpdate = true;
  };

  // ✅
  const setRotateAnimation = (mesh) => {
    if (options.initial.rotationDirection === 'left') {
      if (mesh.rotation.y > 0) mesh.rotation.y += -0.1 * options.default.rotationSpeed;
      else options.initial.rotationDirection = 'right';
    }

    if (options.initial.rotationDirection === 'right') {
      if (mesh.rotation.y > -3) mesh.rotation.y -= -0.1 * options.default.rotationSpeed;
      else options.initial.rotationDirection = 'left';
    }
  };

  // ✅
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  };

  // ✅⚠️
  const onDocumentMouseDown = () => {
    if (options.initial.isAppear) {
      options.initial.currentAnimation = animationTypes[2];
      sloganRef.current ? sloganRef.current.style.opacity = 0 : null;
      sloganRef.current ? sloganRef.current.style.transition = 'opacity 1s' : null;
    }
  };

  // ✅⚠️
  const onDocumentMouseUp = () => {
    if (options.initial.isAppear) {
      options.initial.currentAnimation = animationTypes[1];
      sloganRef.current ? sloganRef.current.style.opacity = 0.1 : null;
      sloganRef.current ? sloganRef.current.style.transition = 'opacity 1s' : null;
    }
  };

  // ✅⚠️
  const onDocumentMouseMove = (ev) => {
    if (mat) {
      mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(plane, mat.uniforms.mouse.value);
      meshes[0].worldToLocal(mat.uniforms.mouse.value);
    }
  };

  // ✅
  const setOpacity = () => {
    if (canvas) {
      const { pageYOffset } = window;
      const ratio = pageYOffset / window.innerHeight;
      canvas.style.opacity = (1 - 2 * ratio);
    }
  };

  // ❌
  const render = () => {
    // console.log('render');
    // animation
    switch (options.initial.currentAnimation) {
    case 'appear': meshes.forEach((mesh) => {
      const positions = mesh.geometry.attributes.position;
      const count = positions.count;
      mesh.rotation.y += -0.1 * options.initial.rotationSpeed;

      if (!options.initial.isAppear) {
        for (let i = 0; i < count; i += 1) {
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
      meshes.forEach((mesh) => {
        const initialPosition = mesh.geometry.attributes.initialPosition;
        const positions = mesh.geometry.attributes.position;
        const count = positions.count;

        if (!isMobile || !isHomePage) setRotateAnimation(mesh);

        for (let i = 0; i < count; i += 1) {
          let ix = initialPosition.getX(i);
          let iy = initialPosition.getY(i);
          let iz = initialPosition.getZ(i);

          let px = positions.getX(i);
          let py = positions.getY(i);
          let pz = positions.getZ(i);

          let distanceX = px - ix;
          let distanceY = py - iy;
          let distanceZ = pz - iz;

          if (animationDelay < 0.01) animationDelay += 0.0000005;

          const animationTime = initialAnimationTime * animationDelay;

          let speedX = getSpeed(distanceX, animationTime);
          let speedY = getSpeed(distanceY, animationTime);
          let speedZ = getSpeed(distanceZ, animationTime);

          if (px !== ix && py !== iy && pz !== iz) {
            positions.setXYZ(i, px - speedX, py - speedY, pz - speedZ);
          }
        }

        positions.needsUpdate = true;
        scatterStep = 0;
      });

      meshClones.forEach((mesh) => {
        const positions = mesh.geometry.attributes.position;

        if (!isMobile || !isHomePage) setRotateAnimation(mesh);
        mesh.material.opacity = 0;
        positions.needsUpdate = true;
        scatterStep = 0;
      });

      break;

    case 'pagination':
      meshes.forEach((mesh) => setRandomPosition(mesh));

      meshClones.forEach((mesh, index) => {
        mesh.material.opacity = 1.0;
        mesh.scale.x = options.default.meshScale + ((index + 1) * 2);
        mesh.scale.y = options.default.meshScale + ((index + 1) * 2);
        mesh.scale.z = options.default.meshScale + ((index + 1) * 2);
        setRandomPosition(mesh);
      });

      break;
    }

    if (composer) composer.render(0.01);
  };

  // ✅⚠️
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    render();// ❌
  };

  // ✅⚠️
  const handleOnScroll = () => {
    setOpacity();// ✅
    handleOffset();// ✅

    if (canvas) {
      if (canvas.getBoundingClientRect().top < -200) {
        if (animationId !== 0) {
          cancelAnimationFrame(animationId);
          animationId = 0;
        }
      } else if (animationId === 0) {
        animate();
      }
    }
  };

  // ✅
  const animateSlogan = () => {
    const str = sloganRef.current.textContent;
    let newStr = '';

    for (let i = 0; i < str.length; i += 1) {
      if (str[i] === ' ') newStr += ' ';
      else newStr += `<span class='letter'>${str[i]}</span>`;
    }

    sloganRef.current.innerHTML = newStr;
  };

  // ✅
  const init = () => {
    createCamera(); // ✅
    createRenderer(); // ✅

    if (loadObj) {
      creatShaderMaterialAfterLoadModel(loadObj);// ✅

      containerCanvas.current.innerHTML = '';
      containerCanvas.current.appendChild(renderer.domElement);
      canvas = renderer.domElement;

      // postprocessing
      const renderModel = new RenderPass(scene, camera);
      composer = new EffectComposer(renderer);
      composer.addPass(renderModel);
    }
  };

  // ✅
  useEffect(() => {
    let timer;

    if (!isModelLoaded) loadModel();// ✅

    if (loadObj) {
      isMobile = window.innerWidth < mobileResolution;
      if (isMobile) options.default.meshScale = 45;

      init();// ✅

      setOpacity();// ✅
      animateSlogan();// ✅
      animate();// ✅

      window.anime.timeline({ loop: false })
        .add({
          targets: '.letter-container .letter',
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 2250,
          delay: (el, i) => 150 * (i + 1),
        })
        .add({
          targets: '.letter-container',
          opacity: 0.1,
          duration: 1000,
          easing: 'easeOutExpo',
          delay: 0,
        });

      window.addEventListener('scroll', handleOnScroll, false);
      window.addEventListener('resize', onWindowResize, false);

      timer = setTimeout(() => {
        options.initial.currentAnimation = animationTypes[1];
        if (sloganRef.current) sloganRef.current.classList.add(styles.setBlur);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
      }, 5700);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleOnScroll);
      document.removeEventListener('mousedown', onDocumentMouseDown);
      document.removeEventListener('mouseup', onDocumentMouseUp);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [loadObj]);

  // ✅
  return (
    <Fragment>
      <div className={styles.text} ref={containerText}>
        <animated.div style={{ position: 'absolute', transform: offset.interpolate(calc) }}>
          {isModelLoaded && <h1 ref={sloganRef} className="letter-container">WE CREATE FANTASTIC SOFTWARE</h1>}
        </animated.div>
      </div>
      <div className={styles.canvasContainer} ref={containerCanvas} />
    </Fragment>
  );
};
  // ✅
Duck.propTypes = {
  handleOnLoaded: PropTypes.func.isRequired,
  isModelLoaded: PropTypes.bool.isRequired,
};

// ✅
// document.addEventListener('touchmove', onDocumentTouchMove, false);
// document.addEventListener('touchstart', onDocumentMouseMove, false);

//   const introBottom = containerCanvas.current.getBoundingClientRect().bottom;

// TODO
// const onDocumentTouchMove = (ev) => {
//   cancelAnimationFrame(animationId);
//   animationId = 0;
// };

// TODO const setTextPosition = pageYOffset => {
//   if (pageYOffset > 0 && pageYOffset < 200) {
//     movement = pageYOffset * .5;
//     text.style.transform = `translate3d(0, ${movement}px, 0)`;
//   };
// };
