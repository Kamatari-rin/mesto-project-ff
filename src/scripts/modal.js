import {createCard, deleteCard, likeCard, openPopupImage} from './card';
import {cardList, content, popupAddNewCard, popupEditUserProfile, profileForm, addNewPlaceForm, openedPopup} from './index';

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    popupElement.querySelector('button').focus();
    document.addEventListener('keydown', keyHandler);
    popupElement.addEventListener('click', clickHandler);
}

function closePopup (popupElement) {
    popupElement.classList.remove('popup_is-opened');
    popupElement.removeEventListener('click', keyHandler, clickHandler);
    popupElement.removeEventListener('keydown', keyHandler, clickHandler);
}

function keyHandler(evt) {
    if (evt.key === 'Escape') closePopup(document.querySelector(".popup_is-opened"));
}

function clickHandler(evt) {
    if (!evt.target.closest('.popup__content') || evt.target.matches('.popup__close')) closePopup(evt.currentTarget);
}

export function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); 

    content.querySelector('.profile__title').textContent = profileForm.name.value;
    content.querySelector('.profile__description').textContent =  profileForm.description.value;
    
    profileForm.reset();
    closePopup(popupEditUserProfile);
}

export function handleAddNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    
    const cardData = {
            title: addNewPlaceForm.placeName.value,
            link: addNewPlaceForm.link.value
    };
    cardList.prepend(createCard(cardData, deleteCard, likeCard, openPopupImage));
    
    addNewPlaceForm.reset();
    closePopup(popupAddNewCard);
}