import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import "styles/map.css";
import Geocode from "react-geocode";

const apikey = "AIzaSyC9UOdRpOXb5QbE8DMYgyLcrfJBkOGg9Rc";
interface latlong {
  lat: number;
  long: number;
}
interface props {
  address: string;
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apikey,
  });
  const center = useMemo(() => ({ lat: latlong.lat, lng: latlong.long }), []);
  return (
    <div className="map">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <GoogleMap mapContainerClassName="map-container" center={center} zoom={10}>
            <Marker position={{ lat: latlong.lat, lng: latlong.long }} />
          </GoogleMap>
        </>
      )}
    </div>
  );
};
//"2445 Guilford Dr, Abbotsford, BC V2S 5M1, Canada"
