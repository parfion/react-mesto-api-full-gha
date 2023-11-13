export const BASE_URL = 'https://mesto.parfion.nomoredomainsrocks.ru/api';

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password}),
    })
    .then((res) => checkResponse(res))
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password}),
    })
    .then((res) => checkResponse(res))
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    },
    })
    .then((res) => checkResponse(res))
};