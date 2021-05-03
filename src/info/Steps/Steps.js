import React from 'react'
import './Steps.css'

export default function Steps(props) {
    return (
        <div className = "info__stepsindividual">
            <img className = "info__img" src = {props.img} alt = "steps" />
            <h1 className = "info__stepsindividual__text">{props.text}</h1>
        </div>
    )
}
