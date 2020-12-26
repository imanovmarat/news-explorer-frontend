import React from "react";
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";
import Button from "../Button/Button";
import {Route, useLocation} from "react-router-dom";
import mainApi from "../../utils/MainApi";

function NewsCardList({searchRequest, addToFavorites, isAuthorized, news }) {
  const location = useLocation();
  const path = location.pathname;


  const [toShow, setToShow ] = React.useState(3);

  const renderContent = (news) => {
    if (news) {
      const itemsToShow = news.filter((newsItem, index) => {
        return index < toShow;
      });
      return itemsToShow.map((newsItem) => <NewsCard
        isAuthorized={isAuthorized}
        cardData={newsItem}
        key={newsItem.url}
        addToFavorites={addToFavorites}
        searchRequest={searchRequest}
      />)
    }
     mainApi.getSavedNews({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3NGQ0MjMyN2M5NTVmOTFiOWM3YzgiLCJpYXQiOjE2MDg5OTUxNDksImV4cCI6MTYwOTU5OTk0OX0.uKSauaRpFOnV_hHXkP1pG2UNDjx0alyFk-2-cbOGWMQ'})
      .then(res => {
        console.log(res)
        return res.map((newsItem) => {
          return <NewsCard
          isAuthorized={isAuthorized}
          cardData={newsItem}
          key={newsItem._id}
          addToFavorites={addToFavorites}
          searchRequest={searchRequest}
        />
      })})
  }

  const renderButton = (path, news) => {
    if (news && path === '/') {
      return news.length > toShow && <Button type="show-more" onClick={handleClick}>Показать еще</Button>
    }
  }



  function handleClick() {
    setToShow(toShow + 3);
  }

  return (

    <section className="cardList">
      <div className="cardList__container">
        <Route exact path="/">
          <h2 className="cardList__title">Результаты поиска</h2>
        </Route>
        <div className="cardList__cards">
          { renderContent(news) }
                {/*<NewsCard />
            <NewsCard marked={true} />
            <NewsCard />*/}
        </div>
        { renderButton(path, news) }
      </div>
    </section>
  )
}

export default NewsCardList;