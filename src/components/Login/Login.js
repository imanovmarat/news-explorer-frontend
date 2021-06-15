import React from 'react';
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import * as NewsAuth from "../../utils/NewsAuth";

function Login({ isOpen, onClose, OpenSignUpPopup, setLoggedIn, getUserData}) {

  const [submitErrorMessage, setSubmitErrorMessage] = React.useState('');

  function submitSignInForm ({ email, password}) {
    console.log('Форма авторизации отправлена')
    NewsAuth.singIn({ email, password })
      .then(res => {
        localStorage.setItem('token', res.token);
        getUserData(res);
        setLoggedIn(true);
        console.log(res);
        onClose();
      })
      .catch(err => {
        console.log(err)
        setSubmitErrorMessage(err)
      })
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
      submitError={ submitErrorMessage }
      setSubmitErrorMessage={setSubmitErrorMessage}
    />
  )
}

export default Login;

