import React from "react";
import './Header.css';

import Button from "../Button/Button";
import {Link, NavLink, Route, useLocation} from "react-router-dom";
import MenuIcon from "../Icons/MenuIcon";
import CloseIcon from "../Icons/CloseIcon";
import SignOut from "../Icons/SignOut";

function Header({isAuthorized, OpenSignInPopup, isSomeonePopupOpen }) {
  const location = useLocation();
  const path = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const defineHeaderClass = (path, isMenuOpen) => {
    if (path === '/' || isMenuOpen) return 'header header_text_white';
    return 'header'
  }

  const defineMenuIconFill = (path) => {
    if (path === '/saved-news') return '#1A1B22';
  }

  const defineSignOutFill = (isMenuOpen) => {
    if (isMenuOpen) return '#fff';
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const handleOpenMenu = () => {
    setIsMenuOpen(true)
  }


  return (
    <header className={defineHeaderClass(path, isMenuOpen)}>
      <nav className={`header__wrapper ${isMenuOpen ? "header__wrapper_background_dark" : ""}`}>
        <Link to="/" className="header__title">NewsExplorer</Link>
        { !isSomeonePopupOpen && ( isMenuOpen
          ? <Button type="close" onClick={handleCloseMenu}><CloseIcon /></Button>
          : <Button type="hamburger" onClick={handleOpenMenu}><MenuIcon fill={ defineMenuIconFill(path) } /></Button> )
        }
        <ul className={ isMenuOpen ? "header__links header__links_show" : "header__links" }>
          <li className="header__link-wrapper">
            <NavLink onClick={handleCloseMenu}  exact to="/" className="header__link" activeClassName="header__link_active">Главная</NavLink>
          </li>
          { isAuthorized &&
            <li className="header__link-wrapper">
            <NavLink onClick={handleCloseMenu} to="/saved-news" className="header__link"
                     activeClassName="header__link_active">Сохранённые статьи</NavLink>
          </li>
          }
          <Route exact path="/">
            <Button type="inside-menu" onClick={() => {
                handleCloseMenu();
                OpenSignInPopup();
              }}>
              Авторизоваться
            </Button>
          </Route>
          <Route path='/saved-news'>
            <Button type="inside-menu">Грета<SignOut fill={defineSignOutFill(isMenuOpen)} /></Button>
          </Route>
        </ul>
      </nav>
    </header>
  )
}

export default Header;