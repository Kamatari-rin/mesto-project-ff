
const cardList = document.querySelector('.places__list');

function showCards () {
    initialCards.forEach(function (cardData) {
        addCard(createCard(cardData, deleteCard))
    });
}

function createCard(cardData, deleteCard) {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
        
    cardElement.querySelector(".card__image").src = cardData.link;
    cardElement.querySelector(".card__title").textContent = cardData.title;
        
    const deleteButton = cardElement.querySelector(".card__delete-button");
    deleteButton.addEventListener("click", item => deleteCard(item));
        
    return cardElement;
}

function addCard(item) {
    cardList.append(item);
}
        
function deleteCard(event) {
    event.target.closest(".card").remove();
}

showCards(initialCards);  
