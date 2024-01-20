import { data } from 'autoprefixer';
import '../pages/index.css';
import { initialCards } from './cards';
import { showCards } from './card';
import { openPopup, handleAddNewPlaceFormSubmit, handleEditProfileFormSubmit } from './modal';

export const content = document.querySelector('.page__content');
export const cardList = content.querySelector('.places__list');
export const popupAddNewCard = content.querySelector('.popup_type_new-card');
const addNewCardButton = content.querySelector('.profile__add-button');
export const popupEditUserProfile = content.querySelector('.popup_type_edit');
const editUserProfileButton = content.querySelector('.profile__edit-button');
export const popupOpenImage = content.querySelector('.popup_type_image');
export const profileForm = document.forms.editProfile;
export const addNewPlaceForm = document.forms.newPlace;

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
addNewPlaceForm.addEventListener('submit', handleAddNewPlaceFormSubmit);
addNewCardButton.addEventListener('click', evt => openPopup(popupAddNewCard));
editUserProfileButton.addEventListener('click', evt => {
    profileForm.name.value = content.querySelector('.profile__title').textContent;
    profileForm.description.value = content.querySelector('.profile__description').textContent;
    openPopup(popupEditUserProfile);
});

showCards(initialCards);