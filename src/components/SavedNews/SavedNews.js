import React from "react";
import './SavedNews.css';
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";

function SavedNews ({ loggedIn, removeFromFavorites, isLoading, setIsLoading }) {

  const [ news, setNews ] = React.useState(null);
  const [ keywords, setKeywords ] = React.useState([]);



  React.useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    mainApi.getSavedNews({ token })
      .then(savedNews => {
        setNews(savedNews.reverse());
        setIsLoading(false);
      })

  }, [])

  React.useEffect(() => {
    if (!news) return;
    const keywordList = news.reduce((prev, newsItem) => {
      const obj = prev.find((item) => item.keyword === newsItem.keyword );
      if (obj) {
        obj.count += 1;
      } else {
        prev.push({
          keyword: newsItem.keyword,
          count: 1
        })
      }
      return prev;
    },[])

    const keywordInAscendingOrder = keywordList.sort((a, b) => {
      return b.count - a.count;
    });
    setKeywords(keywordInAscendingOrder);
  },[news])


  const iconClick = ({ _id }) => {
    if ( !loggedIn ) return;

    removeFromFavorites(_id)
      .then(res => {
        setNews(prevState => prevState.filter((item) => item._id !== res._id ))
      })
      .catch(err => console.error(err));
  }

  const renderNewsCardList = (news, isLoading) => {
    if (isLoading) return <Preloader />
    if (news !== null) {
      if (news.length === 0) return;
      return <section className="cardList">
               <div className="cardList__container">
                 <NewsCardList news={ news } handleIconClick={iconClick} tooltipData={<p className="card__tooltip">Удалить из сохранённых</p>}/>
               </div>
             </section>
    }
  }

  return (
    <>
      <SavedNewsHeader keywords={ keywords } news={ news } isLoading={isLoading}/>
      {renderNewsCardList (news, isLoading)}
    </>
  )
}

export default SavedNews;
