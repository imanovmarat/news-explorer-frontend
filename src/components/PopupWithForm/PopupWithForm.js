import React from "react";
import './PopupWithForm.css'
import { isEmail } from 'validator';
import Button from "../Button/Button";
import CloseIcon from "../Icons/CloseIcon";

function PopupWithForm({
                         formName,
                         onSubmit,
                         isOpen,
                         onClose,
                         children,
                         title,
                         buttonText,
                         alterButtonText,
                         openAnotherPopup,
                         nameInputValidation=true,
                         setNameErrorMessage,
                         setNameInputValue
                       }) {

  const [emailInputValue, setEmailInputValue] = React.useState('');
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const [passwordInputValue, setPasswordInputValue] = React.useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleEmailChange(e) {
    checkEmail(e.target.value)
    setEmailInputValue(e.target.value);
  }

  function checkEmail (email) {
    if (!isEmail(email)) {
      setEmailErrorMessage('Неправильный формат email');
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  }

  function handlePasswordChange(e) {
    const password = e.target.value;
    checkPassword(password)
    setPasswordInputValue(password);
  }

  /*---- в checkPassword заменить проверку ----*/
  function checkPassword (password) {
    if (password.length < 4) {
      setPasswordErrorMessage('Минимум 4 символа');
      setIsPasswordValid(false);
    } else {
      setIsPasswordValid(true);
    }
  }

  React.useEffect(() => {
    if (isEmailValid && isPasswordValid && nameInputValidation) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  },[isEmailValid, isPasswordValid, nameInputValidation]);

  function resetStates(e) {
    if (setNameErrorMessage) {
      setNameErrorMessage('');
      setNameInputValue('');
    }
    setEmailInputValue('');
    setPasswordInputValue('');
    setEmailErrorMessage('');
    setPasswordErrorMessage('');
    onClose(e);
  }

  function handleOutsideClickClose(evt) {
    console.log(evt.target)
    if (evt.target === evt.currentTarget) {
      resetStates(evt);
    }
  }

  return(
    <section className={ `popup ${isOpen && 'popup_opened'}` }>
      <div className="popup__container" onClick={handleOutsideClickClose}>
        <div className="popup__body" >
          <Button type="close-popup" onClick={resetStates} ><CloseIcon width="100%" height="100%"/></Button>
          {/*<button className="popup__button_type_close" onClick={resetStates} />*/}
          <form className="popup__form" name={formName} onSubmit={onSubmit} noValidate>
            <fieldset className="popup__wrapper">
              <legend className="popup__title">{ title }</legend>
              <div className="popup__field-wrapper">
                <label className="popup__field-title" htmlFor={ `${formName}-email-input` }>Email</label>
                <input className="popup__input " id={ `${formName}-email-input` } name="signup-email-input"
                       value={emailInputValue} onChange={handleEmailChange} type="email" placeholder="Введите email" required />
                <span className='popup__input-error' id={ `${formName}-email-input-error` }>{ !isEmailValid && emailErrorMessage }</span>
              </div>

              <div className="popup__field-wrapper">
                <label className="popup__field-title" htmlFor={ `${formName}-password-input` }>Пароль</label>
                <input className="popup__input" id={ `${formName}-password-input` } name={ `${formName}-password-input` }
                       value={passwordInputValue} onChange={handlePasswordChange} type="password" placeholder="Введите пароль" required />
                <span className='popup__input-error' id={ `${formName}-password-input-error` }>{ !isPasswordValid && passwordErrorMessage }</span>
              </div>
              { children }
            </fieldset>
            <span className='popup__form-error'>Такой пользователь существует</span>
            <button className="popup__submit-button" type="submit" disabled={!isFormValid}>{ buttonText }</button>
            <span className="popup__change-popup-text">
              или <button className="popup__change-popup-button" type="button" onClick={openAnotherPopup}>{ alterButtonText}</button>
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopupWithForm;