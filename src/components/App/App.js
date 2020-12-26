import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from "../Header/Header";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import SignInPopup from "../SignInPopup/SignInPopup";
import SingUpPopup from "../SingUpPopup/SingUpPopup";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import NotFoundNews from "../NotFoundNews/NotFoundNews";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [ user, setUser ] = React.useState({});
  const [ isLoading, setIsLoading ] = React.useState(true);
  const [ news, setNews ] = React.useState(null);
  const [ searchRequest, setSearchRequest ] = React.useState('');
  const [ word, setWord ] = React.useState('')
  const [isSignInPopupOpen, setSignInPopupOpen] = React.useState(false);
  const [isSignUpPopupOpen, setSignUpPopupOpen] = React.useState(false);
  const [isSomeonePopupOpen, setIsSomeonePopupOpen] = React.useState(false);

  //TODO Переделать useEffect
  React.useEffect(() => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3NGQ0MjMyN2M5NTVmOTFiOWM3YzgiLCJpYXQiOjE2MDg5OTUxNDksImV4cCI6MTYwOTU5OTk0OX0.uKSauaRpFOnV_hHXkP1pG2UNDjx0alyFk-2-cbOGWMQ';
    mainApi.getUserInfo({token})
      .then(res => {
        console.log(res);
        setUser(res)
      });
  },[]);

  function addToFavorites({ keyword, title, text, date, source, link, image }) {
    const token = localStorage.getItem('token');
    return mainApi.addNews({keyword, title, text, date, source, link, image, token})
  }


  function handleSearchInputChange(e) {
    setWord(e.target.value);
  }

  React.useEffect(() => {
    setIsLoading(true);
    if (getFromLocalStorage()) {
      const { news, keyword } = getFromLocalStorage();
      setNews(news);
      setWord(keyword);
      setSearchRequest(keyword);
      setIsLoading(false);
    }
  },[]);

  function handleSubmitSearch (word) {
    console.log(word)
    setSearchRequest(word);
  }


  function setToLocalStorage ({ news, keyword}) {
    localStorage.setItem('searchRequest', JSON.stringify({
      news,
      keyword
    }));
  }

  function getFromLocalStorage () {
    const localStorageData = JSON.parse(localStorage.getItem('searchRequest'));
    if (localStorageData) return {
      news: localStorageData.news,
      keyword: localStorageData.keyword
    }
    return null;
  }


  React.useEffect(() => {
    if (searchRequest !== '' ) {
      setIsLoading(true);
      newsApi.getNews({token: 'f5cacb5effc8473ea9c1c56ae5a59a6e', keyword: searchRequest}) /*214c27292b164ac8a0014a5c58108939*/
        .then(res => {
          console.log(res.articles)
          setNews(res.articles);
          setToLocalStorage({
            news: res.articles,
            keyword: searchRequest
          });
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
          setNews([]);
          localStorage.removeItem('searchRequest');
          console.error('вот дерьмо');
          console.error(err);
        });
    }
  },[searchRequest]);

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

  const renderContent = (news, isLoading) => {
    if (news !== null) {
      if (isLoading) return <Preloader />
      if (news.length === 0) return <NotFoundNews />
      return <NewsCardList searchRequest={searchRequest} isAuthorized={loggedIn} news={news} addToFavorites={addToFavorites} />
    }
  }

  return (
    <div className="app">
      <Header
        isAuthorized={loggedIn}
        OpenSignInPopup={ OpenSignInPopup }
        isSomeonePopupOpen={isSomeonePopupOpen}
      />
      <main className="app__content">
        <Switch>
          <Route exact path="/">
            <SearchForm onSubmit={handleSubmitSearch} onChange={handleSearchInputChange} word={word}/>
            { renderContent(news, isLoading) }
            <About />
          </Route>
          <Route path='/saved-news'>
            <SavedNews />
            <NewsCardList/>
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
