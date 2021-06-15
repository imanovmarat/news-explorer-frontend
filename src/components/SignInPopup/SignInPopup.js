import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function SignInPopup({ isOpen, onClose, OpenSignUpPopup}) {

  function submitSignInForm (e) {
    console.log('Форма авторизации отправлена')
    onClose();
    e.preventDefault();
  }

  return (
    <PopupWithForm
      onSubmit={ submitSignInForm }
      formName="signin"
      openAnotherPopup={ OpenSignUpPopup }
      isOpen={ isOpen }
      onClose={ onClose }
      title="Вход"
      buttonText="Войти"
      alterButtonText="Зарегистрироваться"
    />
  )
}

export default SignInPopup;

