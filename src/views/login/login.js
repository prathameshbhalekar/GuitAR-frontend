import React, {useRef, useState, useEffect} from 'react'
import './login.css'
import logo from '../../images/GuitAR.png'
import { Button } from '@material-ui/core';
import {auth, provider} from "../../Utils/firebase"
import {useDispatch} from 'react-redux'
import actions from './../../actions/index'
import axios from '../../Utils/axios'
import glogo from './../../images/g-logo.png'
import VantaNet from 'vanta/dist/vanta.net.min.js'
import * as THREE from 'three'

function Login() {
    const dispatch = useDispatch()

    const [vantaEffect, setVantaEffect] = useState(0)
    const background = useRef(null)
    useEffect(() => {
        if (!vantaEffect) {
        setVantaEffect(VantaNet({
            THREE,
            color: "#1DB954",
            backgroundColor: "#121212",
            el: background.current
        }))
        }
        return () => {
        if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])

    const signIn = () => {
        auth.signInWithPopup(provider).then(result =>{
            const authUser = result.user
            const url =  "/api/v1/users/findbyemail?email=" + authUser.email

            axios.get(url).then((res,err) =>{
                if(err){
                    console.error(err)
                } else {
                    const user = res.data
                
                    if(!user){
                        // If User does not exist in db
                        const postUrl =  "/api/v1/users/create"
                        axios.post(postUrl, {
                            email : authUser.email,
                            displayName : authUser.displayName,
                            photoUrl : authUser.photoURL,
                            wallet : 0
                        }).then((res, err) => {
                            if(!err){
                                dispatch({
                                    type : actions.ADD_USER,
                                    user : res.data 
                                })
                            } else console.log(err)
                        } )
                    } else {
                        // If User exists in db
                        dispatch({
                            type : actions.ADD_USER,
                            user : user 
                        })
                    }
                }
                
            })
        }
        ).catch( (error) => alert(error.message))

    }

    return (
        <div className = "loginpage" ref = {background}>
            <div className = "loginpage__container">
                <img src = {logo} alt = "logo" className = "loginpage__icon"/>

                <hr style = {{
                    width : '80%'
                }}/>
                
                <div className = "login__text">
                    <h2>Sign in to GuitAR</h2>
                </div>
                <Button
                 className = "button" 
                 color = "primary" 
                 variant = "contained"
                 onClick = {signIn}
                 startIcon = {<img src = {glogo} className = "google__icon" alt = "google logo"/>}
                 ><p id = "signintext">Sign In With Google</p></Button>
            </div>
        </div>
    )
}

export default Login
