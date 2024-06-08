"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useRef } from "react";

const Cube = ({ fragmentShader, vertexShader }: Props) => {
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

type Props = {
  fragmentShader: string;
  vertexShader: string;
};
export const Background = (props: Props) => {
  return (
    <Canvas>
      <Cube {...props} />
    </Canvas>
  );
};
