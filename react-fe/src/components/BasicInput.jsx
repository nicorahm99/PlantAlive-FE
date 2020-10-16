import React from 'react'
import PropTypes from 'prop-types';
import Icon from './Icon';


export default function BasicInput(props) {
    return (
        <div className={"inputFormItem " +props.className}>
                <Icon iconName={props.iconName} className={"inputFormItem_Icon " + props.className + "_Icon"}/>
                {props.isVisible ? 
                    <input type="text" className={"inputFormItem_textInput " + props.className + "_texInput"} placeholder={props.placeholder} onChange={props.onChange} value={props.value}/> 
                    : <input type="password" className={"inputFormItem_textInput " + props.className + "_texInput"} placeholder={props.placeholder} onChange={props.onChange} value={props.value}/>
                }
        </div>
    )
};

BasicInput.propTypes = {
    iconName: PropTypes.string,
    isVisible: PropTypes.bool,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};