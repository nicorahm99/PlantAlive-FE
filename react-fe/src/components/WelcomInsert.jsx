import React from 'react'
import PropTypes from 'prop-types';

export default function WelcomeInsert(props){
    return (
        <div className="PlantCard_frame">
            <h1>Welcome</h1>
        </div>
    )
}

WelcomeInsert.propTypes = {
    name: PropTypes.string
}
