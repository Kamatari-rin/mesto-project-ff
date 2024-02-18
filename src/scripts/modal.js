import {createCard, deleteCard, likeCard, openPopupImage} from './card';
import {cardList, content, popupAddNewCard, popupEditUserProfile, profileForm, addNewPlaceForm, validationConfig} from './index';
import { updateUserProfile, addNewCard } from './api';
import { clearValidation } from './validation';

export function openPopup(popupElement) {
    // console.log(popupElement.querySelector(validationConfig.formSelector));
    // clearValidation(popupElement.querySelector(validationConfig.formSelector));
    popupElement.classList.add('popup_is-opened');
    popupElement.querySelector('button').focus();
    document.addEventListener('keydown', keyHandler);
    popupElement.addEventListener('click', clickHandler);
}

function closePopup (popupElement) {
    popupElement.classList.remove('popup_is-opened');
    popupElement.removeEventListener('click', clickHandler);
    popupElement.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
    if (evt.key === 'Escape') closePopup(document.querySelector(".popup_is-opened"));
}

function clickHandler(evt) {
    if (!evt.target.closest('.popup__content') || evt.target.matches('.popup__close')) closePopup(evt.currentTarget);
}

export function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); 

    updateUserProfile(profileForm.name.value, profileForm.description.value);
    content.querySelector('.profile__title').textContent = profileForm.name.value;
    content.querySelector('.profile__description').textContent =  profileForm.description.value;
    
    profileForm.reset();
    closePopup(popupEditUserProfile);
}

export function handleAddNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    
    addNewCard(addNewPlaceForm.placeName.value, addNewPlaceForm.link.value)
        .then(res => {
            cardList.prepend(createCard(res, deleteCard, likeCard, openPopupImage));
            addNewPlaceForm.reset();
        });

    closePopup(popupAddNewCard);
}