import React from "react";
import './NewsCard.css';
import Button from "../Button/Button";
import {Link, Route} from "react-router-dom";
import pathImg from '../../images/photo-1607969092427-2669db678ebe.jpeg';
import FavoriteIcon from "../Icons/FavoriteIcon";
import TrashIcon from "../Icons/TrashIcon";

function NewsCard(props) {

  const [windowWidth, setWindowWidth] = React.useState(0);

  const phrase = ' В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.';
  const phraseSub = phrase.substring(0, 80) + '...';

  React.useEffect((() => {

    function updateScreenWidth() {
      setWindowWidth(window.innerWidth);

    }

    window.addEventListener('resize', updateScreenWidth);

    return () => window.removeEventListener('resize', updateScreenWidth);

  }),[]);



  const [authTooltip, setAuthTooltip] = React.useState('');
  const [removeTooltip, setRemoveTooltip] = React.useState('');
  const [IconType, setIconType] = React.useState('normal');
  const [trashType, setTrashType] = React.useState('#B6BCBF');

  const mouseEnter = () => {
    setAuthTooltip(<p className="card__tooltip">Войдите, чтобы сохранять статьи</p>);
    setIconType('hover');
  }

  const mouseLeave = () => {
    setAuthTooltip('');
    setIconType('normal');
  }

  const handleTooltipRemoveFromFavoritesOpen = () => {
    setRemoveTooltip(<p className="card__tooltip">Убрать из сохранённых</p>);
    setTrashType('#1A1B22');
  }

  const handleTooltipRemoveFromFavoritesClose = () => {
    setRemoveTooltip('');
    setTrashType('#B6BCBF');
  }

  const defineIconType = (marked) => {
    if (marked) return "marked";
    return IconType;
  }

  return (
    <article className="card">
      <Route exact path="/">
        <div className="card__buttons-and-tag-wrapper">
          <p className="card__tag">Погода</p>
          <div className="card__buttons-wrapper">
            {!props.marked && authTooltip}
            <Button type="card-action" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
              <FavoriteIcon type={defineIconType(props.marked)}/>
            </Button>
          </div>
        </div>
      </Route>
      <Route path='/saved-news'>
        <div className="card__buttons-and-tag-wrapper">
          <p className="card__tag">Погода</p>
          <div className="card__buttons-wrapper">
            {removeTooltip}
            <Button
              type="card-action"
              onMouseEnter={handleTooltipRemoveFromFavoritesOpen}
              onMouseLeave={handleTooltipRemoveFromFavoritesClose}
            >
              <TrashIcon fill={ trashType }/>
            </Button>

          </div>
        </div>
      </Route>

      <Link to="#" className="card__img-wrapper">
        <img src={pathImg} alt="Фотография дороги" className="card__img" width="400" height="272"/>
      </Link>

      <div className="card__content">
        <span className="card__date">2 августа, 2019</span>
        <Link className="card__title" to="#">Национальное достояние – парки</Link>
        <p className="card__text" >
          { windowWidth < 770 ? phraseSub : phrase }
        </p>
        <Link to="#" className="card__source">Дзен</Link>
      </div>

    </article>
  )
}

export default NewsCard;