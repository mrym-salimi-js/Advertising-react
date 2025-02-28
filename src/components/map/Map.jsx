import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapCenterMarker } from './MapCenterMarker';
import { MapCurrentLocation } from './MapCurrentLocation';
import { MapAutomaticChanges } from './MapAutomaticChanges';
// import { Icon } from 'leaflet';
// import { mapMerker } from '../globals/Icons';
import { useState } from 'react';
import { mapMerker } from '../globals/Icons';
import { Icon } from 'leaflet';

export function Map({
  width,
  lat,
  lon,
  page,
  zoom,
  setNewAdStorageValue,
  newAdStorageValue,
}) {
  const [movedLat, setMovedLat] = useState();
  const [movedLon, setMovedLon] = useState();

  const [mapMoved, setMapMoved] = useState(false);

  const customIcon = new Icon({
    iconUrl: mapMerker,
    iconSize: [35, 35],
    iconAnchor: [lat, lon],
  });

  return (
    <div className={`w-full lg:w-[${width}] `}>
      <MapContainer
        className='w-full h-[300px]'
        center={[lat, lon]}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {page === 'single' && (
          <Marker position={[lat, lon]} icon={customIcon} />
        )}

        {page === 'newAd' && (
          <>
            {mapMoved && <MapCenterMarker />}

            <MapCurrentLocation
              setMovedLat={setMovedLat}
              setMovedLon={setMovedLon}
            />

            <MapAutomaticChanges
              lat={lat}
              lon={lon}
              setNewAdStorageValue={setNewAdStorageValue}
              newAdStorageValue={newAdStorageValue}
              setMovedLat={setMovedLat}
              setMovedLon={setMovedLon}
              movedLat={movedLat}
              movedLon={movedLon}
              setMapMoved={setMapMoved}
            />
          </>
        )}
      </MapContainer>
    </div>
  );
}
