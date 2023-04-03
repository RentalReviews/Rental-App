import fetch from "node-fetch";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Query Google Maps API and return the coordinates of an address
 *
 * @param address Address to query
 * @returns null if none found, or an object with the coordinates
 */
const getCoordinates = async (address: string): Promise<{ lat: string; lng: string } | null> => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!data || data.status != "OK") {
    return null;
  } else {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }
};

export { getCoordinates };
