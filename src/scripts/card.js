import { data } from 'autoprefixer';
import { cardList } from './index';
import { tuggleLike, deleteCardById } from './api';

export function createCard(cardData, deleteCard, likeCard, openPopupImage, userId) {
    console.log(userId);
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const deleteButton = cardElement.querySelector(".card__delete-button");

    if (userId === cardData.owner._id) {
        deleteButton.addEventListener("click", deleteCard);
    } else deleteButton.remove();

    renderCard(cardElement, cardData, userId);
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCounter = cardElement.querySelector(".card__likes")

    likeButton.addEventListener("click", () => likeCard(likeButton, likeCounter, cardData._id));

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener("click", () => openPopupImage(cardData));
        
    return cardElement;
}

export function addCard(item) {
    cardList.append(item);
}
        
export function deleteCard(evt) {
    const cardId = evt.target.closest(".card").getAttribute('card-id');
    deleteCardById(cardId);
    evt.target.closest(".card").remove();
}

export function likeCard(likeButton, likeCounter, cardId) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active') ? true : false;
    tuggleLike(cardId, isLiked).then(updatedCard => {
        updateLikes(updatedCard, likeButton, likeCounter);
    });
}

function updateLikes(cardData, likeButton, likeCounter) {
    likeButton.classList.toggle('card__like-button_is-active');
    likeCounter.textContent = cardData.likes.length;
}

function renderCard(cardElement, cardData, userId) {
    const hasUserLike = cardData.likes.some(user => user._id === userId);

    cardElement.setAttribute('card-id', cardData._id);
    cardElement.querySelector(".card__title").textContent = cardData.name;    
    cardElement.querySelector(".card__image").src = cardData.link;
    cardElement.querySelector(".card__image").alt = cardData.name;
    cardElement.querySelector(".card__likes").textContent = cardData.likes.length;
    cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_is-active', hasUserLike);
}

