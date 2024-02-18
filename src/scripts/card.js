import { data } from 'autoprefixer';
import { cardList, popupOpenImage, initialCards } from './index';
import { openPopup } from './modal';
import { tuggleLike, } from './api';


export function showCards () {
    console.log()
    initialCards.then(cards => {
        cards.forEach(function (cardData) {
            addCard(createCard(cardData, deleteCard, likeCard, openPopupImage))
        });
    })
}

export function createCard(cardData, deleteCard, likeCard, openPopupImage) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const userId = document.querySelector('.profile__info').getAttribute('profile-id');
    
    renderCard(cardElement, cardData, userId);

    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const isCardIsLiked = JSON.parse(cardElement.getAttribute('is-liked'));
    
    if (userId === cardData.owner._id) {
        console.log(cardData.owner._id);
        deleteButton.addEventListener("click", deleteCard);
    } else deleteButton.remove();

    likeButton.addEventListener("click", () => likeCard(likeButton, cardData._id, isCardIsLiked));

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener("click", () => openPopupImage(cardData));
        
    return cardElement;
}


function addCard(item) {
    cardList.append(item);
}
        
export function deleteCard(evt) {
    evt.target.closest(".card").remove();
}

export function likeCard(likeButton, cardId, isLiked) {
    likeButton.classList.toggle('card__like-button_is-active');
    return tuggleLike(cardId, isLiked);
}

function renderCard(cardElement, cardData, userId) {
    const hasUserLike = cardData.likes.some((user) => user._id === userId);
    cardElement.setAttribute('card-id', cardData._id);
    cardElement.querySelector(".card__title").textContent = cardData.name;    
    cardElement.querySelector(".card__image").src = cardData.link;
    cardElement.querySelector(".card__image").alt = cardData.name;
    cardElement.setAttribute('is-liked', JSON.stringify(hasUserLike));
    cardElement.querySelector(".card__likes").textContent = cardData.likes.length;
    
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active', hasUserLike);
}

export function openPopupImage(cardData) {
    popupOpenImage.querySelector('.popup__image').src = cardData.link;
    popupOpenImage.querySelector('.popup__image').alt = cardData.title;
    popupOpenImage.querySelector('.popup__caption').textContent = cardData.title;
    openPopup(popupOpenImage);
}