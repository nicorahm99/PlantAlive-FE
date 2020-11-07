import { IconButton } from '@material-ui/core';
import React from 'react';
import Icon from './Icon';
import PropTypes from 'prop-types';
import PlantCardLabel from './PlantCardLabel';
import samplePlant from '../assets/samplePlant.svg'


export default function PlantCard(props) {

    return(
        <div className="PlantCard_frame">
            <img className="PlantCard_img" src={samplePlant} />
            <div className="PlantCard_plantName">{props.plantName}</div>
            <div className="PlantCard_locationContainer">
                <Icon iconName="pin" className="PlantCard_locationContainer_pin" />
                <div className="PlantCard_locationContainer_text">{props.location}</div>
            </div>
            <IconButton className="PlantCard_editButton" aria-label="edit" /*color="inherit"*/ >
                <Icon iconName="edit"/>
            </IconButton>
            <PlantCardLabel className="PlantCard_plantCardLabelHumidity" iconName="humidity" value={props.humidity} />
            <PlantCardLabel className="PlantCard_plantCardLabelTemperature" iconName="temperature" value={props.temperature} />

        </div>
    )
}

PlantCard.propTypes = {
   src: PropTypes.string,
   location: PropTypes.string,
   plantName: PropTypes.string,
   humidity: PropTypes.number,
   temperature: PropTypes.number, 
}