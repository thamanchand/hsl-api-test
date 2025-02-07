import styles from "./BusStopList.module.scss";
import BusStopCard from "../BusStopCard/BusStopCard";
import { Stop } from "../../types/busStop";
import { useReverseGeocode } from "../../hooks/useReverseGeocode";

interface BusStopListProps {
  stops: Stop[];
  loading: boolean;
  position: [number, number];
  locationName?: string;
}

const BusStopList = ({
  stops,
  loading,
  position,
  locationName,
}: BusStopListProps) => {
  const { address, isLoading: isAddressLoading } = useReverseGeocode(position);

  return (
    <div className={styles.results}>
      {(address || locationName) && (
        <div className={styles.currentLocation}>
          <h3>Stops nearby: </h3>
          <text className={styles.addressText}>{locationName || address}</text>
        </div>
      )}
      {loading || isAddressLoading ? (
        <div className={styles.loading}>
          <text className={styles.loadingText}>Loading...</text>
        </div>
      ) : stops.length === 0 ? (
        <div className={styles.noStops}>
          <text className={styles.noStopsText}>No nearby stops found</text>
        </div>
      ) : (
        stops.map((stop) => <BusStopCard key={stop.gtfsId} stop={stop} />)
      )}
    </div>
  );
};

export default BusStopList;
