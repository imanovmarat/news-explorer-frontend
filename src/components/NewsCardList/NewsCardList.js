import React from "react";
import './NewsCardList.css';
import NewsCard from "../NewsCard/NewsCard";

const NewsCardList = ({ searchRequest, addToFavorites, loggedIn, news, handleIconClick, tooltipData}) => {

  const currentCardList = React.useMemo(() => {
    return <div className="cardList__cards">
      {
        news.map((newsItem) => {
          return <NewsCard
            loggedIn={ loggedIn }
            cardData={ newsItem }
            key={ newsItem._id || newsItem.link }
            addToFavorites={ addToFavorites }
            searchRequest={ searchRequest }
            handleIconClick={ handleIconClick }
            tooltipData={ !loggedIn && tooltipData }
          />})
      }
    </div>
  },[searchRequest, addToFavorites, loggedIn, news, handleIconClick, tooltipData])

  return (
    currentCardList
  )
}

export default NewsCardList;