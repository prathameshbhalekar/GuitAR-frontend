import React, {useRef} from 'react'
import './Promt.css'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CloseIcon from '@material-ui/icons/Close';

export default function Promt(props) {
    const ref = useRef(null)

    let icon, img
    if(props.variant === 'error')
        icon = <ErrorOutlineOutlinedIcon className = 'icon' style = {{color : 'red'}}/>
    else
        icon = <InfoOutlinedIcon className = 'icon' style = {{color : 'white'}}/>
    
    if(props.img)
        img  = <img id = "promt__img" src = {props.img} alt = "prop"/>
    else
        img = null

    const close = () => {
        ref.current.style.display = 'none'
    }

    return (
        <div className = 'promt__mainContainer' ref = {ref}>
            <div className = 'promt__container'>
                {icon}
                <div className = 'text_container'>
                    <div className = "promt__top">
                        <h3 className = 'text'>{props.text}</h3>
                        <CloseIcon className = "closeIcon" onClick = {close}/>
                    </div>
                    <p className = 'description'>{props.description}</p>
                </div>  
            </div>
            {img}
            
        </div>
    )
}
