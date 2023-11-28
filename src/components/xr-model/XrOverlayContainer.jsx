import { ARButton, XR, Controllers } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";
import { XrOverlay } from "./XrOverlay";
import { CharacterAnimationsProvider } from "../../contexts/CharacterAnimations";
import { Interface } from "./Interface";
import React, { useCallback, useState } from "react";

export const XrOverlayContainer = () => {
  const [overlayContent, setOverlayContent] = useState(null);

  let interfaceRef = useCallback((node) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  }, []);

  return (
    <React.Fragment>
      <CharacterAnimationsProvider>
        <ARButton
          className="ar-button"
          sessionInit={{
            requiredFeatures: ["hit-test"],
            optionalFeatures: ["dom-overlay"],
            domOverlay: {
              root: overlayContent,
            },
          }}
        />
        <Canvas>
          <XR foveation={0}>
            <Controllers />
            <XrOverlay />
          </XR>
        </Canvas>
        <Interface ref={interfaceRef} />
      </CharacterAnimationsProvider>
    </React.Fragment>
  );
};