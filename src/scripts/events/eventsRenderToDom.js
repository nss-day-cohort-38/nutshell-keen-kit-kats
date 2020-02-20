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

                if (events.length === 0) {
                    eventsRenderToDom.renderEventContainerWithCreateEventButton()

                    eventsRenderToDom.renderNoEventsMessage()

                } else {

                    eventsRenderToDom.renderEventContainerWithCreateEventButton()

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
    },
    renderFriendsEventsToDom(){
        const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id;

        dbAPI.getFriends(currentUserId).then(friendDataArray => {
            friendDataArray.forEach(friendObj => {
                const friendId = friendObj.user.id
                dbAPI.getObjectByResource('events', friendId)
                    .then(friendsEvents=> {
                        const friendsEventsContainer = document.getElementById('friendsEventsContainer')
                        friendsEventsContainer.innerHTML += `<h1 class ="objCards friendCardName">${friendObj.user.username}'s Events</h1>`
                        friendsEvents.forEach(friendEvent => {
                        friendsEventsContainer.innerHTML += eventHtmlComponents.createFriendEventCard(friendEvent)
                        })
                    })
                
            })
        });
    }
}

export default eventsRenderToDom;