const MAIN_API_URL = process.env.REACT_APP_MAINAPI_URL || 'http://hodgiecode.students.nomoreparties.space';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo({ token }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        'authorization': `Bearer ${ token }`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса getUserInfo');
      });
  }

  getSavedNews({ token }) {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        'authorization': `Bearer ${ token }`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса getSavedNews');
      });
  }

  addNews({ keyword,
            title,
            text,
            date,
            source,
            link,
            image,
          token }) {
    return fetch(`${this._baseUrl}/articles`, {
      method: 'POST',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${ token }`
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса addNews');
      });
  }

  removeNews(newsId,{token}) {
    return fetch(`${this._baseUrl}/articles/${newsId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${ token }`
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Ошибка запроса removeNews');
      });
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  headers: {
    // 'Authorization' : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3NGQ0MjMyN2M5NTVmOTFiOWM3YzgiLCJpYXQiOjE2MDg5OTUxNDksImV4cCI6MTYwOTU5OTk0OX0.uKSauaRpFOnV_hHXkP1pG2UNDjx0alyFk-2-cbOGWMQ`,
    'Content-Type': 'application/json'
  }
})

export default mainApi;