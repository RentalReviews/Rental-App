import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
import "styles/map.css";
import Geocode from "react-geocode";
import { Box } from "@chakra-ui/react";

const apikey = "AIzaSyC9UOdRpOXb5QbE8DMYgyLcrfJBkOGg9Rc";
interface latlong {
  lat: number;
  long: number;
}
interface props {
  address: string;
  className: string;
}

export const Map = (props: props) => {
  const [latlong, setLatlong] = useState<latlong>({ lat: 0, long: 0 });
  useState(() => {
    Geocode.setApiKey(apikey);
    Geocode.fromAddress(props.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLatlong({ lat: lat, long: lng });
      },
      (error) => {
        console.error(error);
      }
    );
  });
  const center = { lat: latlong.lat, lng: latlong.long };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey,
  });

  return (
    <Box className={props.className}>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={12}
            options={{ disableDefaultUI: true }}
          >
            <Marker position={{ lat: latlong.lat, lng: latlong.long }} />
          </GoogleMap>
        </>
      )}
    </Box>
  );
};
//"2445 Guilford Dr, Abbotsford, BC V2S 5M1, Canada"
