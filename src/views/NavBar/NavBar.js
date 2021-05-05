import React, { useCallback } from "react";
import "./NavBar.css";
import SettingsIcon from "@material-ui/icons/Settings";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import image from "./../../images/GuitAR.png";
import { useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function NavBar() {
  const history = useHistory();
  const openAddGuitar = useCallback(() => history.push("/AddGuitar"), [
    history,
  ]);
  const openSettings = useCallback(() => history.push("/Settings"), [history]);
  const openLearnTab = useCallback(() => history.push("/LearnTabs"), [history]);
  const user = useSelector((state) => state.isLoggedIn).user;

  return (
    <div className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav__top">
            <img src={image} className="nav__topicon" alt = "logo"/>
            <span className="link-text">GuitAR 🚀</span>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link" onClick={openAddGuitar}>
            <AddCircleIcon className="link-icon" />
            <span className="link-text">Add Guitar</span>
          </div>
        </li>

        <li className="nav-item">
          <div onClick={openLearnTab} className="nav-link">
            <ImportContactsIcon className="link-icon" />
            <span className="link-text">Learn Tabs</span>
          </div>
        </li>

        <li className="nav-item">
          <div className="nav-link" onClick={openSettings}>
            <SettingsIcon className="link-icon" />
            <span className="link-text">Settings</span>
          </div>
        </li>

        <li className="nav-item">
          <div className="navbar__profile__container nav-link">
            <Avatar
              className="navbar__profile__icon link-icon"
              src={user?.photoUrl}
            />
            <span className="topbar__profile__name link-text">
              {user?.displayName}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
