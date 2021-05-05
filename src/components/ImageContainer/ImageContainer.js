import React from "react";
import "./ImageContainer.css";

function ImageContainer(props) {
  var image = props.img;
  var title = props.title;

  return (
    <div className="info__imagecontainer"
      style = {{
        background : `linear-gradient(to top right,transparent 50%,${(props.color) ? props.color :" #1db954"} 0) top right/30px 30px no-repeat,#303030`
      }}
    >
      <div className="info__imagecontainer__imagehider">
        <img className="info__imagecontainer__image" src={image} alt = "container"/>
      </div>
      <div className="info__line" />
      <div className="info__text__container">
        <h1>{title}</h1>
        <h3 className="info__text">{props.children}</h3>
      </div>
    </div>
  );
}

export default ImageContainer;
