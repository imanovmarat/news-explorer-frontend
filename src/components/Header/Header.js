import React from "react";
import './Header.css';

import Button from "../Button/Button";
import {Link, NavLink, Route, useLocation} from "react-router-dom";

function Header({ OpenSignInPopup, isSomeonePopupOpen }) {
  const location = useLocation();
  const path = location.pathname;

  const [isOpenMenu, setIsOpenMenu] = React.useState(false);

  const handleCloseMenu = () => {
    setIsOpenMenu(false)
  }

  let menuButton;
  if (isOpenMenu) {
    menuButton = <Button onClick={ handleCloseMenu } className="header__close-button"/>
  } else {
    menuButton = <Button onClick={ () => { setIsOpenMenu(true) } } className={`header__menu-button ${path === '/saved-news' ? "header__menu-button_color_dark" : ""}`} />
  }

  return (
    <header className={ `header ${path === '/' || isOpenMenu  ? "header_text-color_white" : ""}` }>
      <nav className={`header__wrapper ${isOpenMenu ? "header__wrapper_background_dark" : ""}`}>
        <Link to="/" className="header__title">NewsExplorer</Link>
        { !isSomeonePopupOpen && menuButton }
        <ul className={ isOpenMenu ? "header__links header__links_show" : "header__links" }>
          <li className="header__link-wrapper">
            <NavLink onClick={handleCloseMenu}  exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
          </li>
          <li className="header__link-wrapper">
            <NavLink onClick={handleCloseMenu} to="/saved-news" className="header__link" activeClassName="header__link_active">Сохранённые статьи</NavLink>
          </li>
          <Route exact path="/">
            <Button className="header_button" onClick={
              () => {
                handleCloseMenu();
                OpenSignInPopup();
              }
            }>Авторизоваться</Button>
          </Route>
          <Route path='/saved-news'>
            <Button className="header_button">
              Грета
              <svg width="24" height="24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10 6H6v12h4v2H6a2 2 0 01-2-2V6c0-1.1.9-2 2-2h4v2zm7.59 7l-4.3 4.13 1.42 1.37 6.7-6.46-6.7-6.46-1.42 1.36 4.3 4.13H8V13h9.59z" fill={isOpenMenu ? "#fff" : "#1A1B22"}/>
              </svg>
            </Button>
          </Route>
        </ul>
      </nav>
    </header>
  )
}

export default Header;