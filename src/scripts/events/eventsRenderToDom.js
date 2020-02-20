import eventHtmlComponents from './eventHtmlComponents.js';
import dbAPI from '../dbAPI.js';

const mainContainer = document.getElementById("mainContainer");

const eventsRenderToDom = {
    renderEventsContainersAndHeaders() {

        mainContainer.innerHTML = eventHtmlComponents.createEventsContainersAndHeaders()
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

                // below conditional checks to see if there are any events in the events array 

                if (events.length === 0) {

                    // if events array is empty, print no events message
                    
                    eventsRenderToDom.renderEventsContainersAndHeaders()

                    eventsRenderToDom.renderNoEventsMessage()

                } else {

                    // if events array is not empty, render event cards

                    eventsRenderToDom.renderEventsContainersAndHeaders()

                    const eventCardsContainer = document.getElementById("objCards--events");

                    // the below array method sorts the events by their dates and orders them to display the most upcoming date first

                    const eventsSorted = events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })

                    // the below for loop creates a unique event card with specific styling to just the most upcoming event and applies the standard event card to all other events

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