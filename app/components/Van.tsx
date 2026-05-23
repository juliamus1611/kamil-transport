"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { useRef } from "react";
import type { Object3D } from "three";

function Model() {
  const fbx = useLoader(FBXLoader, "/models/van.FBX");
  const ref = useRef<Object3D | null>(null);

  useFrame(({ mouse }) => {
    if (ref.current) {
      ref.current.rotation.y += (mouse.x * 0.8 - ref.current.rotation.y) * 0.03;
      ref.current.rotation.x +=
        (-mouse.y * 0.2 - ref.current.rotation.x) * 0.03;
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
    <div className="h-[500px] w-full">
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
