import { data } from 'autoprefixer';
import '../pages/index.css';
import { showCards } from './card';
import { openPopup, handleAddNewPlaceFormSubmit, handleEditProfileFormSubmit } from './modal';
import { getUser, getInitialCards } from './api';
import { enableValidation } from './validation';

export const content = document.querySelector('.page__content');
export const cardList = content.querySelector('.places__list');
export const popupOpenImage = content.querySelector('.popup_type_image');

export const popupAddNewCard = content.querySelector('.popup_type_new-card');
const addNewCardButton = content.querySelector('.profile__add-button');

export const popupEditUserProfile = content.querySelector('.popup_type_edit');
const editUserProfileButton = content.querySelector('.profile__edit-button');

export const profileForm = document.forms.editProfile;
export const addNewPlaceForm = document.forms.newPlace;

export const initialCards = getInitialCards();
// export const userId = document.querySelector('.profile__info').getAttribute('profile-id');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function loadUserProfile() {
    getUser()
        .then(userData => {
            content.querySelector('.profile__title').textContent = userData.name;
            content.querySelector('.profile__description').textContent = userData.about;
            content.querySelector('.profile__image').style.backgroundImage = userData.avatar;
            content.querySelector('.profile__info').setAttribute('profile-id', userData._id);
        });
}

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
addNewPlaceForm.addEventListener('submit', handleAddNewPlaceFormSubmit);
addNewCardButton.addEventListener('click', evt => openPopup(popupAddNewCard));
editUserProfileButton.addEventListener('click', evt => {
    profileForm.name.value = content.querySelector('.profile__title').textContent;
    profileForm.description.value = content.querySelector('.profile__description').textContent;
    openPopup(popupEditUserProfile);
});

loadUserProfile();
showCards();
enableValidation();