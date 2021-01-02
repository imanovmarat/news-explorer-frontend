import React from "react";
import './Main.css';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";
import NewsCardList from "../NewsCardList/NewsCardList";
import Button from "../Button/Button";
import NotFoundNews from "../NotFoundNews/NotFoundNews";

const Main = ({ removeFromFavorites, isLoading, setIsLoading, loggedIn }) => {

  const [ word, setWord ] = React.useState('');
  const [toShow, setToShow ] = React.useState(3);
  const [ searchRequest, setSearchRequest ] = React.useState('');
  const [ news, setNews ] = React.useState(null);
  const [hasError, setHasError] = React.useState(false);

  /* ------------- Восстанавливаем данные из локального хранища ------------- */

  React.useEffect(() => {
    setIsLoading(true);
    const localStorageData = JSON.parse(localStorage.getItem('searchRequest'));
    console.log(localStorageData)
    if (localStorageData) {
      const { news, keyword } = localStorageData;
      setNews(news);
      setWord(keyword);
      setSearchRequest(keyword);
      setIsLoading(false);
    }
    setIsLoading(false);
  },[]);

  function handleSearchInputChange(e) {
      setWord(e.target.value);
  }

  function handleSubmitSearch (word) {
    if (word !== '' ) {
      setIsLoading(true);
      setToShow(3);
      newsApi.getNews({
        token: 'f5cacb5effc8473ea9c1c56ae5a59a6e', keyword: word
      }) /*214c27292b164ac8a0014a5c58108939*/
        .then(res => {
          setHasError(false)
          console.log(res.articles);
          const newsList = res.articles.map(({ title, description, url, urlToImage, publishedAt, source, _id = undefined }) => (
            { title, text: description, link: url, image: urlToImage, date: publishedAt, source: source.name, _id }
          ));
          setSearchRequest(word)
          setNews(newsList);
          setIsLoading(false);
          localStorage.setItem('searchRequest', JSON.stringify({
            news: newsList,
            keyword: word
          }))
        })
        .catch(_ => {
          setHasError(true)
          setNews([]);
          setIsLoading(false);
        });
    }
  }

  const itemsToShow = (news) => {
    if (news) {
      return news.filter((newsItem, index) => {
        return index < toShow;
      })
    }
  };

  function handleClick() {
    setToShow(toShow + 3);
  }

  /* ------------- Добавление и удаление из сохраненных ------------- */

  const addToFavorites = ({title, text, date, source, link, image}) => {
    const token = localStorage.getItem('token');
    mainApi.addNews({ keyword: searchRequest, title, text, date, source, link, image, token })
      .then(res => setNews( prev => prev.map((i) => i.link === res.link ? res : i)))
      .catch(err => console.error(err));
  }

  const toggleFavorites = ({ title, text, date, source, link, image, _id }) => {
    if ( !loggedIn ) return;

    if (_id) {
      removeFromFavorites(_id)
        .then(res => {
          console.log('удалено из избранного')
          res._id = undefined;
          setNews(prevState => prevState.map((i) => i.link === res.link ? res : i))
        })
        .catch(err => console.error(err));
    } else {
      addToFavorites({title, text, date, source, link, image})
    }
  }

  const renderContent = (news, isLoading) => {

    if (isLoading) return <Preloader />
    if (news !== null) {
      if (hasError) return <section className="cardList">
        <div className="cardList__container">
          «Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз»
        </div>
      </section>
      if (news.length === 0) return <NotFoundNews />
      return <section className="cardList">
              <div className="cardList__container">
                <h2 className="cardList__title">Результаты поиска</h2>
                <NewsCardList news={ itemsToShow(news) } searchRequest={searchRequest}
                handleIconClick={toggleFavorites} loggedIn={loggedIn}
                              tooltipData={<p className="card__tooltip">Войдите, чтобы сохранять статьи</p>}/>
                { news.length > toShow && <Button type="show-more" onClick={handleClick}>Показать еще</Button> }
              </div>
      </section>
    }
  }

  return (
    <>
      <SearchForm onSubmit={handleSubmitSearch} onChange={handleSearchInputChange} word={word}/>
      { renderContent(news, isLoading) }
    </>

  )
}

export default Main;
