import { useState, useCallback } from "react";
import { getNearbyStops } from "../api/busStops";
import { Position, Stop } from "../types/busStop";

export const useBusStops = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyStops = useCallback(async (position: Position) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getNearbyStops(position);
      setStops(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stops,
    loading,
    error,
    fetchNearbyStops,
  };
};
