import React from "react";
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";
import Button from "../Button/Button";
import {Route} from "react-router-dom";

function NewsCardList() {
  return (
    <section className="cardList">
      <div className="cardList__container">
        <Route exact path="/">
          <h2 className="cardList__title">Результаты поиска</h2>
        </Route>
        <div className="cardList__cards">
          <NewsCard />
          <NewsCard marked={true} />
          <NewsCard />
        </div>
        <Button className="cardList__button">Показать еще</Button>
      </div>
    </section>
  )
}

export default NewsCardList;