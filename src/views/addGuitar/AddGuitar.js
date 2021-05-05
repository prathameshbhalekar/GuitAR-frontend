import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import "./AddGuitar.css";
import Map from "../../Utils/Map";
import Plot from "../../Utils/Plot";
import Promt from "../../components/Promt/Promt";
import tutorial from "./../../images/tutorial.jpg";
import Button from "@material-ui/core/Button";
import NavigateNextSharpIcon from "@material-ui/icons/NavigateNextSharp";
import axios from "../../Utils/axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CheckParallel from "../../Utils/CheckParallel";
import RotateDevice from "../../animations/RotateDevice/RotateDevice";

const AddGuitar = (props) => {
  const user = useSelector((state) => state.isLoggedIn).user;

  const AR = require("js-aruco").AR;

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const p1 = useRef(null);
  const p2 = useRef(null);
  const p3 = useRef(null);
  const p4 = useRef(null);
  const origin = useRef({ x: 0, y: 0 });
  const xaxis = useRef({ x: 0, y: 0 });

  const [codeVisiblity, setCodeVisiblity] = useState(false);
  const [DisableNext, setDisableNext] = useState(true);
  const [IsParallel, setIsParallel] = useState(false);
  const [IsLanscape, setIsLanscape] = useState(window.matchMedia("(orientation: landscape)").matches)

  const history = useHistory();
  const returnToHomePage = useCallback(() => history.push("/Home"), [history]);

  var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

  window.addEventListener(orientationEvent, function() {
      setIsLanscape(window.matchMedia("(orientation: landscape)").matches)
  }, false);

  function drawImage() {
    const video = webcamRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      var ctx = canvas.getContext("2d", { alpha: false });

      // Draw Mirror Image
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);

      const detector = new AR.Detector();
      var markers = detector.detect(ctx.getImageData(0, 0, 1280, 720));

      if (markers.length > 0) {
        if (CheckParallel(markers[0].corners)) {
          setIsParallel(true);
          ctx.fillStyle = "red";
          var corners = markers[0].corners;
          var result
          if (p1.current !== null) {
            result = Map(
              corners[1].x,
              corners[1].y,
              corners[0].x,
              corners[0].y,
              p1.current.m_ratio,
              p1.current.n_ratio
            );
            ctx.fillRect(result.x, result.y, 10, 10);
          }

          if (p2.current !== null) {
            result = Map(
              corners[1].x,
              corners[1].y,
              corners[0].x,
              corners[0].y,
              p2.current.m_ratio,
              p2.current.n_ratio
            );
            ctx.fillRect(result.x, result.y, 10, 10);
          }

          if (p3.current !== null) {
            result = Map(
              corners[1].x,
              corners[1].y,
              corners[0].x,
              corners[0].y,
              p3.current.m_ratio,
              p3.current.n_ratio
            );
            ctx.fillRect(result.x, result.y, 10, 10);
          }

          if (p4.current !== null) {
            result = Map(
              corners[1].x,
              corners[1].y,
              corners[0].x,
              corners[0].y,
              p4.current.m_ratio,
              p4.current.n_ratio
            );
            ctx.fillRect(result.x, result.y, 10, 10);
          }

          ctx.stroke();
          setCodeVisiblity(true);

          origin.current = { x: corners[1].x, y: corners[1].y };
          xaxis.current = { x: corners[0].x, y: corners[0].y };

          ctx.stroke();
        } else setIsParallel(false);
      } else setCodeVisiblity(false);

      window.requestAnimationFrame(() => {
        return drawImage();
      });
    }
  }

  const addPoint = (e) => {
    if (codeVisiblity && IsParallel) {
      // Get Click Position
      var x;
      var y;
      if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        y =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }

      x -= canvasRef.current.offsetLeft;
      y -= canvasRef.current.offsetTop;

      let point = Plot(
        origin.current.x,
        origin.current.y,
        xaxis.current.x,
        xaxis.current.y,
        x,
        y
      );

      if (p1.current === null) p1.current = point;
      else if (p2.current === null) p2.current = point;
      else if (p3.current === null) p3.current = point;
      else if (p4.current === null) {
        p4.current = point;
        setDisableNext(false);
      }
    }
  };

  useEffect(() => {
    requestAnimationFrame(drawImage);
  }, []);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  const updateGuitar = () => {
    const url =
      "/api/v1/users/updateGuitar?email=" +
      user.email +
      "&m_ratio1=" +
      p1.current.m_ratio +
      "&n_ratio1=" +
      p1.current.n_ratio +
      "&m_ratio2=" +
      p2.current.m_ratio +
      "&n_ratio2=" +
      p2.current.n_ratio +
      "&m_ratio3=" +
      p3.current.m_ratio +
      "&n_ratio3=" +
      p3.current.n_ratio +
      "&m_ratio4=" +
      p4.current.m_ratio +
      "&n_ratio4=" +
      p4.current.n_ratio;

    axios.put(url).then((res, err) => {
      returnToHomePage();
    });
  };

  return (
    <>
      {(!IsLanscape) ? (<RotateDevice />) : (
      <div className="addguitar__container">
        <div className="promt_area">
          {!codeVisiblity ? (
            <Promt
              variant="error"
              text="Can't find guitar!"
              description="Please make sure guitar with valid marker is present in frame."
            />
          ) : null}
          {codeVisiblity && !IsParallel ? (
            <Promt
              variant="error"
              text="Guitar not parallel"
              description="Make sure guitar is parallel to the camera."
            />
          ) : null}
          <Promt img={tutorial} text="Select corners of fretboard" />
        </div>
        <div className="next__button">
          <Button
            onClick={updateGuitar}
            variant="contained"
            endIcon={<NavigateNextSharpIcon />}
            disabled={DisableNext}
          >
            <h3 className="addguitar__button-text">NEXT</h3>
          </Button>
        </div>

        <canvas
          width="1280"
          height="720"
          ref={canvasRef}
          className="canvas"
          onClick={addPoint}
        />
        <Webcam
          className="cam"
          audio={false}
          ref={webcamRef}
          style={{ width: "0%", height: "0%" }}
          videoConstraints={videoConstraints}
        />
      </div>
      )}
    </>
  );
};

export default AddGuitar;
