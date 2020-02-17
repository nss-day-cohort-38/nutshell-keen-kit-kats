import eventHtmlComponents from './eventHtmlComponents.js';
import dbAPI from '../dbAPI.js';

const mainContainer = document.getElementById("mainContainer");

const eventCardsContainer = document.getElementById("objCards--events");

const renderToDom = {
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

        eventCardsContainer.innerHTML += eventHtmlComponents.createNoEventsMessage();

    },
    renderEventCards() {
        const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

        dbAPI.getObjectByResource("events", loggedInUserId)
            .then(events => {
            mainContainer.innerHTML = ""; 

            renderToDom.renderEventContainerWithCreateEventButton()

            renderToDom.renderEventCardsContainerHeader()
            
            events.forEach(event => mainContainer.innerHTML += eventHtmlComponents.createEventCard(event))
        })
    }
}

export default renderToDom;