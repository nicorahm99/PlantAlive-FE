import React from 'react';
import logo from '../images/Plantalive_logo.svg'
import pin from '../images/pin.svg'
import humidity from '../images/humidity.svg'
import thermometer from '../images/thermometer.svg'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import AddBox from '@material-ui/icons/AddBox'
import SettingsIcon from '@material-ui/icons/Settings'
import EditIcon from '@material-ui/icons/Edit'
import TagIcon from '@material-ui/icons/LocalOffer'
import ExitToApp from '@material-ui/icons/ExitToApp'

export default function Icon(props) {

    switch (props.iconName) {
        case "LOGO": 
            return (<div className={props.className}>
            	        <img src={logo} alt="Logo" />
                    </div>);
        case "pin": 
            return (<img src={pin} alt="Pin" className={props.className}/>);
        case "humidity": 
            return (<img src={humidity} alt="Humidity" className={props.className}/>);
        case "temperature": 
            return (<img src={thermometer} alt="Temperature" className={props.className}/>);
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
        case "edit":
            return (<EditIcon />)
        case "name":
            return (<TagIcon />)
        case "exitToApp":
            return (<ExitToApp />)
        default:
            return (<h3>IMG NOT FOUND</h3>)
    }
}
