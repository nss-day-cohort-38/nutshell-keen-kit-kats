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
    renderEventCardsContainer() {

        mainContainer.innerHTML +=
            eventHtmlComponents.createEventCardsContainer();

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

                const todayDate = new Date().toISOString().slice(0, 10);

                const pastEventIdToDelete = events.date

                if (events.length === 0) {
                    eventsRenderToDom.renderEventContainerWithCreateEventButton()

                    eventsRenderToDom.renderEventCardsContainer()

                    eventsRenderToDom.renderNoEventsMessage()

                } else if (pastEventIdToDelete < todayDate) {

                    dbAPI.deleteObjectByResource("events", event.date)
                        .then(eventsRenderToDom.renderEventCards)

                } else {

                    eventsRenderToDom.renderEventContainerWithCreateEventButton()

                    eventsRenderToDom.renderEventCardsContainer()

                    const eventCardsContainer = document.getElementById("objCards--events");

                    const eventsSorted = events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })


                    for (let i = 0; i < eventsSorted.length; i++) {
                        let firstCard = eventsSorted[0]
                        if (eventsSorted[i] === firstCard) {
                            eventCardsContainer.innerHTML += eventHtmlComponents.createFirstEventCard(firstCard)
                        } else {
                            eventCardsContainer.innerHTML += eventHtmlComponents.createEventCard(eventsSorted[i])
                        }
                    }
                }
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