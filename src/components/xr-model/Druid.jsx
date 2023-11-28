/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterAnimations } from "../../contexts/CharacterAnimations";

export const Druid = ({ position, ...props }) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("models/druid.gltf");
  const { actions, names } = useAnimations(animations, group);

  const { setAnimations, animationIndex } = useCharacterAnimations();

  useEffect(() => {
    setAnimations(names);
  }, []);

  useEffect(() => {
    const currentAction = actions[names[animationIndex]];
    currentAction.reset().fadeIn(0.5).play();
    return () => {
      currentAction.reset().fadeOut(0.5);
    };
  }, [animationIndex, actions, names]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.91}>
        <primitive object={nodes.root} />
        <skinnedMesh
          geometry={nodes.druid.geometry}
          material={materials.color_main}
          skeleton={nodes.druid.skeleton}
        />
      </group>
    </group>
  );
};

useGLTF.preload("models/druid.gltf");

