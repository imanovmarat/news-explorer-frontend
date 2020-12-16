import React from "react";
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";
import Button from "../Button/Button";

function NewsCardList() {
  return (
    <section className="cardList">
      <div className="cardList__container">
        <h2 className="cardList__title">Результаты поиска</h2>
        <div className="cardList__cards">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
        <Button className="cardList__button">Показать еще</Button>
      </div>
    </section>
  )
}

export default NewsCardList;