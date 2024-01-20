import {createCard, deleteCard, likeCard, openPopupImage} from './cards';
import {} from './cards';
import {cardList, content, popupAddNewCard, popupEditUserProfile, profileForm, addNewPlaceForm} from './index';

export function openPopup(data) {
    data.classList.add('popup_is-opened');
    data.querySelector('button').focus();
    data.addEventListener('keydown', keyHandler);
    data.addEventListener('click', keyHandler);
}

function closePopup (data) {
    data.classList.remove('popup_is-opened');
    data.removeEventListener('click', keyHandler);
    data.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
    if (!evt.target.closest('.popup__content') || evt.target.matches('.popup__close')) closePopup(this);
    if (evt.key === 'Escape') closePopup(this);
}

export function handleEditProfileFormSubmit(evt) {
    evt.preventDefault(); 
    content.querySelector('.profile__title').textContent = profileForm.name.value;
    content.querySelector('.profile__description').textContent =  profileForm.description.value;
    profileForm.name.value = "";
    profileForm.description.value = "";
    closePopup(popupEditUserProfile);
}

export function handleAddNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    
    const cardData = {
            title: addNewPlaceForm.placeName.value,
            link: addNewPlaceForm.link.value
    };
    cardList.prepend(createCard(cardData, deleteCard, likeCard, openPopupImage));
    
    addNewPlaceForm.placeName.value = "";
    addNewPlaceForm.link.value = "";
    closePopup(popupAddNewCard);
}