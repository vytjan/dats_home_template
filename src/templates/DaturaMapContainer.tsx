import React, { useEffect, useMemo } from 'react';

import { icon, Icon, LatLngBoundsLiteral } from 'leaflet';
import router from 'next/router';
import {
  MapContainer,
  ImageOverlay,
  Marker,
  Popup,
  useMap,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface DaturaMapContainerProps {
  svgUrl: string;
}

interface SetViewOnClickProps {
  center: [number, number];
  zoom: number;
}

const markerIcon: Icon = icon({
  iconUrl: `${router.basePath}/assets/images/marker-icon.png`,
  iconSize: [50, 50], // replace with the size of your icon
});

const DaturaMapContainer: React.FC<DaturaMapContainerProps> = ({ svgUrl }) => {
  const center: [number, number] = useMemo(() => [0, 0], []);
  const zoom: number = 5; // replace with your initial zoom level
  const minZoom: number = 2;
  const maxZoom: number = 10;

  const SetViewOnClick: React.FC<SetViewOnClickProps> = ({
    center: viewCenter,
    zoom: viewZoom,
  }) => {
    const map = useMap();
    useEffect(() => {
      if (viewZoom >= minZoom && viewZoom <= maxZoom) {
        map.setView(viewCenter, viewZoom);
      }
    }, [map, viewCenter, viewZoom]);

    return null;
  };

  const bounds: LatLngBoundsLiteral = [
    [-50, -120],
    [50, 120],
  ];

  return (
    <MapContainer
      style={{
        height: '100%',
        width: '100%',
      }}
      center={center}
      zoom={zoom}
      bounds={bounds}
      minZoom={minZoom}
      maxZoom={maxZoom}
    >
      <SetViewOnClick center={center} zoom={zoom} />
      <ImageOverlay url={svgUrl} bounds={bounds} />
      <Marker position={[19, -20]} icon={markerIcon}>
        <Popup>Dronia is blah blah.</Popup>
        <Tooltip>Dronia</Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default DaturaMapContainer;
