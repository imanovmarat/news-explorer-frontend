import React from "react";
import './NewsCard.css';
import Button from "../Button/Button";
import { Route } from "react-router-dom";
import FavoriteIcon from "../Icons/FavoriteIcon";
import TrashIcon from "../Icons/TrashIcon";

const NewsCard = ({ cardData, handleIconClick, tooltipData }) => {
  const [isWindowWidthSmall, setIsWindowWidthSmall] = React.useState(false);
  const [ tooltip, setTooltip ] = React.useState();
  const [ iconType, setIconType ] = React.useState('normal');


  /* ------------- Слушатель для определения ширина окна ------------- */

  React.useEffect((() => {
    function updateScreenWidth() {
      if(window.innerWidth < 770) return setIsWindowWidthSmall(true);
      return setIsWindowWidthSmall(false);
    }

    window.addEventListener('resize', updateScreenWidth);

    return () => window.removeEventListener('resize', updateScreenWidth);

  }),[]);

  /* ------------- Отлеживание наведение курсора ------------- */

  const mouseEnter = () => {
    setTooltip(tooltipData);
    setIconType('hover');
  }

  const mouseLeave = () => {
    setTooltip();
    setIconType('normal');
  }

  function handleClick() {
    handleIconClick(cardData);
  }

  const currentCard = React.useMemo(() => {
    const phrase = cardData.text;
    const phraseSub = phrase.length < 80 ? phrase :  phrase.substring(0, 80) + '...';
    return  <article className="card">
                <div className="card__buttons-and-tag-wrapper">
                  <Route path='/saved-news'>
                    <p className="card__tag">{ cardData.keyword }</p>
                  </Route>
                  <div className="card__buttons-wrapper">
                      { tooltip }
                      <Button type="card-action" onMouseEnter={ mouseEnter } onMouseLeave={ mouseLeave } onClick={handleClick} >
                        <Route exact path="/">
                          <FavoriteIcon type={ cardData._id ? 'marked' : iconType } />
                        </Route>
                        <Route path='/saved-news'>
                          <TrashIcon type={ iconType }/>
                        </Route>
                      </Button>
                  </div>
                </div>

              <div className="card__img-wrapper">
                <img src={ cardData.image || 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg' } alt={ cardData.title } className="card__img" width="400" height="272"/>
              </div>

              <div className="card__content">
                <span className="card__date">{ cardData.date.slice(0, 10)}</span>
                <a className="card__title" href={ cardData.link } rel="noreferrer" target='_blank'>{ Math.random() }</a>
                <p className="card__text" >
                  { isWindowWidthSmall ? phraseSub : phrase }
                </p>
                <a className="card__source" href={ cardData.link } rel="noreferrer" target='_blank'>{ cardData.source }</a>
              </div>

            </article>

  }, [cardData, iconType, isWindowWidthSmall])

  return (
    currentCard
  )
}

export default NewsCard;