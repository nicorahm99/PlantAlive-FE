import React from 'react'
import BasicFrame from './BasicFrame'
import Icon from './Icon'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { IconButton } from '@material-ui/core'
import PropTypes from 'prop-types'


export default function HumidityChanger(props) {
    const onIncreaseHumidity = () => {
        if(props.value <= 95){
            props.setValue(props.value + 5)
        } else {
            props.setValue(100)
        }
    }

    const onDecreaseHumidity = () => {
        if (props.value >= 5){
            props.setValue(props.value - 5)
        } else {
            props.setValue(0)
        }
        
    }

    const onTypeInHumidity = (event) => {
        const value = event.target.value
        if (isNaN(value) || value > 100 || value < 0 ){
            return
        } else {
            props.setValue(value)
        }
    } 

    return (
        <BasicFrame className='plantDetail_humidityChanger'>
            <span className='plantDetail_humidityChanger_label_text'>
                Soll-
            </span> 
            <Icon 
                iconName='humidity'
                className='plantDetail_humidityChanger_label_icon'
            />
            <div className='plantDetail_humidityChanger_input'>
            <IconButton
                className='plantDetail_humidityChanger_input_iconButton'
                onClick={onIncreaseHumidity}
            >
                <AddIcon/>
            </IconButton>
            <span className="plantDetail_humidityChanger_input_unitWrapper">  
            <input 
                className="plantDetail_humidityChanger_input_numberInput"
                type='text'
                onChange={onTypeInHumidity}
                value={props.value}
                maxLength="3"
            />
            {/* Unit of Humidity:*/'%'}
            </span>
            <IconButton
                className='plantDetail_humidityChanger_input_iconButton'
                onClick={onDecreaseHumidity}    
            >
                <RemoveIcon />
            </IconButton>
            </div>
        </BasicFrame>
    )
}

HumidityChanger.propTypes = {
    value: PropTypes.number,
    setValue: PropTypes.func,
}