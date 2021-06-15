import React from "react";
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";
import Button from "../Button/Button";
import {Route} from "react-router-dom";
import NotFoundNews from "../Icons/NotFoundNews";

function NewsCardList() {
  return (
    <section className="cardList">
      <div className="cardList__container {/*cardList__container_align_center*/}">
        {/*Если раскомментировать код ниже, то отобразится блок, когда новости не найдены */}
        {/*<NotFoundNews className="cardList__not-found-icon"/>
        <p className="cardList__not-fount-title" >Ничего не найдено</p>
        <p className="cardList__not-fount-text">К сожалению по вашему запросу ничего не найдено.</p>*/}
        <Route exact path="/">
          <h2 className="cardList__title">Результаты поиска</h2>
        </Route>
        <div className="cardList__cards">
          <NewsCard />
          <NewsCard marked={true} />
          <NewsCard />
        </div>
        <Button type="show-more">Показать еще</Button>
      </div>
    </section>
  )
}

export default NewsCardList;