import React from "react";
import './Footer.css'
import {Link} from 'react-router-dom';
import gitHubPath from '../../images/github.svg'
import fbPath from '../../images/fb.svg'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
        <nav className="footer__menu">
          <ul className="footer__menu-items">
            <li className="footer__menu-item">
              <Link to="/" className="footer__link">Главная</Link>
            </li>
            <li className="footer__menu-item">
              <a href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer" className="footer__link">Яндекс Практикум</a>
            </li>
          </ul>
        </nav>
        <ul className="footer__icons">
          <li className="footer__icon-wrapper">
            <a href="https://github.com/imanovmarat/news-explorer-frontend" target="_blank" rel="noreferrer" className="footer__icon-link">
              <img className="footer__icon" src={gitHubPath} alt="иконка github"/>
            </a>
          </li>
          <li className="footer__icon-wrapper">
            <a href="https://www.facebook.com/marat.imanov/" target="_blank" rel="noreferrer" className="footer__icon-link">
              <img className="footer__icon" src={fbPath} alt="иконка facebook"/>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;