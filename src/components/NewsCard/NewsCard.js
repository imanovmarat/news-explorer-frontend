import React from "react";
import './NewsCard.css';
import Button from "../Button/Button";
import { Route } from "react-router-dom";
import FavoriteIcon from "../Icons/FavoriteIcon";
import TrashIcon from "../Icons/TrashIcon";

const NewsCard = React.memo(( { searchRequest, addToFavorites, isAuthorized, cardData }, props) => {

  const [isWindowWidthSmall, setIsWindowWidthSmall] = React.useState(false);

  const phrase = cardData.description || cardData.text;
  const phraseSub = phrase.length < 80 ? phrase :  phrase.substring(0, 80) + '...';

  React.useEffect((() => {

    function updateScreenWidth() {
      if(window.innerWidth < 770) return setIsWindowWidthSmall(true);
      return setIsWindowWidthSmall(false);

    }

    window.addEventListener('resize', updateScreenWidth);

    return () => window.removeEventListener('resize', updateScreenWidth);

  }),[]);



  const [ authTooltip, setAuthTooltip ] = React.useState('');
  const [ removeTooltip, setRemoveTooltip ] = React.useState('');
  const [ iconType, setIconType ] = React.useState('normal');
  const [ trashType, setTrashType ] = React.useState('#B6BCBF');
  const [ isNewsSaved, setIsNewsSaved ] = React.useState(false);

  const mouseEnter = () => {
    !isAuthorized && setAuthTooltip(<p className="card__tooltip">Войдите, чтобы сохранять статьи</p>);
    setIconType('hover');
  }

  const mouseLeave = () => {
    !isAuthorized && setAuthTooltip('');
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

  const handleAddToFavoritesClick = () => {
    if (!isAuthorized) return;
    addToFavorites({
      keyword: searchRequest,
      title: cardData.title,
      text: cardData.description,
      date: cardData.publishedAt.slice(0, 10),
      source: cardData.source.name,
      link: cardData.url,
      image: cardData.urlToImage
    })
      .then(res => {
      console.log('заебок, сохранена');
      console.log(res);
        setIsNewsSaved(true);
    })
      .catch(err => {
        console.error('бля, не сохранена');
        console.error(err);
        setIsNewsSaved(false);
      });
  }

  return (
    <article className="card">
      <Route exact path="/">
        <div className="card__buttons-and-tag-wrapper">
          <div className="card__buttons-wrapper">
            {!isAuthorized && authTooltip}
            <Button type="card-action" onMouseEnter={ !isNewsSaved ? mouseEnter : undefined} onMouseLeave={!isNewsSaved ? mouseLeave : undefined} onClick={handleAddToFavoritesClick}>
              <FavoriteIcon type={ isNewsSaved ? 'marked' : iconType}/>
            </Button>
          </div>
        </div>
      </Route>
      <Route path='/saved-news'>
        <div className="card__buttons-and-tag-wrapper">
          <p className="card__tag">{ cardData.keyword }</p>
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

      <div className="card__img-wrapper">
        <img src={ cardData.urlToImage || cardData.image } alt="Фотография дороги" className="card__img" width="400" height="272"/>
      </div>

      <div className="card__content">
        <span className="card__date">{ cardData.publishedAt.slice(0, 10) || cardData.date}</span>
        <a className="card__title" href={ cardData.url || cardData.link } rel="noreferrer" target='_blank'>{ cardData.title }</a>
        <p className="card__text" >
          { isWindowWidthSmall ? phraseSub : phrase }
        </p>
        <a className="card__source" href={ cardData.url || cardData.link } rel="noreferrer" target='_blank'>{ cardData.source.name }</a>
      </div>

    </article>
  )
})

export default NewsCard;