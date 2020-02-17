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

        const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

        const eventDiv = document.getElementById(`cards--${eventId}`)

        dbAPI.getObjectByResource("events", loggedInUserId)
            .then(events => {
                const filteredEvents = events.filter(event => {
                    return event.id === parseInt(eventId)
                })

                eventDiv.innerHTML = eventHtmlComponents.createEditEventForm(filteredEvents[0])
            })
    }
}

export default eventsRenderToDom;