import { IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import Icon from './Icon';
import PropTypes from 'prop-types';
import PlantCardLabel from './PlantCardLabel';
import { baseUrl } from '../commons/fetches';


export default function PlantCard(props) {

    const [image, setImage] = React.useState()

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(baseUrl + `/images/${props.id}`)
            if (response.status === 200){
                console.log(response)
                const responseBody = await response.json()
                const base64Data = responseBody.picByte;
                const image = 'data:image/jpeg;base64,' + base64Data;

                setImage(image)
            }      
        }

        fetchImage()
    }, [])

    return(
        <div className="PlantCard_frame PlantCard_frame_grid">
            <img className="PlantCard_img" src={image} />
            <div className="PlantCard_plantName">{props.plantName}</div>
            <div className="PlantCard_locationContainer">
                <Icon iconName="pin" className="PlantCard_locationContainer_pin" />
                <div className="PlantCard_locationContainer_text">{props.location}</div>
            </div>
            <IconButton className="PlantCard_editButton" aria-label="edit" onClick={props.onEdit}>
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
   humidity: PropTypes.string,
   temperature: PropTypes.string, 
   onEdit: PropTypes.func,
}