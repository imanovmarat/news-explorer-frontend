import React from "react";
import './Header.css';

import Button from "../Button/Button";
import {Link, NavLink, useRouteMatch} from "react-router-dom";

function Header() {
  const { path, url} = useRouteMatch();
  console.log(url)
  console.log(path)
  return (
    <header className={`header ${path === '/saved-news' && 'header_text-color_white'}`}>
      <nav className="header__wrapper">
        <Link to="/" className="header__title">NewsExplorer</Link>
        <ul className="header__links">
          <li className="header__link-wrapper">
            <NavLink exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
          </li>
          <li className="header__link-wrapper">
            <NavLink to="/saved-news" className="header__link" activeClassName="header__link_active">Сохранённые статьи</NavLink>
          </li>
          <Button className="header_button">
            Грета
            <svg width="24" height="24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10 6H6v12h4v2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2h4v2zm7.59 7l-4.3 4.13 1.42 1.37 6.7-6.46-6.7-6.46-1.42 1.36 4.3 4.13H8V13h9.59z" fill="#fff"/></svg>
          </Button>
        </ul>
      </nav>
    </header>
  )
}

export default Header;