import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import Header from "../Header/Header";
import About from "../About/About";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import * as NewsAuth from "../../utils/NewsAuth";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import MessagePopup from "../MessagePopup/MessagePopup";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isMessagePopupOpen, setMessagePopupOpen] = React.useState(false);
  const [isSomeonePopupOpen, setIsSomeonePopupOpen] = React.useState(false);

  const history = useHistory();

  const removeFromFavorites = (_id) => {
    const token = localStorage.getItem('token');
    return mainApi.removeNews( _id , { token } )
  }

  const getUserData = ({ token }) => {
    mainApi.getUserInfo({ token })
      .then(res => {
        console.log(res)
        localStorage.setItem('user', JSON.stringify(res));
        setCurrentUser(res)
      })
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      NewsAuth.tokenCheck({ token })
        .then((res) => {
          getUserData({token});
          setLoggedIn(true);
          console.log(res);
        })
    }

  },[]);

  function onSignOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    setCurrentUser({});
    history.push('/');
  }

  React.useEffect(() => {
    if (isLoginPopupOpen || isRegisterPopupOpen || isMessagePopupOpen) {
      setIsSomeonePopupOpen(true);
    } else {
      setIsSomeonePopupOpen(false);
    }
  }, [isLoginPopupOpen, isRegisterPopupOpen, isMessagePopupOpen])

  const OpenLoginPopup = () => {
    closeAllPopups();
    console.log('функция открытия попапа с авторизацией')
    setIsLoginPopupOpen(true);
  }

  const OpenRegisterPopup = () => {
    closeAllPopups();
    console.log('Функция открытия рег попапа')
    setIsRegisterPopupOpen(true);
  }
  const OpenMessagePopup = () => {
    closeAllPopups();
    console.log('Функция открытия рег попапа')
    setMessagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setMessagePopupOpen(false);
  }

  // Закрытие попапов при нажатии Esc

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => document.removeEventListener('keydown', handleEscClose);

  },[])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header
          loggedIn={loggedIn}
          OpenSignInPopup={ OpenLoginPopup }
          isSomeonePopupOpen={isSomeonePopupOpen}
          onClickSignOut={onSignOut}
        />
        <main className="app__content">
          <Switch>
            <Route exact path="/">
              <Main isLoading={isLoading} setIsLoading={setIsLoading} loggedIn={loggedIn}
                    removeFromFavorites={removeFromFavorites}/>
              <About />
            </Route>
            <ProtectedRoute path='/saved-news' loggedIn={loggedIn} OpenSignInPopup={OpenLoginPopup} component={SavedNews}
                            isLoading={isLoading} setIsLoading={setIsLoading} removeFromFavorites={removeFromFavorites}
            />
          </Switch>
        </main>
        <Footer />
        <Login
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          OpenSignUpPopup={OpenRegisterPopup}
          setLoggedIn={setLoggedIn}
          getUserData={getUserData}
        />
        <Register
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          OpenSignInPopup={OpenLoginPopup}
          OpenMessagePopup={OpenMessagePopup}
        />

        <MessagePopup
          isOpen={isMessagePopupOpen}
          onClose={closeAllPopups}
          OpenSignInPopup={OpenLoginPopup}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
