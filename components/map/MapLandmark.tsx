'use client';
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

const iconUrl =
  'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconSize: [20, 30],
});

type LatLng = [number, number];
type LocationMarkerProps = {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
};

function LocationMarker({ position, setPosition }: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      const newLocation: LatLng = [e.latlng.lat, e.latlng.lng];
      map.locate();
      setPosition(newLocation);
      map.flyTo(e.latlng, map.getZoom());
    },
    // locationfound(e) {},
  });

  return position === null ? null : (
    <Marker position={position} icon={markerIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

const MapLandmark = ({
  location,
}: {
  location?: { lat: number; lng: number };
}) => {
  const defaultLocation: [number, number] = [7.405534, 99.509659];
  const [position, setPosition] = useState<LatLng | null>(null);

  // console.log('MapLandmark position:', position);
  return (
    <>
      <h1 className="mt-4 font-semibold">Pin location !!</h1>
      <input name="lat" value={position ? position[0] : ''} type="hidden" />
      <input name="lng" value={position ? position[1] : ''} type="hidden" />
      <MapContainer
        className="h-[50vh] rounded-lg z-0 relative mb-2"
        center={location || defaultLocation}
        zoom={10}
        scrollWheelZoom={true}
      >
        {/* Default Position */}
        <Marker
          position={location ? [location.lat, location.lng] : defaultLocation}
          icon={markerIcon}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <LocationMarker position={position} setPosition={setPosition} />

        <LayersControl position="topright">
          <LayersControl.BaseLayer name="OpenStreetMap" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LayersControl.BaseLayer name="CARTO">
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="cyclosm">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">cyclosm</a>'
                url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
    </>
  );
};
export default MapLandmark;
