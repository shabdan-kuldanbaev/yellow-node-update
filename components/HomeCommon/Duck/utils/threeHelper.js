// TODO try to replace with this and reduce the final build
// import { Vector2 } from 'node_modules/three/src/math/Vector2';
// import { Vector3 } from 'node_modules/three/src/math/Vector3';
// import { PerspectiveCamera } from 'node_modules/three/src/cameras/PerspectiveCamera';
// import { Scene } from 'node_modules/three/src/scenes/Scene';
// import { ShaderMaterial } from 'node_modules/three/src/materials/ShaderMaterial';
// import { WebGLRenderer } from 'node_modules/three/src/renderers/WebGLRenderer';
// import { Points } from 'node_modules/three/src/objects/Points';
// import { Color } from 'node_modules/three/src/math/Color';
// import { PointsMaterial } from 'node_modules/three/src/materials/PointsMaterial';
// import { BufferGeometry } from 'node_modules/three/src/core/BufferGeometry';
// import { BufferAttribute } from 'node_modules/three/src/core/BufferAttribute';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import { GLTFLoader } from 'node_modules/three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'node_modules/three/examples/jsm/loaders/DRACOLoader';
import anime from 'animejs';
import { getPathWithCdn } from 'utils/helper';
import errorHelper from 'utils/error';
import { shaders } from './data';

export const three = {
  loadModel: (callback) => {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(getPathWithCdn('/draco/gltf/'));
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      getPathWithCdn('/models/Duck_2.gltf'),
      (gltf) => { callback(gltf.scene); },
    );
  },
  /* ------------------------ */
  combineBuffer: (model, bufferName) => {
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
  },
  /* ------------------------ */
  createCamera: (isMobile) => {
    const createdCamera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 50000);
    const createdScene = new THREE.Scene();

    if (isMobile) createdCamera.position.set(6000, 0, 0);
    else createdCamera.position.set(0, 0, 5000);

    createdCamera.lookAt(createdScene.position);

    return { createdCamera, createdScene };
  },
  /* ------------------------ */
  creatMat: () => new THREE.ShaderMaterial({
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
  }),
  /* ------------------------ */
  createMesh: (
    positions,
    scene,
    isMobile,
    originals,
    clones,
    mat,
    options,
    meshes,
    meshClones,
  ) => {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', positions.clone());
    geometry.setAttribute('initialPosition', positions.clone());
    geometry.attributes.position.setDynamic(true);
    // geometry.addAttribute('position', positions.clone());
    // geometry.addAttribute('initialPosition', positions.clone());
    // TODO geometry.attributes.position.setDynamic(true);

    if (isMobile) {
      if (window.innerHeight <= 700) { originals = [{ positions: { x: 0, y: 100, z: 0 } }]; }

      if (window.innerHeight > 700 && window.innerHeight <= 800) { originals = [{ positions: { x: 0, y: 150, z: 0 } }]; }

      if (window.innerHeight > 800) { originals = [{ positions: { x: 0, y: 100, z: 0 } }]; }

      options.default.meshRotationY = 1.5;
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

      if (meshes.length <= 2) {
        meshes.push(mesh);
      }
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

      if (meshes.length <= 2) {
        meshClones.push(mesh);
      }
    });
  },
  /* ------------------------ */
  createRenderer: () => {
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;

    return renderer;
  },
  /* ------------------------ */
  setRandomPosition: (mesh, scatterStep) => {
    const positions = mesh.geometry.attributes.position;
    const { count } = positions;

    for (let i = 0; i < count; i += 1) {
      if (scatterStep < 0.0125) {
        scatterStep += 0.01;
      }

      positions.setXYZ(
        i,
        positions.getX(i) + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
        positions.getY(i) + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
        positions.getZ(i) + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
      );
    }

    positions.needsUpdate = true;
  },
  /* ------------------------ */
  setRotateAnimation: (mesh, options) => {
    if (options.initial.rotationDirection === 'left') {
      if (mesh.rotation.y > 0) mesh.rotation.y += -0.1 * options.default.rotationSpeed;
      else options.initial.rotationDirection = 'right';
    }

    if (options.initial.rotationDirection === 'right') {
      if (mesh.rotation.y > -3) mesh.rotation.y -= -0.1 * options.default.rotationSpeed;
      else options.initial.rotationDirection = 'left';
    }
  },
};

export const slogan = {
  sloganOpacityAnimation: (finalOpacity) => {
    anime.timeline({ loop: false })
      .add({
        targets: '.letter-container .letter',
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2250,
        delay: (el, i) => 150 * (i + 1),
      })
      .add({
        targets: '.letter-container',
        opacity: finalOpacity,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 0,
      });
  },
  /* ------------------------ */
  sloganBlurAnimation: (sloganRef, finalOpacity, styles) => {
    const test = () => {
      if (sloganRef.current) sloganRef.current.classList.add(styles);
    };

    anime.timeline({ loop: false })
      .add({
        targets: '.letter-container',
        opacity: finalOpacity,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 500,
        complete: () => test(),
      });
  },
  /* ------------------------ */
  animateSlogan: (sloganRef) => {
    if (sloganRef && sloganRef.current) {
      const str = sloganRef.current.textContent;
      let newStr = '';

      for (let i = 0; i < str.length; i += 1) {
        if (str[i] === ' ') newStr += ' ';
        else if (str[i] === '\n') newStr += '</br>';
        else newStr += `<span class='letter'>${str[i]}</span>`;
      }

      sloganRef.current.innerHTML = newStr;
    }
  },
  /* ------------------------ */
  setSloganOpacity: (sloganRef, isMobile) => {
    const { pageYOffset, innerHeight } = window;
    const newOpacity = pageYOffset / innerHeight;

    if (sloganRef.current) {
      if (!isMobile) {
        sloganRef.current.style.opacity = (0.1 - 0.25 * newOpacity);
      } else {
        sloganRef.current.style.opacity = 1 - 2.7 * newOpacity;
      }
    }
  },
  /* ------------------------ */
  setOpacity: (canvas, containerCanvas) => {
    const { pageYOffset, innerHeight } = window;

    if (canvas) {
      const ratio = pageYOffset / innerHeight;
      canvas.style.opacity = (1 - 1.4 * ratio);
    }

    if (containerCanvas && containerCanvas.current) {
      const ratio = pageYOffset / innerHeight;
      containerCanvas.current.style.opacity = (1 - 1.4 * ratio);
    }
  },
};

export const getSpeed = (distance, time) => distance / time;

export const loadDuck = async () => {
  try {
    const duck = await new Promise((resolve) => {
      three.loadModel(resolve);
    });

    return duck;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the loadDuck function',
    });
  }
};
