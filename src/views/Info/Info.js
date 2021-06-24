import React, { useEffect } from "react";
import "./Info.css";
import logo from "./../../images/GuitAR-logos_white.png";
import gsap, { TweenLite } from "gsap";
import ImageContainer from "../../components/ImageContainer/ImageContainer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import speed from "./../../images/speed.jpg";
import game from "./../../images/game.jpg";
import time from "./../../images/time.jpg";
import crowd from "./../../images/crowd.jpg";
import Steps from "../../components/Steps/Steps";
import login from "./../../images/login.svg";
import setting from "./../../images/setting.svg";
import music from "./../../images/music.svg";
import rocket from "./../../images/rocket.svg";
import LearningExperience from "./../../images/Learning Experience.png";
import bottomLogo from "./../../images/vertical_logo.png";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import GetAppIcon from "@material-ui/icons/GetApp";
import ReactPlayer from "react-player";

function Info() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {

    TweenLite.from(".info__imagecontainer", 1, {
      opacity: 0,
      visiblity: "hidden",
      scrollTrigger: {
        trigger: ".info__imagecontainer",
        scrub: true,
        end: "center",
      },
    });

    TweenLite.fromTo(
      "#text1",
      {
        x: 5000,
        opacity: 0,
      },
      {
        x: -2000,
        opacity: 1,
        scrollTrigger: {
          trigger: "#text1",
          scrub: true,
          end: "top",
        },
      }
    );

    TweenLite.fromTo(
      "#text2",
      {
        x: 2000,
        opacity: 0,
      },
      {
        x: -2500,
        opacity: 1,
        scrollTrigger: {
          trigger: "#text2",
          scrub: true,
          end: "top",
        },
      }
    );

    TweenLite.from(".info__stepsindividual", 1, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: ".info__stepsindividual",
        scrub: true,
        end: "top",
      },
    });
  }, []);

  return (
    <div className="info">
      <a href="Home">
        <div className="getstarted__button">
          <PlayArrowIcon fontSize="large" />
          <h3>GET STARTED</h3>
        </div>
      </a>

      <a href="https://guitar-backend.herokuapp.com/api/v1/downloads/Marker">
        <div className="download__button">
          <GetAppIcon fontSize="large" />
        </div>
      </a>

      <div className="info__topv">
        <div className="info__logo__container">
          <img src={logo} className="info__logo" alt="logo" />
          <h1 className="info__toptext">Learning Guitar Simplified!</h1>
        </div>
      </div>

      <div className="info__scrollcontainer">
        <h1 className="info__scrolltext" id="text1">
          Guit.AR is guitar minus redundancy
        </h1>
      </div>

      <div className="intoduction__page">
        <h2>What is GuitAR?</h2>
        <p>
          {`  GuitAR is an AR based webapp which helps beginners to learn guitar.
          It highlights the strings to be plucked on the guitar in your camera
          feed so all you have to do is strike the highlighted strings to play
          your favourite music!`}
        </p>
        <p>
          {`GuitAR allows you to practice guitar by playing actual songs so that you 
          can skip the boring parts of learning guitar. GuitAR aims to make the process
          of learning basics of guitar not only faster but also more interesting.
          `}
        </p>
        <img src = {LearningExperience}/>
        <h2>Why GuitAR?</h2>
      </div>
      
      <div className="info__imagelist">
        <ImageContainer color="#F7DF1E" title="Faster Learning" img={speed}>
          <meta
            name="description"
            content="GuitAR improves learning speed by around 40%. Traditionally user 
            has to look at cords and the count the strings and frets but we 
            directly project them on the guitar making it much easier and faster. It helps building
            muscle memory by giving live visual feedback to the user. Visual
            feedback (VFb) is proven to boost the acquisition and retention stages
            of motor learning associated with training in a reaching task."
          />
          GuitAR improves learning speed by around 40%. Traditionally user has
          to look at cords and the count the strings and frets but we directly
          project them on the guitar making it much easier and faster. It helps
          building muscle memory by giving live visual feedback to the user.
          Visual feedback (VFb) is proven to boost the acquisition and retention
          stages of motor learning associated with training in a reaching task.
        </ImageContainer>
        <ImageContainer color="#DD0031" title="Guitar Gamified" img={game}>
          <meta
            name="description"
            content="Turn your guitar into a musical game using GuitAR. It turns your
            guitar into a arcade game where the objective is to strike the
            highlighted string within particular time. Learn faster and smarter
            with GuitAR.GuitAR gamifies guitar into a arcade games where user has to 
            pluck highlighted cords within a particular time which could provide a 
            great activity for children without trapping them in a digital world."
          />
          Turn your guitar into a musical game using GuitAR. It turns your
          guitar into a arcade game where the objective is to strike the
          highlighted string within particular time. Learn faster and smarter
          with GuitAR.GuitAR gamifies guitar into a arcade games where user has
          to pluck highlighted cords within a particular time which could
          provide a great activity for children without trapping them in a
          digital world.
        </ImageContainer>
        <ImageContainer color="#61DAFB" title="Skip The Boring" img={time}>
          <meta
            name="description"
            content="Learning Guitar comes with learning lot of redundant stuff before you
            play any song. Normally a new guitarist has to learn multiple tabs 
            before they can perform actual songs which can get frustrating.
             With guitAR, user can directly start playing songs from their 
             first day. GuitAR helps you to cut the clutter and get you
            started with playing interesting music right from the first day."
          />
          Learning Guitar comes with learning lot of redundant stuff before you
          play any song. Normally a new guitarist has to learn multiple tabs
          before they can perform actual songs which can get frustrating. With
          guitAR, user can directly start playing songs from their first day.
          GuitAR helps you to cut the clutter and get you started with playing
          interesting music right from the first day.
        </ImageContainer>
        <ImageContainer color="#663399" title="Attract Eyeballs" img={crowd}>
          <meta
            name="description"
            content="GuitAR can be used by various institutes and universities that teach music to 
            teach their students string instruments while sitting at home especially during
             lock down. It can also be used as great complement for traditional methods. 
              Our Innovative solutions improve learning speed and quality making
              GuitAR great complement for your music institution. GuitAR adds
              charm to you organization attracting more students."
          />
          GuitAR can be used by various institutes and universities that teach
          music to teach their students string instruments while sitting at home
          especially during lock down. It can also be used as great complement
          for traditional methods. Our Innovative solutions improve learning
          speed and quality making GuitAR great complement for your music
          institution. GuitAR adds charm to you organization attracting more
          students.
        </ImageContainer>
      </div>

      <div className="info__stepsconatiner">
        <div className="info__scrollcontainer">
          <h1 className="info__scrolltext" id="text2">
            LEARN GUITAR THE SMART WAY
          </h1>
        </div>
        <div className="info__steps">
          <Steps img={login} text="Login With Google" />
          <Steps img={setting} text="Set-up Your Guitar" />
          <Steps img={music} text="Find Your Favourite Music" />
          <Steps img={rocket} text="Take Off..." />
        </div>

        <div className="videoplayer_container">
          <ReactPlayer
            className="info__videoplayer"
            url="https://vimeo.com/544604493"
          />
        </div>
      </div>

      <div className="info__bottom">
        <img src={bottomLogo} alt="logo" />
        <h3>Content & Graphics © 2021 GuitAR LLC</h3>
      </div>
    </div>
  );
}

export default Info;
