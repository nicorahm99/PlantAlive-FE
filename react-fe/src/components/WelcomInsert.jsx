import React from 'react'
import PropTypes from 'prop-types';
import Icon from './Icon';

export default function WelcomeInsert(props){
    return (
        <div className="PlantCard_welcomeInsert">
            <h1>Willkommen bei PlantAlive</h1>
            Zum hinzufügen eines neuen PlantAlive Topfs clicke einfach auf das 
            <Icon iconName='add' fontSize="large" /> 
            Symbol am unteren Bildschirmrand oder im Menü.
            <br/>
            Viel Spaß mit PlantAlive!

        </div>
    )
}

WelcomeInsert.propTypes = {
    name: PropTypes.string
}
