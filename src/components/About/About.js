import React from "react";
import './About.css';
import photoPath from '../../images/photo.jpeg'

function About() {
  return(
    <section className="author">
      <figure className="author__container">
        <div className="author__image-wrapper">
          <img src={photoPath} alt="Фотография" className="author__image" width="464" height="464"/>
        </div>
        <figcaption className="author__description">
          <h3 className="author__title">Об авторе</h3>
          <p className="author__text">
            Это блок с описанием автора проекта. Здесь следует указать, как вас зовут, чем вы занимаетесь, какими технологиями разработки владеете.
            <br/><br/>Также можно рассказать о процессе обучения в Практикуме, чему вы тут научились, и чем можете помочь потенциальным заказчикам.
          </p>
        </figcaption>
      </figure>
    </section>
  )
}

export default About;