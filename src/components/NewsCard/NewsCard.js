import React from "react";
import './NewsCard.css';
import Button from "../Button/Button";
import {Link, useLocation} from "react-router-dom";
import pathImg from '../../images/photo-1607969092427-2669db678ebe.jpeg';

function NewsCard(props) {
  const location = useLocation();
  const path = location.pathname;

  const [button, setButton] = React.useState('');
  const [button2, setButton2] = React.useState('');

  const handleTooltipLoginOpen = () => {
    setButton(<Button className="button_type_tooltip">Войдите, чтобы сохранять статьи</Button>);
  }

  const handleTooltipLoginClose = () => {
    setButton('');
  }

  const handleTooltipRemoveFromFavoritesOpen = () => {
    setButton2(<Button className="button_type_tooltip">Убрать из сохранённых</Button>);
  }

  const handleTooltipRemoveFromFavoritesClose = () => {
    setButton2('');
  }

  return (
    <article className="card">
      { path === '/'
        ? <div className="card__buttons-and-tag-wrapper">
            <p className="card__tag">Погода</p>
            <div className="card__buttons-wrapper">
              {!props.marked && button}
              <Button
                className={ props.marked ? "button_type_marked" : "button_type_favorite button_cursor_not-allowed" }
                onMouseEnter={handleTooltipLoginOpen}
                onMouseLeave={handleTooltipLoginClose}
              />
            </div>
          </div>
        : <div className="card__buttons-and-tag-wrapper">
            <p className="card__tag">Погода</p>
            <div className="card__buttons-wrapper">
              {button2}
              <Button
                className="button_type_trash"
                onMouseEnter={handleTooltipRemoveFromFavoritesOpen}
                onMouseLeave={handleTooltipRemoveFromFavoritesClose}
              />
            </div>
          </div>
      }

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