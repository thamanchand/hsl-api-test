import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

import styles from './App.module.scss';
import BusStopList from './components/BusStopList';
import Map from './components/Map';
import SearchControls from './components/common/SearchControls';
import { DEFAULT_POSITION } from './constants';
import { useStopsData } from './hooks/useStopsData';
import { useStopsFilter } from './hooks/useStopsFilter';

const App = () => {
  const [mapPosition, setMapPosition] = useState<[number, number]>([
    DEFAULT_POSITION.lat,
    DEFAULT_POSITION.lng,
  ]);

  const { stops, isDataFetching, error, fetchStops } = useStopsData();
  const {
    searchQuery,
    setSearchQuery,
    distanceFilter,
    setDistanceFilter,
    sortOrder,
    setSortOrder,
    searchedLocation,
    setSearchedLocation,
    filteredAndSortedStops,
  } = useStopsFilter(stops);

  useEffect(() => {
    fetchStops(mapPosition);
  }, [fetchStops, mapPosition]);

  const handleSearchSubmit = () => {
    if (searchQuery) {
      const filteredStops = stops.filter((stop) =>
        stop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredStops.length > 0) {
        const firstStop = filteredStops[0];
        if (typeof firstStop.lat === 'number' && typeof firstStop.lon === 'number') {
          setMapPosition([firstStop.lat, firstStop.lon]);
        }
        setSearchedLocation(searchQuery);
      }
    } else {
      setSearchedLocation('');
    }
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h2>StopSpotter</h2>
        <SearchControls
          searchQuery={searchQuery}
          onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && handleSearchSubmit()
          }
          distanceFilter={distanceFilter}
          onDistanceFilterChange={setDistanceFilter}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
      </header>
      <main className={styles.main}>
        {error && <div className={styles.error}>{error}</div>}
        <BusStopList
          stops={filteredAndSortedStops}
          loading={isDataFetching}
          position={mapPosition}
          locationName={searchedLocation}
        />
        <Map
          position={mapPosition}
          onPositionChange={setMapPosition}
          stops={filteredAndSortedStops}
        />
      </main>
    </div>
  );
};

export default App;
