import { useState, useCallback } from "react";

import { DEFAULT_POSITION } from "../constants";
import { Position } from "../types";

export const useMapPosition = () => {
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);

  const updatePosition = useCallback((newPosition: Position) => {
    setPosition(newPosition);
  }, []);

  return { position, updatePosition, DEFAULT_POSITION };
};
