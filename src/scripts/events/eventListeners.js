import renderToDom from './renderToDom.js';

const eventsEventListeners = {
    addEventButtonEventListener(userId) {

        const eventButton = document.getElementById(`myEvents-${userId}`);

        eventButton.addEventListener("click", () => {

            renderToDom.renderEventContainerWithCreateEventButton()
        })
    },
    addCreateEventButtonEventListener() {
        
        const createEventButton = document.getElementById("createFormButton--events");


        createEventButton.addEventListener("click", (event) => {
            // createEventContainer.innerHTML = "";

            renderToDom.renderEventForm();

        })
    }
    
}

export default eventsEventListeners;