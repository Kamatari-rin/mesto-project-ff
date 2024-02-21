import { data } from 'autoprefixer';
import '../pages/index.css';
import { addCard, createCard, deleteCard, likeCard, openPopupImage } from './card';
import { openPopup, closePopup } from './modal';
import { getUser, getInitialCards, updateUserProfile, addNewCard, updateUserAvatar } from './api';
import { enableValidation } from './validation';

export const content = document.querySelector('.page__content');
export const cardList = content.querySelector('.places__list');
export const popupOpenImage = content.querySelector('.popup_type_image');

export const popupAddNewCard = content.querySelector('.popup_type_new-card');
export const popupEditUserProfile = content.querySelector('.popup_type_edit');
export const popupEditAvatar = content.querySelector('.popup_type_avatar-edit');

export const profileForm = document.forms.editProfile;
export const addNewPlaceForm = document.forms.newPlace;
export const editAvatarForm = document.forms.editAvatar;

const addNewCardButton = content.querySelector('.profile__add-button');
const editUserProfileButton = content.querySelector('.profile__edit-button');
const avatar = content.querySelector('.profile__image');

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

function loadInitialData() {
    Promise.all([getUser(), getInitialCards()]).then(result => {
        content.querySelector('.profile__title').textContent = result[0].name;
        content.querySelector('.profile__description').textContent = result[0].about;
        avatar.style.backgroundImage = `url('${result[0].avatar}')`;

        showCards(result[1], result[0]._id);
    })
}

profileForm.addEventListener('submit', handleEditProfileFormSubmit);
avatar.addEventListener('click', evt => openPopup(popupEditAvatar));
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);

addNewPlaceForm.addEventListener('submit', handleAddNewPlaceFormSubmit);
addNewCardButton.addEventListener('click', evt => openPopup(popupAddNewCard));
editUserProfileButton.addEventListener('click', evt => {
    profileForm.name.value = content.querySelector('.profile__title').textContent;
    profileForm.description.value = content.querySelector('.profile__description').textContent;
    openPopup(popupEditUserProfile);
});

function handleEditProfileFormSubmit(evt) {
    preparingFormForSubmit(evt, profileForm)

    updateUserProfile(profileForm.name.value, profileForm.description.value)
        .then(updatedProfile => {
            content.querySelector('.profile__title').textContent = updatedProfile.name;
            content.querySelector('.profile__description').textContent =  updatedProfile.about;
        });

    profileForm.reset();
    profileForm.querySelector('button[type="submit"]').textContent = "Сохранение";  
    closePopup(popupEditUserProfile);
}

function handleEditAvatarFormSubmit(evt) {
    preparingFormForSubmit(evt, editAvatarForm);

    updateUserAvatar(editAvatarForm.url.value)
        .then(result => {
            avatar.style.backgroundImage = `url('${result.avatar}')`;
        });
    editAvatarForm.reset();
    editAvatarForm.querySelector('button[type="submit"]').textContent = "Сохранение";
    closePopup(popupEditAvatar);     
}

function handleAddNewPlaceFormSubmit(evt) {
    preparingFormForSubmit(evt, addNewPlaceForm);

    Promise.all([getUser(), addNewCard(addNewPlaceForm.placeName.value, addNewPlaceForm.link.value)])
        .then(result => {
            cardList.prepend(createCard(result[1], deleteCard, likeCard, openPopupImage, result[0]._id));
            addNewPlaceForm.reset();
        });

    addNewPlaceForm.querySelector('button[type="submit"]').textContent = "Сохранение";    
    closePopup(popupAddNewCard);
}

function preparingFormForSubmit(evt, formElement) {
    evt.preventDefault();
    formElement.querySelector('button[type="submit"]').textContent = "Сохранение...";
}

function showCards (cards, userId) {
    cards.forEach(function (cardData) {
        addCard(createCard(cardData, deleteCard, likeCard, openPopupImage, userId))
    });
}

loadInitialData();
enableValidation(validationConfig);