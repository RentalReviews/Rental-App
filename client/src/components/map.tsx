import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";

import "styles/map.css";

import type { Coordinate } from "types";

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY || "";

interface props {
  coordinates?: Coordinate;
  className: string;
}

export const Map = (props: props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
  });

  return (
    <Box className={props.className}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {props.coordinates && (
            <GoogleMap
              mapContainerClassName="map-container"
              center={
                props.coordinates
                  ? { lat: props.coordinates.lat, lng: props.coordinates.long }
                  : { lat: 0, lng: 0 }
              }
              zoom={12}
              options={{ disableDefaultUI: true }}
            >
              <Marker position={{ lat: props.coordinates.lat, lng: props.coordinates.long }} />
            </GoogleMap>
          )}
        </>
      )}
    </Box>
  );
};
