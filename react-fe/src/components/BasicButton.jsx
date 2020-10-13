import React from 'react'

export default function BasicButton(props){
    return (
        <button className={"button_Basic " + props.className} onClick={props.onClick}>
            {props.value}
        </button>
    )
}