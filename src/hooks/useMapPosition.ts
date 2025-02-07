import { useState, useCallback } from "react";
import { Position } from "../types";
import { DEFAULT_POSITION } from "../constants";

export const useMapPosition = () => {
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);

  const updatePosition = useCallback((newPosition: Position) => {
    setPosition(newPosition);
  }, []);

  return { position, updatePosition, DEFAULT_POSITION };
};
