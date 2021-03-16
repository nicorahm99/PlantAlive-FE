import React from 'react'
import PropTypes from 'prop-types';
import Icon from './Icon';

export default function PlantCardLabel(props){
    return(
        <div className={"PlantCard_plantCardLabel " + props.className}>
            <Icon iconName={props.iconName} className="PlantCard_plantCardLabel_icon" />
            <div className="PlantCard_plantCardLabel_value">{props.value?props.value:"-- "}{getDecoration(props.className)}</div>
        </div>
    )
}

const getDecoration = (className) => {
    if (String(className).includes('Humidity')){
        return ' %'
    } else if (String(className).includes('Temperature')){
        return ' °C'
    }
}

PlantCardLabel.propTypes ={
    value: PropTypes.number,
    iconName: PropTypes.string,
    className: PropTypes.string,
}