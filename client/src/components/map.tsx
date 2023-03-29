import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "styles/map.css";
import { Box } from "@chakra-ui/react";
import { coordinates } from "./Posting";
const apikey = "AIzaSyC9UOdRpOXb5QbE8DMYgyLcrfJBkOGg9Rc";

interface props {
  coordinates?: coordinates;
  className: string;
}

export const Map = (props: props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey,
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
