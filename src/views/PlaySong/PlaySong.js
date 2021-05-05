import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "../../Utils/axios";
import "./PlaySong.css";
import { useSelector } from "react-redux";
import Song from "./../../Utils/Song";
import tabs from "./../../Utils/Tabs";
import Promt from "./../../components/Promt/Promt";
import Image from "./../../images/finger_coding.jpg";
import Draw from "../../hooks/Draw";
import RotateDevice from "./../../animations/RotateDevice/RotateDevice";

export default function PlaySong(props) {
  const User = useSelector((state) => state.isLoggedIn).user;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const points = useRef(null);
  const song = useRef(null);
  const pos = useRef(0);
  const tab = useRef(null);
  const getNextTimerId = useRef(null);
  const playButton = useRef(null);
  const strokeColor = useRef("Red");
  const textColor = useRef("Red");
  const speed = useRef(2);

  const [Text, setText] = useState("");
  const [IsPaused, setIsPaused] = useState(true);
  const [IsLanscape, setIsLanscape] = useState(
    window.matchMedia("(orientation: landscape)").matches
  );

  var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange
      ? "orientationchange"
      : "resize";
  window.addEventListener(
    orientationEvent,
    function () {
      setIsLanscape(window.matchMedia("(orientation: landscape)").matches);
    },
    false
  );

  function getNext() {
    console.log(pos.current);
    const LYRICS = "LYRICS";
    if (song.current) {
      if (pos.current < song.current.length) {
        if (song.current[pos.current].type === LYRICS) {
          setText(song.current[pos.current].data);
          pos.current = pos.current + 1;
        }
      }
      if (pos.current < song.current.length) {
        tab.current = song.current[pos.current].data;
        pos.current = pos.current + 1;
      }
      if (pos.current >= song.current.length) {
        if (playButton.current) playButton.current.classList.toggle("pause");
        setIsPaused(true);
        pos.current = 0;
        setText("");
        tab.current = null;
        return;
      }
    }

    getNextTimerId.current = setTimeout(getNext, speed.current * 1000);
  }

  const getAnimation = () => {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const ptr = points.current;
    if (video && canvas) {
      var list = tabs.get(tab.current);
      Draw(canvas, video, ptr, list, textColor.current, strokeColor.current);
      window.requestAnimationFrame(() => {
        return getAnimation();
      });
    }
  };

  useEffect(() => {
    var Query = new URLSearchParams(props.location.search);
    const getSongUrl = "/api/v1/songs/getFromTitle?title=" + Query.get("title");
    axios.get(getSongUrl).then((res, err) => {
      if (err) alert(err);
      else {
        song.current = Song(res.data.data);
        console.log(song.current);
      }
    });

    const getAccountUrl = "/api/v1/users/findbyemail?email=" + User.email;
    axios.get(getAccountUrl).then((res, err) => {
      if (err) alert(err);
      else {
        points.current = res.data.guitar;
        speed.current = res.data.speed;
        textColor.current = res.data.textColor
        strokeColor.current = res.data.strokeColor
      }
    });

    window.requestAnimationFrame(getAnimation);
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const playPause = (e) => {
    e.target.classList.toggle("pause");
    if (IsPaused) getNext();
    else if (getNextTimerId.current) clearTimeout(getNextTimerId.current);

    setIsPaused(!IsPaused);
  };

  return (
    <>
      {!IsLanscape ? (
        <RotateDevice />
      ) : (
        <div className="playsong__container">
          <canvas ref={canvasRef} className="playsong__canvas" />
          <div className="play__pause__button__container">
            <div
              class="play play__pause__button"
              onClick={playPause}
              ref={playButton}
            />
          </div>
          {Text === "" ? null : <p className="lyrics">{Text}</p>}
          <div className="playsong__promt_area">
            <Promt
              text="Rock On!"
              description="Press fret with same number as below "
              img={Image}
            />
          </div>
          <Webcam
            className="playsong__cam"
            audio={false}
            ref={webcamRef}
            style={{ width: "0%", height: "0%" }}
            videoConstraints={videoConstraints}
          />
        </div>
      )}
    </>
  );
}
