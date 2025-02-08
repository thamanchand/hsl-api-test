import { useState, useCallback } from "react";

import { getNearbyStops } from "../api/busStops";
import { Position, Stop } from "../types/busStop";

export const useStopsData = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [isDataFetching, setIsDataFetching] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStops = useCallback(async (position: [number, number]) => {
    if (!position) return;

    setIsDataFetching(true);
    setError(null);

    try {
      const positionData: Position = {
        latitude: position[0],
        longitude: position[1],
      };
      const data = await getNearbyStops(positionData);
      setStops(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsDataFetching(false);
    }
  }, []);

  return { stops, isDataFetching, error, fetchStops };
};
