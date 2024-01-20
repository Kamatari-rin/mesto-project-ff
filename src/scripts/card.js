import { cardList, popupOpenImage } from './index';
import { openPopup } from './modal';
import { initialCards } from './cards';

export function showCards () {
    initialCards.forEach(function (cardData) {
        addCard(createCard(cardData, deleteCard, likeCard, openPopupImage))
    });
}

export function createCard(cardData, deleteCard, likeCard, openPopupImage) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = cardData.title;    
    cardElement.querySelector(".card__image").src = cardData.link;
    cardElement.querySelector(".card__image").alt = cardData.title;
    
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener("click", () => likeCard(likeButton));

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

export function likeCard(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
}

export function openPopupImage(cardData) {
    popupOpenImage.querySelector('.popup__image').src = cardData.link;
    popupOpenImage.querySelector('.popup__image').alt = cardData.title;
    popupOpenImage.querySelector('.popup__caption').textContent = cardData.title;
    openPopup(popupOpenImage);
}