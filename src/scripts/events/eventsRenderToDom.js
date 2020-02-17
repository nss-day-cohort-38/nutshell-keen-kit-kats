import eventHtmlComponents from './eventHtmlComponents.js';
import dbAPI from '../dbAPI.js';

const mainContainer = document.getElementById("mainContainer");

const eventsRenderToDom = {
    renderEventContainerWithCreateEventButton() {

        mainContainer.innerHTML = eventHtmlComponents.createEventContainerWithCreateEventButton()
    },
    renderEventForm() {

        const formContainer = document.getElementById("createFormContainer--events")
        
        formContainer.innerHTML = eventHtmlComponents.createEventForm();

    },
    renderEventCardsContainerHeader() {

        mainContainer.innerHTML += 
        eventHtmlComponents.createEventCardsContainerHeader();

    },
    renderNoEventsMessage() {

        const eventCardsContainer = document.getElementById("objCards--events");

        eventCardsContainer.innerHTML += eventHtmlComponents.createNoEventsMessage();

    },
    renderEventCards() {
        const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

        dbAPI.getObjectByResource("events", loggedInUserId)
            .then(events => {
            mainContainer.innerHTML = ""; 

            eventsRenderToDom.renderEventContainerWithCreateEventButton()

            eventsRenderToDom.renderEventCardsContainerHeader()

            const eventCardsContainer = document.getElementById("objCards--events");
            
            events.forEach(event => eventCardsContainer.innerHTML += eventHtmlComponents.createEventCard(event))
        })
    },
    renderEditEventFields(eventId) {

        const eventDiv = document.getElementById(`cards--${eventId}`)

        eventDiv.innerHTML = eventHtmlComponents.createEditEventForm(event)
    }
}

export default eventsRenderToDom;