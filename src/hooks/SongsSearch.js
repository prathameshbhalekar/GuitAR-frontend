import { useEffect, useState } from "react";
import axios from "../Utils/axios";
import axiosLib from "axios";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [songs, setSongs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const songUrl = "/api/v1/songs/get";

  useEffect(() => {
    setSongs([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;

    axios({
      method: "GET",
      url: songUrl,
      params: { query: query, page: pageNumber },
      cancelToken: new axiosLib.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setSongs((prevSongs) => {
          return [...prevSongs, ...res.data];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axiosLib.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, songs, hasMore };
}
