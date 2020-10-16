import React from 'react';
import Background from '../components/Background.jsx';
import BasicButton from '../components/BasicButton.jsx';
import BasicInput from '../components/BasicInput.jsx';
import Icon from '../components/Icon.jsx';

export default function Login() {
	let [ userName, setUserName ] = React.useState( [] );
	let [ password, setPassword ] = React.useState( [] );

	function onUserNameChange( event ) {
		setUserName( event.target.value )
	}

	function onPasswordChange( event ) {
		setPassword( event.target.value )
	}

return (
<div className="pageLogin">
	<Icon iconName="LOGO"
		className="pageLogin_Logo" />
	<form onSubmit={null}
		className="pageLogin_Form">
		<div className="pageLogin_flexContainer">
			<BasicInput className="userNameForm"
				iconName="mail"
				isVisible="true"
				placeholder="Benutzername"
				onChange={onUserNameChange}
				value={userName} />
			<BasicInput className="passwordForm"
				iconName="key"
				isVisible="false"
				placeholder="Passwort"
				onChange={onPasswordChange}
				value={password} />
		</div>
		<div className="pageLogin_flexContainer">
			<BasicButton text="Log IN"
				className="button_LogIn"
				onClick={null} />
			<BasicButton text="Sign UP"
				className="button_SignUp"
				onClick={null} />
		</div>
	</form>
    <Background />
</div>
)
}