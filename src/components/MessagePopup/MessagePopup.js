import React from "react";
import Button from "../Button/Button";
import CloseIcon from "../Icons/CloseIcon";

function MessagePopup({ isOpen, onClose, OpenSignInPopup}) {

  function handleOutsideClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section className={ `popup ${isOpen && 'popup_opened'}` }>
      <div className="popup__container" onClick={handleOutsideClickClose}>
        <div className="popup__body" >
          <Button type="close-popup" onClick={onClose} ><CloseIcon width="100%" height="100%"/></Button>
          <p className="popup__title">Пользователь успешно зарегистрирован! </p>
          <button className="popup__change-popup-button" type="button" onClick={OpenSignInPopup}>Войти</button>
        </div>
      </div>
    </section>
  )
}

export default MessagePopup;