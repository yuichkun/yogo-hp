"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Mesh, ShaderMaterial } from "three";

const Cube = ({ fragmentShader, vertexShader }: Props) => {
  const mesh = useRef<Mesh>();
  const { size } = useThree(); // Get the size of the canvas
  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      (mesh.current.material as ShaderMaterial).uniforms.u_time.value =
        clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh as any} position={[0, 0, 0]} scale={1.0}>
      <planeGeometry args={[size.width, size.height, 32, 32]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
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
    <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
      <Cube {...props} />
    </Canvas>
  );
};
