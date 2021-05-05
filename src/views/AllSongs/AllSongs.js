import React, { useRef, useCallback } from "react";
import "./AllSongs.css";
import TopBar from "./../../components/TopBar/topbar";
import SongsSearch from "../../hooks/SongsSearch";
import { useSelector, useDispatch } from "react-redux";
import actions from "./../../actions/index";
import Loading from "./../../animations/loading/loading";
import songImage from "./../../images/music_logo.png";
import { Link } from "react-router-dom";

function AllSongs() {
  const selector = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  const { songs, hasMore, loading, error } = SongsSearch(
    selector.query,
    selector.pageNumber
  );

  const observer = useRef();

  const lastSongElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch({ type: actions.INCREMENT_SEARCH_PAGE });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const renderedSongs = songs.map((song, index) => {
    return (
      <Link
        className="songtile"
        ref={songs.length === index + 1 ? lastSongElementRef : null}
        style={{
          animationDelay: `${(index % 10) * 40}ms`,
        }}
        to={`PlaySong?title=${song.title}`}
      >
        <img src={songImage} className="songtile__icon" alt="album cover" />
        <div className="songtile__name__container">
          <h3 className="songtitle">{song.title}</h3>

          <div
            className="songtitle__info__container"
            style={{
              animationDelay: `${index * 10}ms`,
            }}
          >
            <h5 className="songtitle__info__artist songtitle__info__text">
              artist: {song.artist}
            </h5>
            <h5 className="songtitle__info__difficulty songtitle__info__text">
              {song.info1 === "" ? "-" : song.info1}
            </h5>
            <h5 className="songtitle__info__tuning songtitle__info__text">
              {song.info2 === "" ? "-" : song.info2}
            </h5>
            <h5 className="songtitle__info__capo songtitle__info__text">
              {song.info3 === "" ? "-" : song.info3}
            </h5>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="all-songs">
      <TopBar />
      <ul id="ul">
        {renderedSongs}
        <div className="loading_anim">
          {loading && hasMore ? <Loading /> : null}
        </div>
        <div>{error && "Error"}</div>
      </ul>
    </div>
  );
}
export default AllSongs;
