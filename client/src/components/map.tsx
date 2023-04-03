import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";

import "styles/map.css";

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY || "";

interface props {
  coordinates: {
    latitude: number;
    longitude: number;
  };
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
              center={{ lat: props.coordinates.latitude, lng: props.coordinates.longitude }}
              zoom={12}
              options={{ disableDefaultUI: true }}
            >
              <Marker
                position={{ lat: props.coordinates.latitude, lng: props.coordinates.longitude }}
              />
            </GoogleMap>
          )}
        </>
      )}
    </Box>
  );
};
