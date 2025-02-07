import { fetchGraphQL } from "./client";
import {
  Position,
  Stop,
  StopsByRadiusResponse,
  StationsByNameResponse,
} from "../types/busStop";

export const getNearbyStops = async (position: Position): Promise<Stop[]> => {
  const query = `
    query GetNearbyStops($lat: Float!, $lon: Float!, $radius: Int!) {
      stopsByRadius(lat: $lat, lon: $lon, radius: $radius) {
        edges {
          node {
            stop {
              gtfsId
              name
              code
              platformCode
              zoneId
              lat
              lon
            }
            distance
          }
        }
      }
    }
  `;

  const variables = {
    lat: position.latitude,
    lon: position.longitude,
    radius: 500,
  };

  try {
    const data = await fetchGraphQL<StopsByRadiusResponse>(query, variables);

    if (!data?.data?.stopsByRadius?.edges) {
      console.error("Invalid response structure:", data);
      return [];
    }

    return data.data.stopsByRadius.edges.map((edge) => ({
      gtfsId: edge.node.stop.gtfsId,
      name: edge.node.stop.name,
      code: edge.node.stop.code,
      platformCode: edge.node.stop.platformCode,
      zoneId: edge.node.stop.zoneId,
      lat: edge.node.stop.lat,
      lon: edge.node.stop.lon,
      distance: edge.node.distance,
    }));
  } catch (error) {
    console.error("Error fetching nearby stops:", error);
    return [];
  }
};

export const getStationsByName = async (name: string): Promise<Stop[]> => {
  const query = `
    query GetStationsByName($name: String!) {
      stations(name: $name) {
        gtfsId
        name
        lat
        lon
        stops {
          gtfsId
          name
          code
          platformCode
          zoneId
        }
      }
    }
  `;

  const variables = {
    name,
  };

  try {
    const response = await fetchGraphQL<StationsByNameResponse>(
      query,
      variables
    );

    if (!response?.data?.stations) {
      console.error("Invalid response structure:", response);
      return [];
    }

    return response.data.stations.flatMap((station) =>
      station.stops.map((stop) => ({
        ...stop,
        lat: station.lat,
        lon: station.lon,
      }))
    );
  } catch (error) {
    console.error("Error fetching stations by name:", error);
    return [];
  }
};
