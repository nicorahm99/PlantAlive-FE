import React from 'react'
import PropTypes from 'prop-types';
import { Alert } from '@material-ui/lab';

export default function AlertHint(props){
    return (
        <div className="Universal_Bottom_centered_Hint_Container">
            <Alert 
                onClose={() => props.close()}
                variant="filled"
        		severity={props.level}>
                    {props.message}
            </Alert>
        </div>
    )
}

AlertHint.propTypes = {
    level: PropTypes.string,
    message: PropTypes.string,
    close: PropTypes.func
}
