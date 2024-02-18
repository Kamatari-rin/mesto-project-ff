

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
    headers: {
      authorization: 'e0f9c3f5-2980-4789-b680-32f24bc3818e',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) return res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
        .then(res => {
          if (res.ok) return res.json();
          return Promise.reject(`Ошибка: ${res.status}`);
        }) 
  }

  export const updateUserProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })      
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })        
        .then(res => {
            if (res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  export const tuggleLike = (cardId, isLiked) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: config.headers
    })
        .then(res => {
            if(res.ok) return res.json();
            return Promise.reject(`Ошибка: ${res.status}`);
        });
  }
