import React from "react";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Interactive, useHitTest, useXR } from "@react-three/xr";
import { Druid } from "./Druid";
import { useThree } from "@react-three/fiber";

export const XrOverlay = () => {
  const reticleRef = useRef();
  const [models, setModels] = useState([]);
  
  const { isPresenting } = useXR();

  useHitTest((hitMatrix, hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    );
  });

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });
  const palceModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModels([{ position, id }]);
  };
  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => {
          return <Druid position={position} />;
        })}
      {isPresenting && (
        <Interactive onSelect={palceModel}>
          <mesh ref={reticleRef} rotation-x={Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}
      {!isPresenting && <Druid />}
    </>
  );
};
