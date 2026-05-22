"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useLoader } from "@react-three/fiber";
import { useRef } from "react";

function Model() {
  const fbx = useLoader(FBXLoader, "/models/van.FBX");
  const ref = useRef<any>();

 useFrame(({ mouse }) => {
  if (ref.current) {

    ref.current.rotation.y += (
      mouse.x * 0.8 - ref.current.rotation.y
    ) * 0.03;

    ref.current.rotation.x += (
      -mouse.y * 0.2 - ref.current.rotation.x
    ) * 0.03;

  }
});

  return (
    <primitive
      ref={ref}
      object={fbx}
      scale={0.05}
      position={[0, -1, 0]}
    />
  );
}

export default function Van() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 1, 5] }}>
        
        <ambientLight intensity={0.5} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <pointLight
          position={[0, 2, 2]}
          intensity={20}
          color="#60a5fa"
        />

        <Model />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}