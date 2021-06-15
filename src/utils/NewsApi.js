const newsApiUrl = process.env.REACT_APP_NEWSAPI_URL || 'https://nomoreparties.co/news';


class NewsApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  getNews({ token, keyword }) {
    const date = new Date();
    const currentDate = date.toISOString().slice(0, 10);
    date.setDate(date.getDate() - 7);
    const finalDate = date.toISOString().slice(0, 10);

    return fetch(
      `${this._baseUrl}/v2/everything?q=${keyword}&from=${finalDate}&to=${currentDate}&pageSize=100&apiKey=${ token }`,
      {
        headers: {
          ...this._headers,
          'authorization': `Bearer ${ token }`
        }
      })
      .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject('Ошибка запроса getNews');
    });
  }
}

const newsApi = new NewsApi({
  baseUrl: newsApiUrl,
  headers: {

  }
})

export default newsApi