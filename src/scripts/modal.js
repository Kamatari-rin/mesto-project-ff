import { validationConfig } from './index';
import { clearValidation } from './validation';

export function openPopup(popupElement) {
    clearValidation(popupElement, validationConfig);
    popupElement.classList.add('popup_is-opened');
    popupElement.querySelector('button').focus();
    document.addEventListener('keydown', keyHandler);
    popupElement.addEventListener('click', clickHandler);
}

export function closePopup (popupElement) {
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
