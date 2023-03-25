import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<null | string | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const source = axios.CancelToken.source();
    getData(url).then((data) => {
      setLoading(false);
      setData(data);
      console.log(data);
    });
    return () => {
      source.cancel();
    };
  }, [url]);

  const getData = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Awkward..");
    }
  };

  return { data, loading, error };
}
export { useFetch };
