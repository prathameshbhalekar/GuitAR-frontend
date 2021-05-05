import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "../../Utils/axios";
import axiosLib from "axios";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import "./Settings.css";

export default function Settings() {
  const user = useSelector((state) => state.isLoggedIn).user;

  const [TextColor, setTextColor] = useState("");
  const [strokeColor, setStrokeColor] = useState("");
  const [TextCheck, setTextCheck] = useState(true);
  const [strokeCheck, setstrokeCheck] = useState(true);
  const [SliderValue, setSliderValue] = useState(user.speed);

  const TextInput = useRef(null);
  const StrokeInput = useRef(null);

  useEffect(() => {
    const url = "/api/v1/users/findbyemail?email=" + user.email;
    axios.get(url).then((res, err) => {
      if (err) {
        alert(err);
        console.error(err);
      } else {
        setStrokeColor(`#${res.data.strokeColor}`);
        setTextColor(`#${res.data.textColor}`);
        setSliderValue(res.data.speed);
        TextInput.current.value = `#${res.data.textColor}`;
        StrokeInput.current.value = `#${res.data.strokeColor}`;
      }
    });
  }, []);

  const validateColor = (str) => {
    return str.match(/^#[a-f0-9]{6}$/i) !== null;
  };

  const handleStrokeColorChange = (event) => {
    var color = event.target.value;
    if (validateColor(color)) {
      setstrokeCheck(true);
      color = color.slice(1);
      const url =
        "/api/v1/users/updateStrokeColor?email=" +
        user.email +
        "&color=" +
        color;
      axios.put(url).then((res, err) => {
        if (err) {
          alert(err);
          console.error(err);
        } else setStrokeColor(event.target.value);
      });
    } else {
      setstrokeCheck(false);
    }
  };

  const handleTextColorChange = (event) => {
    var color = event.target.value;
    if (validateColor(color)) {
      color = color.slice(1);
      setTextCheck(true);
      const url =
        "/api/v1/users/updateTextColor?email=" + user.email + "&color=" + color;
      axios.put(url).then((res, err) => {
        if (err) {
          alert(err);
          console.error(err);
        } else {
          setTextColor(event.target.value);
        }
      });
    } else {
      setTextCheck(false);
    }
  };

  useEffect(() => {
    console.log(SliderValue);
    let cancel;
    var url =
      "/api/v1/users/updateSpeed?email=" + user.email + "&speed=" + SliderValue;
    axios({
      method: "PUT",
      url: url,
      cancelToken: new axiosLib.CancelToken((c) => (cancel = c)),
    }).catch((e) => {
      if (axiosLib.isCancel(e)) return;
      alert(e);
    });
    return () => cancel();
  }, [SliderValue]);

  return (
    <div className="settings__box">
      <div className="settings__container">
        <h1
          style={{ marginBottom: "15px", color: "white", marginLeft: "20px" }}
        >
          SETTINGS
        </h1>

        <label for="textcolor" className="settings__label">
          Text Color
        </label>
        <div
          className="setting__tile"
          id="textcolor"
          style={{
            backgroundColor: !TextCheck
              ? "rgba(255, 0, 0, 0.6)"
              : "rgba(255, 255, 255, 0.07)",
          }}
        >
          <div className="color__box" style={{ backgroundColor: TextColor }} />
          <input onChange={handleTextColorChange} ref={TextInput} />
          <div className="color__checkbox">
            {!TextCheck ? <ClearIcon /> : <CheckIcon />}
          </div>
        </div>

        <label for="strokecolor" className="settings__label">
          Stroke Color
        </label>
        <div
          className="setting__tile"
          id="strokecolor"
          style={{
            backgroundColor: !strokeCheck
              ? "rgba(255, 0, 0, 0.6)"
              : "rgba(255, 255, 255, 0.07)",
          }}
        >
          <div
            className="color__box"
            style={{ backgroundColor: strokeColor }}
          />
          <input onChange={handleStrokeColorChange} ref={StrokeInput} />
          <div className="color__checkbox">
            {!strokeCheck ? <ClearIcon /> : <CheckIcon />}
          </div>
        </div>
        <label for="slider" className="settings__label">
          Song Speed
        </label>
        <div
          className="setting__tile"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.07)" }}
        >
          <input
            id="slider"
            type="range"
            min="1"
            max="10"
            onChange={(e) => {
              setSliderValue(e.target.value);
            }}
            value={SliderValue}
          />
          <h3 className="color__checkbox">{SliderValue}</h3>
        </div>
      </div>
    </div>
  );
}
