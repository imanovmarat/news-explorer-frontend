import React from "react";
import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader__container">
      <div className="preloader__wrapper">
        <i className="preloader__animation" />
      </div>
    </div>

  )
}

export default Preloader;