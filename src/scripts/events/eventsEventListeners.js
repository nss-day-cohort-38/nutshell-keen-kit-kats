import renderToDom from './renderToDom.js';

// const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

const mainContainer = document.getElementById("mainContainer");

const eventsEventListeners = {
    addEventButtonEventListener() {
    
        const eventButton = document.getElementById("myEvents");

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