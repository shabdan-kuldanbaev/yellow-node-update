export const animationTypes = ['appear', 'getTogether', 'pagination'];

export const shaders = {
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
`,
};
