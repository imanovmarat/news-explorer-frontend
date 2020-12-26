import React from "react";
import './SearchForm.css';
import Button from "../Button/Button";

function SearchForm({ onSubmit, onChange, word }) {


  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(word);
  }

  return (
    <section className="lead">
      <h1 className="lead__heading">Сервис для поиска и сохранения новостей</h1>
      <div className="lead__container">
        <p className="lead__title">Что творится в мире?</p>
        <p className="lead__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <form className="lead__search-form" onSubmit={handleSubmit}>
          <input className="lead__input" type="search" placeholder="Введите тему новости"  value={word} onChange={onChange} />
          <Button type="search">Искать</Button>
        </form>
      </div>
    </section>

  )
}

export default SearchForm;