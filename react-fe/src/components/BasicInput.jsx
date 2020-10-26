import React from 'react'
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Icon from './Icon';

export default function BasicInput(props) {

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const handleClickShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    if (props.isVisible){

    return (
        <div className={"inputFormItem " +props.className}>
            <TextField
                error={props.hasError}
                helperText={props.helperText}
                id="input-with-icon-textfield"
                value={props.value}
                onChange={props.onChange}
                
                label={props.placeholder}
        	    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <Icon iconName='account' />
                        </InputAdornment>
                    ),
                }} 
            />
        </div>
    )}
   
    return(
        <div className={"inputFormItem " +props.className}>
            <TextField
                error={props.hasError}
                helperText={props.helperText}
                id="input-with-icon-textfield"
                value={props.value}
                type={isPasswordVisible?'text':'password'}
        	    onChange={props.onChange}
        	    label={props.placeholder}
        	    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                          <Icon iconName='password' />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                                {isPasswordVisible ? <Icon iconName='visibility' /> : <Icon iconName='visibilityOff' />}
                            </IconButton>
                        </InputAdornment>  
                    )
                }} />
        </div>
    )
};

BasicInput.propTypes = {
    iconName: PropTypes.string,
    isVisible: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    hasError: PropTypes.bool,
    helperText: PropTypes.string,
};