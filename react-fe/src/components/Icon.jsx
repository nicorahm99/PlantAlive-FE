import React from 'react';
import logo from '../assets/Plantalive_logo.svg'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import AddBox from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings'

export default function Icon(props) {

    switch (props.iconName) {
        case "LOGO": 
            return (<div className={props.className}>
            	        <img src={logo} alt="Logo" />
                    </div>);
        case "account":
            return (<AccountCircle />);
        case "password":
            return (<Lock />);
        case "visibility":
            return (<Visibility />);
        case "visibilityOff":
            return (<VisibilityOff />);
        case "menu":
            return (<MenuIcon />);
        case "home":
            return (<HomeIcon />)
        case "add":
            return (<AddBox />)
        case "settings":
            return (<SettingsIcon />)
        default:
            return (<h3>IMG NOT FOUND</h3>)
    }
}
