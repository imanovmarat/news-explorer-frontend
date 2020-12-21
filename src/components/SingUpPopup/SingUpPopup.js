import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";


function SingUpPopup({ isOpen, onClose, OpenSignInPopup }) {
  const [nameInputValue, setNameInputValue] = React.useState('');
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(false);

  function handleNameChange(e) {
    checkName(e.target.value);
    setNameInputValue(e.target.value);
  }

  function checkName (name) {
    if (name.length < 2) {
      setNameErrorMessage('Минимум 2 символа');
      setIsNameValid(false);
    } else {
      setNameErrorMessage('');
      setIsNameValid(true);
    }
  }

  function submitSignUpForm (e) {
    console.log('Форма регистрации отправлена')
    onClose();
    e.preventDefault();
  }

  return (
    <PopupWithForm
      nameInputValidation={ isNameValid }
      setNameErrorMessage={ setNameErrorMessage }
      setNameInputValue={ setNameInputValue }
      onSubmit={ submitSignUpForm }
      formName="signup"
      isOpen={ isOpen }
      openAnotherPopup={ OpenSignInPopup }
      onClose={ onClose }
      title="Регистрация"
      buttonText="Зарегистрироваться"
      alterButtonText="Войти"
    >
        <div className="popup__field-wrapper">
          <label className="popup__field-title" htmlFor="signup-name-input" >Имя</label>
          <input className="popup__input" id="signup-name-input" name="signup-name-input"
                 value={nameInputValue} onChange={handleNameChange} type="text" placeholder="Введите своё имя" required />
          <span className='popup__input-error' id='signup-name-input-error'>{ !isNameValid && nameErrorMessage }</span>
        </div>
    </PopupWithForm>
  )
}

export default SingUpPopup;