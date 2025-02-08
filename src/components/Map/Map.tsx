import L from 'leaflet';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import { DEFAULT_POSITION } from '../../constants';
import { Stop } from '../../types/busStop';

import styles from './Map.module.scss';

interface MapProps {
  position: [number, number];
  onPositionChange: (newPos: [number, number]) => void;
  stops?: Stop[];
}

// Custom marker icon for bus stops
const busStopIcon = L.icon({
  iconUrl: '/bus-marker.png',
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const MapComponent = ({
  onPositionChange,
}: {
  onPositionChange: (newPos: [number, number]) => void;
}) => {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      onPositionChange([center.lat, center.lng]);
    },
  });

  return null;
};

const Map = ({
  position = [DEFAULT_POSITION.lat, DEFAULT_POSITION.lng],
  onPositionChange,
  stops = [],
}: MapProps) => {
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: '100%', width: '100%', position: 'relative' }}
      >
        <div className={styles.overlay}>
          Find nearby bus stops by dragging the map or moving the marker.
        </div>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Main position marker */}
        <Marker
          position={position}
          draggable={true}
          eventHandlers={{
            dragend: (event) => {
              const marker = event.target;
              const newPosition = marker.getLatLng();
              onPositionChange([newPosition.lat, newPosition.lng]);
            },
          }}
        />
        <MapComponent onPositionChange={onPositionChange} />

        {/* Bus stop markers */}
        {stops.map((stop) =>
          stop.lat && stop.lon ? (
            <Marker key={stop.gtfsId} position={[stop.lat, stop.lon]} icon={busStopIcon}></Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
