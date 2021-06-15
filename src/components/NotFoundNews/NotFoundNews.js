import React from 'react';
import './NotFoundNews.css';

function NotFoundNews(props) {
  return (
    <section className="notFoundNews" >
      <div className="notFoundNews__container">

        {
          props.err
            ? <>
                <p className="notFoundNews__not-fount-title" >Во время запроса произошла ошибка.</p>
                <p className="notFoundNews__not-fount-text">Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз</p>
              </>
            : <>
                <svg className="notFoundNews__not-found-icon" width="96" height="96" fill="none" xmlns="http://www.w3.org/2000/svg"
                     role="img" aria-label="Иконка с увеличительной лупой">
                  <circle cx="43" cy="43" r="36.5" stroke="#D1D2D6"/>
                  <path d="M69 69l19.5 19.5M58.33 55.96A19.95 19.95 0 0043.16 49c-6.06 0-11.5 2.7-15.16 6.96" stroke="#D1D2D6"/>
                  <circle cx="55.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
                  <circle cx="30.5" cy="33.5" r="1.5" fill="#D1D2D6"/>
                </svg>
                <p className="notFoundNews__not-fount-title" >Ничего не найдено</p>
                <p className="notFoundNews__not-fount-text">К сожалению по вашему запросу ничего не найдено.</p>
              </>
        }

      </div>
    </section>
  )
}

export default NotFoundNews;