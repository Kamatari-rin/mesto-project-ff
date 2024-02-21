
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: 'e0f9c3f5-2980-4789-b680-32f24bc3818e',
      'Content-Type': 'application/json'
    }
  }

  function handleResponse(promise) {
    if (promise.ok) return promise.json();
    else return Promise.reject(`Ошибка: ${promise.status}`);
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    }).then(result => handleResponse(result));
  }

  export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      }).then(result => handleResponse(result));
  }

  export const updateUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
    }).then(result => handleResponse(result));
  }

  export const updateUserAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
          avatar: url
      })
    }).then(result => handleResponse(result)); 
  }

  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    }).then(result => handleResponse(result));
  }

  export const deleteCardById = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(result => handleResponse(result));;
  }

  export const tuggleLike = (cardId, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: config.headers
    }).then(result => handleResponse(result));
  }
