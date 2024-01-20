import {cardList, popupOpenImage} from './index';
import { openPopup } from './modal';

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
    
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", deleteCard);

    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener("click", likeCard);
    cardElement.addEventListener("click", openPopupImage);
        
    return cardElement;
}

function addCard(item) {
    cardList.append(item);
}
        
export function deleteCard(event) {
    event.target.closest(".card").remove();
}

export function likeCard(evt) {
  evt.srcElement.classList.toggle('card__like-button_is-active');
}

export function openPopupImage(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupOpenImage.querySelector('.popup__image').src = evt.srcElement.src;
    popupOpenImage.querySelector('.popup__caption').textContent = evt.target.parentElement.querySelector('.card__title').textContent;
    openPopup(popupOpenImage);
  };
}

export const initialCards = [
  {
    title: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    title: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    title: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    title: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    title: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    title: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];