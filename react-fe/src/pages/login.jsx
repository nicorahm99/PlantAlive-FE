import React from 'react';
import Background from '../components/Background.jsx';
import BasicButton from '../components/BasicButton.jsx';
import BasicInput from '../components/BasicInput.jsx';
import Icon from '../components/Icon.jsx';
import {useHistory} from 'react-router-dom';
import { buildPostRequest } from '../commons/fetches.js';
import AlertHint from '../components/AlertHint.jsx';

export default function Login() {
	const history = useHistory();

	const [ userMail, setUserMail ] = React.useState('');
	const [ userName, setUserName ] = React.useState('');
	const [ password, setPassword ] = React.useState('');
	const [ repeatPassword, setRepeatPassword ] = React.useState('');

	const [ mailHelperText, setMailHelperText] = React.useState('');
	const [ userNameHelperText, setUserNameHelperText] = React.useState('');
	const [ passwordHelperText, setPasswordHelperText] = React.useState('');
	const [ repeatPasswordHelperText, setRepeatPasswordHelperText] = React.useState('');
	
	const [ isPasswordError, setIsPasswordError] = React.useState(false);
	const [ isUserNameError, setIsUserNameError] = React.useState(false);
	const [ isRepeatPasswordError, setIsRepeatPasswordError] = React.useState(false);
	const [ isMailError, setIsMailError] = React.useState(false);
	
	const [ isSignup, setIsSignup ] = React.useState(false);

	const [ showAlert, setShowAlert ] = React.useState(false);
	const [ alertMessage, setAlertMessage ] = React.useState('');



	function onUserMailChange( event ) {
		setUserMail( event.target.value )
		setIsMailError(false)
		setShowAlert(false)
		setMailHelperText('')
	}

	function onUserNameChange( event ) {
		setUserName( event.target.value )
		setIsUserNameError(false)
		setUserNameHelperText('')
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

	async function onFormSubmit(event) {
		setShowAlert(false)
		event.preventDefault()
		if(isSignup){
			return onSignUpButtonClicked()
		}
		if (validateLogin()) {
			const request = buildPostRequest('/users/auth', {mail:userMail, password});
			const response = await request();

			if (response.status === 200){
				localStorage.setItem('userData', JSON.stringify(response.body))
				history.push('/home')
			} else {
				setAlertMessage("Login leider nicht erfolgreich.\nBitte prüfen Sie Ihre Eingaben.")
			}
			
		}
	}
	
	async function onSignUpButtonClicked() {
		setShowAlert(false)
		if(isSignup){
			if (validateSignup()){
				const request = buildPostRequest('/users', {mail:userMail, name:userName, password});
				const response = await request();

				console.log(response.status)
				if (response.status === 201){
					localStorage.setItem('userData', JSON.stringify(response.body))
					history.push('/home')
				} else if (response.status === 403) {
					setAlertMessage('Die angegebene Email ist bereits vergeben!')
					setShowAlert(true)
				} else {
					setAlertMessage('Ups, da ist etwas schief gelaufen, bitte versuchen Sie es später erneut')
					setShowAlert(true)
				}
			}
			
		} else {
			setIsSignup(true)
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
		if (!validateName()) {
			setUserNameHelperText('Geben Sie bitte Ihren Namen ein');
			setIsUserNameError(true);
			isValid = false
		}
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

	function validateName() {
		if (userName.length < 1){
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
			{isSignup ? 
				<BasicInput className="userNameForm"
					iconName="account"
					isVisible={true}
					placeholder="Name"
					onChange={onUserNameChange}
					value={userName}
					hasError={isUserNameError}
					helperText={userNameHelperText}
					/>
			:null}
			<BasicInput className="passwordForm"
				iconName="key"
				isVisible={false}
				placeholder="Passwort"
				onChange={onPasswordChange}
				value={password}
				hasError={isPasswordError}
				helperText={passwordHelperText}
				/>
			{isSignup ? 
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
		{showAlert ? <AlertHint 
			message={alertMessage}
			level='error'
			close={() => setShowAlert(false)}
			/> 
		: null}
		<Background />
	</div>
)
}