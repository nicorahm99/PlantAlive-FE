import React from 'react';
import Background from '../components/Background.jsx';
import BasicButton from '../components/BasicButton.jsx';
import BasicInput from '../components/BasicInput.jsx';
import Icon from '../components/Icon.jsx';
import {useHistory} from 'react-router-dom';

export default function Login() {
	const history = useHistory();

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
			history.push('/home')
		}
	}
	
	function onSignUpButtonClicked() {
		if(isRepeatPasswordDisplayed){
			if (validateSignup()){
				// @Todo create Account	
				history.push('/home')
			}
			
		} else {
			setIsRepeatPasswordDisplayed(true)
		}
	}

	function validateLogin() {
		let isValid = true;
		
		if (!validateEmail()) {
			setMailHelperText('z.B. "mail@example.org"');
			setIsMailError(true);
			isValid = false
		}
		if (!validatePassword()) {
			setPasswordHelperText('Mind. 8 Zeichen');
			setIsPasswordError(true);
			isValid = false
		}
		return isValid
	}

	function validateSignup() {
		let isValid = validateLogin();
		if (!validateRepeatPassword()) {
			setRepeatPasswordHelperText('Passwörter Stimmen nicht überein!');
			setIsRepeatPasswordError(true);
			isValid = false
		}
		return isValid
	}

	function validateEmail(){
		// eslint-disable-next-line
		const mailFormat = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
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
		<div className="pageLogin_Form"> 
		<form onSubmit={onFormSubmit} >
			<BasicInput className="userNameForm"
				iconName="account"
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
		</form>
			<BasicButton text="Sign UP"
				className="button_SignUp"
				onClick={onSignUpButtonClicked} />
		</div>
		<Background />
	</div>
)
}