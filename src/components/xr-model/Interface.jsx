import React from "react";
import { forwardRef } from "react";
import { useCharacterAnimations } from "../../contexts/CharacterAnimations";
export const Interface = forwardRef((props, ref) => {
  const { animations, animationIndex, setAnimationIndex } =
    useCharacterAnimations();

  return (
    <div id="overlay-content" ref={ref}>
      <div className="dom-container">
        <div className="button-container">
          {animations.map((animation, index) => {
            return (
              <button
                key={animation}
                className={`button ${index === animationIndex ? "active" : "inactive"}`}
                onClick={() => {
                  setAnimationIndex(index);
                }}
              >
                {animation}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
