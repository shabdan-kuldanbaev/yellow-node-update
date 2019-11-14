import React, { useEffect, useRef, Fragment } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import DuckModel from './model/Duck_0.3.obj';

import * as styles from './styles.module.scss';

const s = {
  vs: `
      uniform float scale;
      uniform vec3 mouse;

      varying vec2 vUv;

      void main(){
        vUv = uv;
        vec3 newpos = position;
        vec3 dir = newpos - mouse;
        float distance = length(dir);
        float radius = 3.;

        if(distance < radius){
            float ratio = 1. - distance / radius;
            newpos -= dir * (ratio * ratio);
        }

        vec4 mvPosition = modelViewMatrix * vec4(newpos, 1.0);
        gl_PointSize = 10000. * (1. / - mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
`,
  fs: `
      varying vec2 vUv;

      void main(){
        
        vec2 uv = vUv;
        gl_FragColor = vec4(1.0, 0.9, 0.01, 1.0);
      }
`
};


const Duck = () => {
  const containerRef = useRef(null);
  const sloganRef = useRef(null);
  const overlay = useRef(null);

  const animationTypes = ['appear', 'getTogether', 'pagination'];
  // 500 = 9s
  const initialAnimationTime = 500;
  let animationDelay = 0.0001;

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
      particleVelocity: .005,
      isAppear: false,
      currentAnimation: animationTypes[0],
      rotationSpeed: .0005,
      rotationDirection: 'left',
    },
    default: {
      meshPositionX: 0,
      meshPositionY: -300, // -300
      meshPositionZ: 0,
      meshRotationX: 0,
      meshRotationY: 1.55, // 1.55
      meshRotationZ: 0,
      meshScale: 80, // 80
      rotationSpeed: .009,
    }
  };

  let camera, scene, renderer;
  let originals, meshes = [], clones, meshClones = [];
  let composer;
  let raycaster = new THREE.Raycaster();
  let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  let mouse = { x: 0, y: 0 };
  let scatterStep = 0;
  let mat = 0;

  const getSpeed = (distance, time) => distance / time;

  const setRandomPosition = (mesh) => {
    const positions = mesh.geometry.attributes.position;
    const count = positions.count;

    for (let i = 0; i < count; i += 1) {
      let px = positions.getX(i);
      let py = positions.getY(i);
      let pz = positions.getZ(i);

      if (scatterStep < .0125) scatterStep += 0.01;

      positions.setXYZ(
        i,
        px + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
        py + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
        pz + Math.random() * (Math.random() * (scatterStep) - scatterStep / 2),
      );
    }
    positions.needsUpdate = true;
  }

  const setRotateAnimation = (mesh) => {
    if (options.initial.rotationDirection === 'left') {
      if (mesh.rotation.y > 0) mesh.rotation.y += - .1 * options.default.rotationSpeed
      else options.initial.rotationDirection = 'right';
    }

    if (options.initial.rotationDirection === 'right') {
      if (mesh.rotation.y > -3) mesh.rotation.y -= - .1 * options.default.rotationSpeed
      else options.initial.rotationDirection = 'left';
    }
  }

  const init = () => {
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 50000);
    camera.position.set(0, 0, 5000);
    scene = new THREE.Scene();
    camera.lookAt(scene.position);
    const loader = new OBJLoader();
    loader.load(DuckModel, (obj) => {
      mat = new THREE.ShaderMaterial({
        uniforms: {
          time: {
            type: "f",
            value: 0
          },
          resolution: {
            type: "v2",
            value: new THREE.Vector2(window.innerWidth, window.innerHeight)
          },
          mouse: {
            type: "v3",
            value: new THREE.Vector3(0, 0, 0)
          },
          scale: {
            type: "f",
            value: window.innerHeight / 2
          },
        },
        vertexShader: s.vs,
        fragmentShader: s.fs
      });

      const positions = combineBuffer(obj, 'position');

      createMesh(positions, scene);

      setTimeout(() => {
        document.getElementsByTagName('header')[0].classList.add(styles.animate);
        document.getElementsByTagName('footer')[0].classList.add(styles.animate);
      }, 500);

      document.addEventListener('mousemove', onDocumentMouseMove, false);
      document.addEventListener('touchmove', onDocumentMouseMove, false);
      document.addEventListener('touchstart', onDocumentMouseMove, false);
    });
  
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.autoClear = false;
    containerRef.current.appendChild(renderer.domElement);

    // postprocessing
    const renderModel = new RenderPass(scene, camera);
    composer = new EffectComposer(renderer);
    composer.addPass(renderModel);

    window.addEventListener('resize', onWindowResize, false);
  };

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    camera.lookAt(scene.position);
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  }

  const onDocumentMouseDown = (ev) => {
    if (options.initial.isAppear) {
      options.initial.currentAnimation = animationTypes[2];
      sloganRef.current.style.opacity = 0;
      sloganRef.current.style.transition = 'opacity 1s';
    };
  }

  const onDocumentMouseUp = (ev) => {
    if (options.initial.isAppear) {
      options.initial.currentAnimation = animationTypes[1];
      sloganRef.current.style.opacity = .1;
      sloganRef.current.style.transition = 'opacity 1s';
    };
  }

  const onDocumentMouseMove = (ev) => {
    mouse.x = ev.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(
      plane,
      mat.uniforms.mouse.value
    );
    meshes[0].worldToLocal(mat.uniforms.mouse.value);
  }

  const onWindowScroll = (e) => {
    const ratio = window.pageYOffset / window.innerHeight;
    const canvas = document.querySelector('canvas');
    canvas.style.opacity = 1 - ratio;
  }

  const combineBuffer = (model, bufferName) => {
    let count = 0;
    model.traverse((child) => {
      if (child.isMesh) {
        const buffer = child.geometry.attributes[bufferName];
        count += buffer.array.length;
      }
    });
    const combined = new Float32Array(count);
    let offset = 0;
    model.traverse(function (child) {
      if (child.isMesh) {
        var buffer = child.geometry.attributes[bufferName];
        combined.set(buffer.array, offset);
        offset += buffer.array.length;
      }
    });
    return new THREE.BufferAttribute(combined, 3);
  }

  const createMesh = (positions, scene) => {
    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', positions.clone());
    geometry.addAttribute('initialPosition', positions.clone());
    geometry.attributes.position.setDynamic(true);

    originals = [{ positions: { x: 0, y: 0, z: 0 } }];

    originals.forEach(original => {
      const mesh = new THREE.Points(geometry, mat);

      mesh.scale.x = mesh.scale.y = mesh.scale.z = options.default.meshScale;

      mesh.position.x = options.default.meshPositionX + original.positions.x;
      mesh.position.y = options.default.meshPositionY + original.positions.y;
      mesh.position.z = options.default.meshPositionZ + original.positions.z;

      mesh.rotation.x = options.default.meshRotationX;
      mesh.rotation.y = options.default.meshRotationY;
      mesh.rotation.z = options.default.meshRotationZ;

      scene.add(mesh);

      meshes.push(mesh);
    });

    clones = [
      {
        positions: { x: 0, y: 0, z: 0 },
        color: { r: 252, g: 3, b: 3 },
        scale: .1,
        opacity: 0,
      },
      {
        positions: { x: 0, y: 0, z: 0 },
        color: { r: 2, g: 219, b: 35 },
        scale: .1,
        opacity: 0,
      },
      {
        positions: { x: 0, y: 0, z: 0 },
        color: { r: 25, g: 0, b: 247 },
        scale: .1,
        opacity: 0,
      },
    ];

    clones.forEach(clone => {
      const mesh = new THREE.Points(geometry, new THREE.PointsMaterial({ size: 10 }));
      mesh.scale.x = mesh.scale.y = mesh.scale.z = clone.scale;
  
      mesh.position.x = options.default.meshPositionX + clone.positions.x;
      mesh.position.y = options.default.meshPositionY + clone.positions.y;
      mesh.position.z = options.default.meshPositionZ + clone.positions.z;

      mesh.rotation.x = options.default.meshRotationX;
      mesh.rotation.y = options.default.meshRotationY;
      mesh.rotation.z = options.default.meshRotationZ;

      mesh.material.color = new THREE.Color(`rgb(${clone.color.r}, ${clone.color.g}, ${clone.color.b})`);
      mesh.material.opacity = clone.opacity;

      scene.add(mesh);

      meshClones.push(mesh);
    });
  }

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  }

  const render = () => {
    // animation
    switch (options.initial.currentAnimation) {
      case 'appear': {
        meshes.forEach(mesh => {
          const positions = mesh.geometry.attributes.position;
          const count = positions.count;
          mesh.rotation.y += - 0.1 * options.initial.rotationSpeed;

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
      };

      case 'getTogether': {
        meshes.forEach(mesh => {
          const initialPosition = mesh.geometry.attributes.initialPosition;
          const positions = mesh.geometry.attributes.position;
          const count = positions.count;

          setRotateAnimation(mesh);

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

            if (animationDelay < .01) animationDelay += .0000005;

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

        meshClones.forEach(mesh => {
          const positions = mesh.geometry.attributes.position;

          setRotateAnimation(mesh);

          mesh.material.opacity = .0;
          mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.01;

          positions.needsUpdate = true;
          scatterStep = 0;
        });

        break;
      };

      case 'pagination': {
        meshes.forEach(mesh => setRandomPosition(mesh));

        meshClones.forEach((mesh, index) => {
          mesh.material.opacity = 1.0;
          mesh.scale.x = mesh.scale.y = mesh.scale.z = options.default.meshScale + ((index + 1) * 2);

          setRandomPosition(mesh);
        })

        break;
      }
    }

    composer.render(0.01);
  }

  useEffect(() => {
    init();
    animate();

    window.addEventListener('scroll', onWindowScroll, false);

    if (sloganRef) {
      const str = sloganRef.current.textContent;
      let newStr = '';

      for (let i = 0; i < str.length; i += 1) {
        if (str[i] === ' ') newStr += ' ';
        else newStr += `<span class='letter'>${str[i]}</span>`;
      };

      sloganRef.current.innerHTML = newStr;
    };

    window.anime.timeline({ loop: false })
      .add({
        targets: '.letter-container .letter',
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 2250,
        delay: (el, i) => 150 * (i + 1)
      }).add({
        targets: '.letter-container',
        opacity: .1,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 0,
      });

    setTimeout(() => {
      options.initial.currentAnimation = animationTypes[1];
      sloganRef.current.classList.add(styles.setBlur);
      document.addEventListener('mousedown', onDocumentMouseDown, false);
      document.addEventListener('mouseup', onDocumentMouseUp, false);
    }, 5700);
  }, []);

  return (
    <Fragment>
      <div className={styles.text}>
        <h1 ref={sloganRef} className="letter-container">WE CREATE FANTASTIC SOFTWARE</h1>
      </div>
      <div id="container" ref={containerRef} />
      <div ref={overlay} className={styles.overlay} />
    </Fragment>
  );
};

export default Duck;