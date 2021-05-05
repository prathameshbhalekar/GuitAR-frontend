import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "../../Utils/axios";
import "./LearnTab.css";
import { useSelector } from "react-redux";
import tabs from "./../../Utils/Tabs";
import Promt from "./../../components/Promt/Promt";
import Image from "./../../images/finger_coding.jpg";
import Draw from "../../hooks/Draw";
import RotateDevice from "./../../animations/RotateDevice/RotateDevice";

export default function LearnTab(props) {
  const User = useSelector((state) => state.isLoggedIn).user;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const points = useRef(null);
  const strokeColor = useRef("Red");
  const textColor = useRef("Red");
  const tab = useRef("");

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

  const getAnimation = () => {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const ptr = points.current;
    if (video && canvas) {
      var list = tabs.get(tab.current.value);
      console.log(tab);
      console.log(list);
      Draw(canvas, video, ptr, list, textColor.current, strokeColor.current);
      window.requestAnimationFrame(() => {
        return getAnimation();
      });
    }
  };

  useEffect(() => {
    const getAccountUrl = "/api/v1/users/findbyemail?email=" + User.email;
    axios.get(getAccountUrl).then((res, err) => {
      if (err) alert(err);
      else {
        points.current = res.data.guitar;
        textColor.current = res.data.textColor;
        strokeColor.current = res.data.strokeColor;
      }
    });

    window.requestAnimationFrame(getAnimation);
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };


  return (
    <>
      {!IsLanscape ? (
        <RotateDevice />
      ) : (
        <div className="playsong__container">
          <div className = "learn__inputcontainer">
            <input  ref = {tab} className = "learn__input"/>
          </div>
          <canvas ref={canvasRef} className="playsong__canvas" />
          <div className="playsong__promt_area">
            <Promt
              text="Rock On!"
              description="Press fret with same number as below "
              img={Image}
            />
            <Promt
              text="Learn Theory"
              description="Enter the tab you want to learn."
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
