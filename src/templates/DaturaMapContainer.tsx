import React, { useEffect, useMemo } from 'react';

import {
  icon,
  Icon,
  LatLngBoundsLiteral,
  LatLngExpression,
  LatLngTuple,
} from 'leaflet';
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
  imageUrl: string;
  imagePosition: [number, number];
  greenhouseText: string;
  greenhouseName: string;
}

interface SetViewOnClickProps {
  center: [number, number];
  zoom: number;
}

const markerIcon: Icon = icon({
  iconUrl: `${router.basePath}/assets/images/marker-icon.png`,
  iconSize: [50, 50], // replace with the size of your icon
});

const DaturaMapContainer: React.FC<DaturaMapContainerProps> = ({
  svgUrl,
  imageUrl,
  greenhouseText,
  greenhouseName,
}) => {
  const center: [number, number] = useMemo(() => [0, 0], []);
  const zoom: number = 5; // replace with your initial zoom level
  const minZoom: number = 2;
  const maxZoom: number = 10;

  // 2180.9883 4608.1875
  function normalizeCoordinates(
    svgX: number,
    svgY: number,
    svgWidth: number,
    svgHeight: number,
    bounds: LatLngBoundsLiteral | [any, any, any, any]
  ) {
    const [west, south, east, north] = [
      bounds[0][0],
      bounds[0][1],
      bounds[1][0],
      bounds[1][1],
    ];
    // console.log(west, south, east, north);
    const lng = west + (east - west) * (svgX / svgWidth);
    // console.log(lng);
    const lat = south + (north - south) * (1 - svgY / svgHeight);
    // console.log(lat);
    const latlng: LatLngExpression = [lat, lng];
    return latlng;
  }

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
    [-69.98, -69.98],
    [68.95, 68.95],
  ];

  const svgX = 2180.9883; // replace with the X coordinate from step 2
  const svgY = 4608.1875; // replace with the Y coordinate from step 2
  const svgWidth = 8192.0; // replace with the width of your SVG image
  const svgHeight = 8139.0; // replace with the height of your SVG image
  // const bounds = ...; // replace with the bounds of your map

  const position: LatLngTuple = normalizeCoordinates(
    svgX,
    svgY,
    svgWidth,
    svgHeight,
    bounds
  );
  console.log(position);

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
      <Marker position={position} icon={markerIcon}>
        <Popup minWidth={200}>
          <img className="object-fill" src={imageUrl} alt="greenhouse image" />
          <p>
            <b>{greenhouseName}</b>
          </p>
          <p>located in: {greenhouseText}</p>
        </Popup>
        <Tooltip>{greenhouseName}</Tooltip>
      </Marker>
    </MapContainer>
  );
};

export default DaturaMapContainer;
