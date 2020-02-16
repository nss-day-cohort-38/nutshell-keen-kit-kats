import eventHtmlComponents from './eventHtmlComponents.js';

const renderToDom = {
    renderCreateButton() {
        const mainContainer = document.getElementById("mainContainer");

        mainContainer.innerHTML += eventHtmlComponents.createEventFormButton()
    }
}

export default renderToDom;