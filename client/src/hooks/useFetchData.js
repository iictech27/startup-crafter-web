import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return [data, isLoading, setLoading];
}
