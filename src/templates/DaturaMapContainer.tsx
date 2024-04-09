import React, { useEffect, useMemo } from 'react';

import { icon, Icon, LatLngBoundsLiteral, LatLngExpression } from 'leaflet';
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
import { GreenhouseCoords, SingleCoordinates } from '../../utils/types';

interface DaturaMapContainerProps {
  greenhouses: GreenhouseCoords;
  currentGreenhouse: SingleCoordinates | null;
}

interface SetViewOnClickProps {
  center: [number, number];
  zoom: number;
}

const markerIcon: Icon = icon({
  iconUrl: `${router.basePath}/assets/images/icons/pin.svg`,
  iconSize: [20, 20], // replace with the size of your icon
});

const currentMarkerIcon: Icon = icon({
  iconUrl: `${router.basePath}/assets/images/icons/YellowDot.svg`,
  iconSize: [25, 25], // replace with the size of your icon
});

const DaturaMapContainer: React.FC<DaturaMapContainerProps> = ({
  greenhouses,
  currentGreenhouse,
}) => {
  const center: [number, number] = useMemo(() => [0.5, 0.5], []);
  const zoom: number = 10; // replace with your initial zoom level
  const minZoom: number = 10;
  const maxZoom: number = 40;
  const svgUrl = `${router.basePath}/assets/images/datura_map_fixed.svg`;

  // normalize the coordinates from px to lang/lat
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

  // the bounds of the map, approximate long/lat values
  const bounds: LatLngBoundsLiteral = [
    [0, 0], // top-left corner of the map
    [1, 1], // bottom-right corner of the map
  ];

  // width and height of the SVG map image
  const svgWidth = 8192.0; // replace with the width of your SVG image
  const svgHeight = 8139.0; // replace with the height of your SVG image

  // the X and Y coordinates of the greenhouse on the SVG map
  // const point = nor(greenhouseText);

  // assemble the full list of greenhouses already minted
  const greenhousesWithPositions = greenhouses.map((greenhouse) => {
    const point = greenhouse.coordinates; // replace with the actual property name

    if (point) {
      const position = normalizeCoordinates(
        point.x,
        point.y,
        svgWidth,
        svgHeight,
        bounds
      );

      return {
        ...greenhouse,
        position,
      };
    }

    return {
      ...greenhouse,
      position: null,
    };
  });

  // if in the single NFT view, mark the current greenhouse separately on the map
  let currentNft = null;
  if (currentGreenhouse !== null) {
    if (currentGreenhouse.coordinates) {
      const pointCurr = currentGreenhouse.coordinates;
      const positionCurr = normalizeCoordinates(
        pointCurr.x,
        pointCurr.y,
        svgWidth,
        svgHeight,
        bounds
      );
      currentNft = {
        ...currentGreenhouse,
        position: positionCurr,
      };
    }
  }

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
      {greenhousesWithPositions.map(
        (greenhouse, index) =>
          greenhouse.position && (
            <Marker
              key={index}
              position={greenhouse.position}
              icon={markerIcon}
            >
              <Popup minWidth={200}>
                <p>
                  <b>{greenhouse.name}</b>
                </p>
              </Popup>
              <Tooltip>{greenhouse.name}</Tooltip>
            </Marker>
          )
      )}
      {currentNft && currentNft.position && (
        <Marker position={currentNft.position} icon={currentMarkerIcon}>
          <Popup minWidth={200}>
            <p>
              <b>{currentNft.name}</b>
            </p>
          </Popup>
          <Tooltip>{currentNft.name}</Tooltip>
        </Marker>
      )}
    </MapContainer>
  );
};

export default DaturaMapContainer;
