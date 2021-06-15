import React from 'react';
import './App.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import { Route, Switch } from 'react-router-dom';
import SignInPopup from "../SignInPopup/SignInPopup";
import SingUpPopup from "../SingUpPopup/SingUpPopup";

function App() {
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);

  const [isSomeonePopupOpen, setIsSomeonePopupOpen] = React.useState(false);

  React.useEffect(() => {
    if (isSignInPopupOpen || isSignUpPopupOpen) {
      setIsSomeonePopupOpen(true);
    } else {
      setIsSomeonePopupOpen(false);
    }
  }, [isSignInPopupOpen, isSignUpPopupOpen])

  const OpenSignInPopup = () => {
    closeAllPopups();
    console.log('функция открытия попапа с авторизацией')
    setSignInPopupOpen(true);
  }

  const OpenSignUpPopup = () => {
    closeAllPopups();
    console.log('Функция открытия рег попапа')
    setSignUpPopupOpen(true);
  }

  const closeAllPopups = () => {
    setSignInPopupOpen(false);
    setSignUpPopupOpen(false);
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
    <div className="app">
      <Header OpenSignInPopup={ OpenSignInPopup } isSomeonePopupOpen={isSomeonePopupOpen}/>
      <main className="app__content">
        <Switch>
          <Route exact path="/">
            <SearchForm />
            <NewsCardList />
            <About />
          </Route>
          <Route path='/saved-news'>
            <SavedNews />
            <NewsCardList />
          </Route>
        </Switch>
      </main>
      <Footer />
      <SignInPopup
        isOpen={isSignInPopupOpen}
        onClose={closeAllPopups}
        OpenSignUpPopup={OpenSignUpPopup}
      />
      <SingUpPopup
        isOpen={isSignUpPopupOpen}
        onClose={closeAllPopups}
        OpenSignInPopup={OpenSignInPopup} />
    </div>

  );
}

export default App;
