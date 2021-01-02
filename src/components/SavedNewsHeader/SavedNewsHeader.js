import React from "react";
import './SavedNewsHeader.css'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedNewsHeader( { keywords, news, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const renderContent = () => {

      const renderKeywordList = (keywordList) => {
        console.log(keywordList.map((i) => i.keyword).join(' ,'))
        if (keywordList.length <= 3) {
          return <span className="saved-news__tags">{ keywordList.map((i) => i.keyword).join(', ') }</span>
        } else {
          return <>
                  <span className="saved-news__tags">{ keywordList.slice(0, 3).map((i) => i.keyword).join(', ') } </span>
                  и<span className="saved-news__tags"> { keywordList.length - 3 }-м другим</span>
                </>
        }
      }

    if (isLoading) return;
    if (news !== null) {
      if (news.length === 0) return <h1 className="saved-news__title">{currentUser.name}, у вас нет сохранённых статей</h1>;
      return <>
              <h1 className="saved-news__title">{currentUser.name}, у вас { news.length } сохранённых статей</h1>
              <p className="saved-news__subtitle">
                По ключевым словам: { renderKeywordList (keywords)}
              </p>
            </>
    }
  }

  return (
    <section className="saved-news">
      <span className="saved-news__description">Сохранённые статьи</span>
      { renderContent() }
    </section>
  )
}

export default SavedNewsHeader;