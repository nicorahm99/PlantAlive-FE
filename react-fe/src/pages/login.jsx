import React from 'react';
import Background from '../components/Background.jsx';
import BasicButton from '../components/BasicButton.jsx';
import BasicInput from '../components/BasicInput.jsx';
import Icon from '../components/Icon.jsx';

export default function Login() {
	
	const [ userMail, setUserMail ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ repeatPassword, setRepeatPassword ] = React.useState('');

	const [ mailHelperText, setMailHelperText] = React.useState('');
	const [ passwordHelperText, setPasswordHelperText] = React.useState('');
	const [ repeatPasswordHelperText, setRepeatPasswordHelperText] = React.useState('');
	
	const [ isPasswordError, setIsPasswordError] = React.useState(false);
	const [ isRepeatPasswordError, setIsRepeatPasswordError] = React.useState(false);
	const [ isMailError, setIsMailError] = React.useState(false);
	
	const [ isRepeatPasswordDisplayed, setIsRepeatPasswordDisplayed ] = React.useState(false);



	function onUserMailChange( event ) {
		setUserMail( event.target.value )
		setIsMailError(false)
		setMailHelperText('')
	}

	function onPasswordChange( event ) {
		setPassword( event.target.value )
		setIsPasswordError(false)
		setPasswordHelperText('')
	}

	function onRepeatPasswordChange( event ) {
		setRepeatPassword( event.target.value )
		setIsRepeatPasswordError(false)
		setRepeatPasswordHelperText('')
	}

	function onFormSubmit(event) {
		event.preventDefault()
		if (validateLogin()) {
		// @TODO check for account
		}
	}
	
	function onSignUpButtonClicked() {
		if(isRepeatPasswordDisplayed){
			if (validateSignup()){
				// @Todo create Account	
			}
			
		} else {
			setIsRepeatPasswordDisplayed(true)
		}
	}

	function validateLogin() {
		let hasErrors = false;
		
		if (!validateEmail()) {
			setMailHelperText('z.B. \"mail@example.org\"');
			setIsMailError(true);
			hasErrors = true
		}
		if (!validatePassword()) {
			setPasswordHelperText('Mind. 8 Zeichen');
			setIsPasswordError(true);
			hasErrors = true
		}
		return hasErrors
	}

	function validateSignup() {
		let hasErrors = validateLogin();
		if (!validateRepeatPassword()) {
			setRepeatPasswordHelperText('Passwörter Stimmen nicht überein!');
			setIsRepeatPasswordError(true);
			hasErrors = true
		}
		return hasErrors
	}

	function validateEmail(){
		const mailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		console.log(mailFormat.test(userMail.toLowerCase))
		return userMail.match(mailFormat)
	}

	function validatePassword() {
		if (password.length < 8){
			return false
		}
		return true
	}

	function validateRepeatPassword() {
		return(password === repeatPassword)
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
				onChange={onUserMailChange}
				value={userMail}
				hasError={isMailError}
				helperText={mailHelperText}
				/>
			<BasicInput className="passwordForm"
				iconName="key"
				isVisible={false}
				placeholder="Passwort"
				onChange={onPasswordChange}
				value={password}
				hasError={isPasswordError}
				helperText={passwordHelperText}
				/>
			{isRepeatPasswordDisplayed ? 
				<BasicInput className="passwordForm"
					iconName="key"
					isVisible={false}
					placeholder="Passwort wiederholen"
					onChange={onRepeatPasswordChange}
					value={repeatPassword}
					hasError={isRepeatPasswordError}
					helperText={repeatPasswordHelperText}
					/>
			:null}
			<BasicButton text="Log IN"
				className="button_LogIn"
				onClick={onFormSubmit} />
			<BasicButton text="Sign UP"
				className="button_SignUp"
				onClick={onSignUpButtonClicked} />
		</form>
		<Background />
	</div>
)
}