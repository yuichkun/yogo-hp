"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useRef } from "react";

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
}
`;

const fragmentShader = `
varying vec2 vUv;

vec3 colorA = vec3(0.912,0.191,0.652);
vec3 colorB = vec3(1.000,0.777,0.052);

void main() {
  // "Normalizing" with an arbitrary value
  // We'll see a cleaner technique later :)   
  vec2 normalizedPixel = gl_FragCoord.xy/600.0;
  vec3 color = mix(colorA, colorB, normalizedPixel.x);

  gl_FragColor = vec4(color,1.0);
}

`;

const Cube = () => {
  const mesh = useRef();
  const { size } = useThree(); // Get the size of the canvas

  return (
    <mesh ref={mesh as any} position={[0, 0, 0]} scale={1.0}>
      <planeGeometry args={[size.width, size.height, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

export const Background = () => {
  return (
    <Canvas>
      <Cube />
    </Canvas>
  );
};
