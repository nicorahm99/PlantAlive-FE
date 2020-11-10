import React from 'react'
import PropTypes from 'prop-types'
import BasicInput from './BasicInput'

export default function PlantDetailInputs(props){
    return (
        <div className='plantDetail_inputContainer'>

            <BasicInput
                className=""
				iconName="name"
				isVisible={true}
				placeholder="Pflanzenname"
				onChange={props.onNameChange}
				value={props.name}
				hasError={props.isNameError}
				helperText={props.nameHelperText}
			/>

            <BasicInput 
                className=""
				iconName="pin"
				isVisible={true}
				placeholder="Standort"
				onChange={props.onLocationChange}
				value={props.location}
				hasError={props.isLocationError}
				helperText={props.locationHelperText}
			/>
    </div>
    )
}

PlantDetailInputs.propTypes = {
    isNameError: PropTypes.bool,
    name: PropTypes.string,
	onNameChange: PropTypes.func,
	nameHelperText: PropTypes.string,
    isLocationError: PropTypes.bool,
    location: PropTypes.string,
	onLocationChange: PropTypes.func,
	locationHelperText: PropTypes.string,
}
