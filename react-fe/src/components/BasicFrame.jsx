import React from 'react'
import PropTypes from 'prop-types'

export default function BasicFrame(props){
    return(
        <div className={'basicFrame ' + props.className}>
            {props.children}
        </div>
    )
}

BasicFrame.propTypes = {
    className: PropTypes.string,
}