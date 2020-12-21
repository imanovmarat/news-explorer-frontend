import React from "react";
import './Button.css';

function Button(props) {
  return (
    <button {...props} className={`button ${props.className}`} type="button">{props.children}</button>
  )
}

export default Button;