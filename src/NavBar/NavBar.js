import React, {useCallback} from 'react'
import './NavBar.css'
import SettingsIcon from '@material-ui/icons/Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import image from './../images/GuitAR.png'
import {useSelector} from 'react-redux'
import { Avatar } from '@material-ui/core';
import {useHistory} from 'react-router-dom';

export default function NavBar() {
    const history = useHistory();
    const openAddGuitar = useCallback(() => history.push('/AddGuitar'), [history]);
    const openSettings = useCallback(() => history.push('/Settings'), [history]);
    const user = useSelector(state => state.isLoggedIn ).user

    return (
        <div className = 'navbar'>
            
            <ul className = 'navbar-nav'>
            <li className = "nav-item"  >
            <a href = '#' className = 'nav__top'>
                <img src = {image} className = 'nav__topicon'/>
                <span className = 'link-text'>GuitAR 🚀</span>
            </a>
            </li>
            <li className = "nav-item">
                <a  className = "nav-link" onClick = {openAddGuitar}>
                    <AddCircleIcon className = "link-icon"/>
                    <span className = 'link-text'>Add Guitar</span>
                </a>        
            </li>   
            
            <li className = "nav-item">
                <a href = '#' className = "nav-link">
                    <BookmarksIcon className = "link-icon"/>
                    <span className = 'link-text'>My Library</span>
                </a>    
            </li>

            <li className = "nav-item">
                <a className = "nav-link" onClick = {openSettings}>
                    <SettingsIcon className = "link-icon"/>
                    <span className = 'link-text'>Settings</span>
                </a>    
            </li>   

            <li className = "nav-item">
                <div className = "navbar__profile__container nav-link">
                    <Avatar className = "navbar__profile__icon link-icon" src = {user?.photoUrl}/>
                    <span className = "topbar__profile__name link-text">{user?.displayName}</span>
                </div>                     
            </li>   
            
                
            </ul>
        </div>
    )
}
