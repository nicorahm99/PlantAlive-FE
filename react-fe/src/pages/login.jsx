import React from 'react';
import AlertHint from '../components/AlertHint.jsx';
import Background from '../components/Background.jsx';
import BasicButton from '../components/BasicButton.jsx';
import BasicInput from '../components/BasicInput.jsx';
import Icon from '../components/Icon.jsx';

export default function Login() {
	let [ userMail, setUserName ] = React.useState('');
	let [ password, setPassword ] = React.useState('');
	let [ repeatPassword, setRepeatPassword ] = React.useState('');
	let [ isRepeatPasswordDisplayed, setIsRepeatPasswordDisplayed ] = React.useState(false);
	let [ isPasswordMismatchHintDisplayed, setIsPasswordMismatchHintDisplayed] = React.useState(false)

	function onUserNameChange( event ) {
		setUserName( event.target.value )
	}

	function onPasswordChange( event ) {
		setPassword( event.target.value )
	}

	function onRepeatPasswordChange( event ) {
		setRepeatPassword( event.target.value )
	}

	function onFormSubmit(event) {
		event.preventDefault()
		// @TODO check for account
	}

	function onSignUpButtonClicked() {
		if(isRepeatPasswordDisplayed){
			if(password == repeatPassword){
				//@TODO Account creation
				//redirect to homescreen 
			} else {
				setRepeatPassword('')
				showPasswordMismatchHint()
			}
		} else {
			setIsRepeatPasswordDisplayed(true)
		}
	}

	function showPasswordMismatchHint() {
		setIsPasswordMismatchHintDisplayed(true)
	}

	function hidePasswordMismatchHint() {
		setIsPasswordMismatchHintDisplayed(false)
	}

return (
<div className="pageLogin pageLogin_flexContainer">
	<Icon iconName="LOGO"
		className="pageLogin_Logo" />
	<div className="pageLogin_divider" />
	<form onSubmit={onFormSubmit}
		className="pageLogin_Form">
		<BasicInput className="userNameForm"
			iconName="mail"
			isVisible={true}
			placeholder="E-Mail"
			onChange={onUserNameChange}
			value={userMail} />
		<BasicInput className="passwordForm"
			iconName="key"
			isVisible={false}
			placeholder="Passwort"
			onChange={onPasswordChange}
			value={password} />
		{isRepeatPasswordDisplayed ? 
			<BasicInput className="passwordForm"
				iconName="key"
				isVisible={false}
				placeholder="Passwort wiederholen"
				onChange={onRepeatPasswordChange}
				value={repeatPassword} />
		:null}
		<BasicButton text="Log IN"
			className="button_LogIn"
			onClick={onFormSubmit} />
		<BasicButton text="Sign UP"
			className="button_SignUp"
			onClick={onSignUpButtonClicked} />
	</form>
	{
		isPasswordMismatchHintDisplayed ? <AlertHint close={hidePasswordMismatchHint} level="warning" message="Passwörter stimmen nicht überien!"/> : null

	}
	<Background />
</div>
)
}