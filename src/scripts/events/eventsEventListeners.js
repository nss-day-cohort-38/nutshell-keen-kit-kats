import eventsRenderToDom from './eventsRenderToDom.js';
import dbAPI from '../dbAPI.js';

const mainContainer = document.getElementById("mainContainer");

const eventsEventListeners = {
    addEventButtonEventListener() {

        const eventButton = document.getElementById("myEvents");

        eventButton.addEventListener("click", () => {

            const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

            dbAPI.getObjectByResource("events", loggedInUserId)
                .then(() => {
                    eventsRenderToDom.renderEventContainerWithCreateEventButton()
                    eventsRenderToDom.renderEventCards()
                    eventsRenderToDom.renderFriendsEventsToDom()
                })
        })
    },
    addCreateEventButtonEventListener() {

        mainContainer.addEventListener("click", (event) => {
            if (event.target.id.startsWith("createFormButton--")) {

                eventsRenderToDom.renderEventForm();
            }
        })
    },
    addSaveEventButtonEventListener() {
        mainContainer.addEventListener("click", (event) => {
            if (event.target.id.startsWith("saveFormButton--")) {

                const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id

                const eventNameInput = document.getElementById("event_name");
                const eventDateInput = document.getElementById("event_date");
                const eventLocationInput = document.getElementById("event_location");
                const eventIdInput = document.getElementById("event_id")

                if (eventNameInput.value.length === 0 || eventDateInput.value.length === 0 || eventLocationInput.value.length === 0) {
                    alert("Please fill out all fields before saving event")
                } else {

                    const event = {
                        "userId": loggedInUserId,
                        "name": eventNameInput.value,
                        "date": eventDateInput.value,
                        "location": eventLocationInput.value
                    }

                    if (eventIdInput.value !== "") {
                        event.id = parseInt(eventIdInput.value);

                        dbAPI.putObjectByResource("events", event)
                            .then(() => {
                                eventsRenderToDom.renderEventCards()
                                eventsRenderToDom.renderFriendsEventsToDom()
                            })
                    } else {
                        dbAPI.postObjectByResource("events", event)
                            .then(() => {
                                eventsRenderToDom.renderEventCards()
                                eventsRenderToDom.renderFriendsEventsToDom()
                            })
                    }
                }

            }
        })
    },
    addDeleteEventButtonEventListener() {
        mainContainer.addEventListener("click", (event) => {
            if (event.target.id.startsWith("deleteFormButton--")) {

                if (confirm("Are you sure you want to delete this event?")) {
                    const eventIdToDelete = event.target.id.split("--")[1]

                    dbAPI.deleteObjectByResource("events", eventIdToDelete)
                        .then(() => {
                            eventsRenderToDom.renderEventCards()
                            eventsRenderToDom.renderFriendsEventsToDom()
                        })

                }
            }
        })
    },
    addEditEventButtonEventListener() {
        mainContainer.addEventListener("click", (event) => {
            if (event.target.id.startsWith("editFormButton--")) {
                const eventIdToEdit = event.target.id.split("--")[1]

                eventsRenderToDom.renderEditEventFields((eventIdToEdit))
            }
        })
    },
    addNevermindButtonEventListener() {
        mainContainer.addEventListener("click", (event) => {
            if (event.target.id.startsWith("nevermindFormButton--")) {

                eventsRenderToDom.renderEventContainerWithCreateEventButton()

                dbAPI.postObjectByResource("events", event)
                    .then(() => {
                        eventsRenderToDom.renderEventCards()
                        eventsRenderToDom.renderFriendsEventsToDom()
                    })


            }
        })
    }
}

export default eventsEventListeners;