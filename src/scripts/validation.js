import { validationConfig } from "./index";

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
            evt.preventDefault();
        });

        setEventListener(formElement);
    })
}

function setEventListener(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    toggleSubmitButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleSubmitButtonState(inputList, buttonElement);

        });
    });
}

function checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else inputElement.setCustomValidity("");
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(input => {
        return !input.validity.valid;
    });
}

function toggleSubmitButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

export function clearValidation(formElement) {
    const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    
    inputList.forEach(input => {
        hideInputError(formElement, input);
    });

    toggleSubmitButtonState(inputList, buttonElement);
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}