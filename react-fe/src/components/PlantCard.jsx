import { IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import Icon from './Icon';
import PropTypes from 'prop-types';
import PlantCardLabel from './PlantCardLabel';
import { fetchImage } from '../commons/fetches';
import GaugeChart from 'react-gauge-chart'


export default function PlantCard(props) {

    const [image, setImage] = React.useState()

    useEffect(() => {
        const fetchData = async () => {
            setImage(await fetchImage(props.id))    
        }

        fetchData()
    // eslint-disable-next-line
    }, [])

    let chartStyle = {}

    console.log(window.matchMedia('(max-width: 450px)'))

    if (window.matchMedia('(max-width: 450px)').matches){
        chartStyle = {
            gridRowStart: "2",
            gridColumnStart: "8",
            height: "8rem",
            paddingTop: "2rem",
            paddingLeft: "2rem",
            transform: "rotate(-90deg) translate(0.5rem, 2rem)",
            color: "grey"
        }
    } else {
        chartStyle = {
            gridRowStart: "2",
            gridColumnStart: "10",
            height: "8rem",
            transform: "rotate(-90deg) translate(0rem, 2rem)",
            color: "grey"
        }
    }
    console.log(window)

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
            <GaugeChart 
                id={"chartFor"+ props.id} 
                style={chartStyle} 
                textColor="#00000000" 
                cornerRadius={2} 
                colors={["#da1e37","#f9a620","#4F772D"]}
                arcsLength={[2,3,7]}
                percent={props.waterLevel?props.waterLevel/100:0}    
            />


        </div>
    )
}

PlantCard.propTypes = {
   src: PropTypes.string,
   location: PropTypes.string,
   plantName: PropTypes.string,
   humidity: PropTypes.number,
   temperature: PropTypes.number, 
   onEdit: PropTypes.func,
}