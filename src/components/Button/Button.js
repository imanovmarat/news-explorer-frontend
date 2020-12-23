import React from "react";
import './Button.css';

function Button({ type = 'default', children, ...rest }) {
  return (
    <button {...rest} className={`button button_type_${type}`}>{ children }</button>
  )
}

export default Button;