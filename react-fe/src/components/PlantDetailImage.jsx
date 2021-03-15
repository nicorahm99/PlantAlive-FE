import React from 'react'
import Icon from './Icon'
import PropTypes from 'prop-types';


export default function PlantDetailImage(props){
    return(
    <div className='plantDetail_imageContainer'>
        <img src={props.image} className='plantDetail_imageContainer_image' alt='' />

        <input type='file' accept='image/jpeg' id='imageUploader' className='plantDetail_imageContainer_input' onChange={props.onInputChange} />
        
        <label htmlFor='imageUploader' className='plantDetail_imageContainer_label' >
            <Icon iconName='edit' />
        </label>
    </div>
    )
}

PlantDetailImage.propTypes = {
    image: PropTypes.string,
    onInputChange: PropTypes.func,
}