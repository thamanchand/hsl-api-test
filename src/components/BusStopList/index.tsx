import React, { useEffect, useState } from 'react';
import { useReverseGeocode } from '../../hooks/useReverseGeocode';
import BusStopCard from '../BusStopCard/BusStopCard';
import styles from './BusStopList.modules.scss';
import { Stop } from '../../types/busStop';

interface BusStopListProps {
  stops: Stop[];
  loading: boolean;
  position: [number, number];
}

const BusStopList = ({ stops, loading, position }: BusStopListProps) => {
  const { address, isLoading: isAddressLoading } = useReverseGeocode(position);

  return (
    <div className={styles.results}>
      {address && (
        <div className={styles.currentLocation}>
          <h3>Stops nearby:</h3>
          <p className={styles.addressText}>{address}</p>
        </div>
      )}

      {loading && (
        <div className={styles.loading}>
          <p className={styles.loadingText}>Loading...</p>
        </div>
      )}

      {!loading && stops.length === 0 && (
        <div className={styles.noStops}>
          <p className={styles.noStopsText}>No nearby stops found</p>
        </div>
      )}

      {!loading &&
        stops.length > 0 &&
        stops.map((stop) => <BusStopCard key={stop.gtfsId} stop={stop} />)}
    </div>
  );
};

export default BusStopList;
