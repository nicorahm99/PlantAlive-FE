import React from 'react';
import BasicButton from '../components/BasicButton.jsx';
import BasicInput from '../components/BasicInput.jsx';

export default function Login() {
    let [userName, setUserName] = React.useState([]);
    let [password, setPassword] = React.useState([]);

    function onUserNameChange(event){
        setUserName(event.target.value)
    }

    function onPasswordChange(event){
        setPassword(event.target.value)
    }

    return (
        <div className="pageLogin">
            {/* <PlantAliveLogo/> */}
            <form onSubmit={null} >
                <BasicInput
                    className="userNameForm" 
                    iconName="mail" 
                    isVisible="true" 
                    placeholder="Benutzername" 
                    onChange={onUserNameChange} 
                    value={userName} 
                />
                <BasicInput 
                    className="passwordForm"
                    iconName="key" 
                    isVisible="false" 
                    placeholder="Passwort" 
                    onChange={onPasswordChange} 
                    value={password} 
                />
                <BasicButton 
                    value="Log IN"
                    className="button_LogIn"
                    onClick={null}
                />
            </form>
            <BasicButton 
                value="Sign UP"
                className="button_SignUp"
                onClick={null}
            />

        </div>
    )
}