import React from "react";
import './NewsCard.css';
import Button from "../Button/Button";
import {Link} from "react-router-dom";
import pathImg from '../../images/photo-1607969092427-2669db678ebe.jpeg';

function NewsCard() {
  return (
    <article className="card">

      <div className="card__buttons-and-tag-wrapper">
        <p className="card__tag">Погода</p>
        <div className="card__buttons-wrapper">
          <Button className="card__signin-button">Войдите, чтобы сохранять статьи</Button>
          <Button className="card__toggle-favorite-button">
            <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.38 15.71L6 19.94V4h12v15.94l-5.38-4.23-.62-.48-.62.48z" stroke="#B6BCBF" strokeWidth="2"/>
            </svg>
          </Button>
        </div>
      </div>

      <Link to="#" className="card__img-wrapper">
        <img src={pathImg} alt="описание" className="card__img" width="400" height="272"/>
      </Link>

      <div className="card__content">
        <span className="card__date">2 августа, 2019</span>
        <Link className="card__title" to="#">Национальное достояние – парки</Link>
        <p className="card__text">
          В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных
          парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.
        </p>
        <Link to="#" className="card__source">Дзен</Link>
      </div>

    </article>
  )
}

export default NewsCard;