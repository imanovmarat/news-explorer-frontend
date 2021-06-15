const BASE_URL = process.env.REACT_APP_MAINAPI_URL || 'http://hodgiecode.students.nomoreparties.space';

export const singUp = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'email': email,
      'password': password,
      'name': name
    })
  })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return res.json().then(err => Promise.reject(err.message))
      // return Promise.reject( 'Ошибка запроса на регистрацию ');
    })
    .then((res) => res);
}

export const singIn = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return res.json().then(err => Promise.reject(err.message))
      // return Promise.reject('Ошибка запроса на аутентификацию ');
    })
    .then((res) => res);
}

export const tokenCheck = ({ token }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
    .then((res) => {
      if(res.ok){
        return res.json();
      }
      return Promise.reject('Ошибка запроса с токеном ');
    })
    .then((res) => res);
}