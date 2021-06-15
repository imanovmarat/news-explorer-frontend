import React from "react";
import './SavedNews.css'

function SavedNews() {
  return (
    <section className="saved-news">
      <span className="saved-news__description">Сохранённые статьи</span>
      <h1 className="saved-news__title">Грета, у вас 5 сохранённых статей</h1>
      <p className="saved-news__subtitle">По ключевым словам: <span className="saved-news__tags">Природа, Тайга</span> и <span className="saved-news__tags">2-м другим</span>
      </p>
    </section>
  )
}

export default SavedNews;