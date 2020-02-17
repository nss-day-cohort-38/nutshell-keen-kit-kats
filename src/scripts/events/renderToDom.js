import eventHtmlComponents from './eventHtmlComponents.js';
import dbAPI from './dbAPI.js';
import eventsEventListeners from './eventsEventListeners.js';

const mainContainer = document.getElementById("mainContainer");

const createEventContainer = document.getElementById("createFormContainer--events");

const eventCardsContainer = document.getElementById("objCards--events");

const renderToDom = {
    renderEventContainerWithCreateEventButton() {

        mainContainer.innerHTML += eventHtmlComponents.createEventContainerWithCreateEventButton()
    },
    renderEventForm() {
        
        createEventContainer.innerHTML += eventHtmlComponents.createEventForm();

    },
    renderEventCardsContainer() {

        mainContainer.innerHTML += eventHtmlComponents.renderEventCardsContainer();

    },
    renderEventCardsContainerHeader() {

        eventCardsContainer.innerHTML += 
        eventHtmlComponents.createEventCardsContainerHeader();

    },
    renderNoEventsMessage() {

        eventCardsContainer.innerHTML += eventHtmlComponents.createNoEventsMessage();

    },
    renderEventCards(events, userId) {

        dbAPI.getObjectByResource(events, `${userId}`)
            .then(events => {
                eventCardsContainer.innerHTML = "";

                eventCardsContainer.innerHTML += eventHtmlComponents.createEventCardsContainerHeader();

                events.forEach(event =>
                    eventCardsContainer.innerHTML += eventHtmlComponents.createEventCard(event))
            })      
    }
}

export default renderToDom;