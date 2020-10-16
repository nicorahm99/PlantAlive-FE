import React from 'react'
import PropTypes from 'prop-types';


export default function BasicButton(props){
    return (
        <button className={"button_Basic " + props.className} onClick={props.onClick}>
            {props.text}
        </button>
    )
}

BasicButton.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string
}