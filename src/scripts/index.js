import { data } from 'autoprefixer';
import '../pages/index.css';
import { initialCards } from './cards';
import {openPopup, handleAddNewPlaceFormSubmit, handleEditProfileFormSubmit} from './modal';
import { showCards } from './cards';

export const content = document.querySelector('.page__content');
export const cardList = content.querySelector('.places__list');
export const popupAddNewCard = content.querySelector('.popup_type_new-card');
export const popupEditUserProfile = content.querySelector('.popup_type_edit');
export const popupOpenImage = content.querySelector('.popup_type_image');
export const profileForm = document.forms.editProfile;
export const addNewPlaceForm = document.forms.newPlace;

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
addNewPlaceForm.addEventListener('submit', handleAddNewPlaceFormSubmit);

content.addEventListener('click', evt => {
    if (evt.target.classList.contains('profile__add-button')) openPopup(popupAddNewCard);
    else if (evt.target.classList.contains('profile__edit-button')) openPopup(popupEditUserProfile);
});

showCards(initialCards);