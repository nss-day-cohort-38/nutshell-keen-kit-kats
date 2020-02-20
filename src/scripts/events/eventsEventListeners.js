import eventsRenderToDom from './eventsRenderToDom.js';
import dbAPI from '../dbAPI.js';

const mainContainer = document.getElementById("mainContainer");

const eventsEventListeners = {
    addEventButtonEventListener() {
        const eventButton = document.getElementById("myEvents");
        eventButton.addEventListener("click", () => {
            const loggedInUserId = (JSON.parse(sessionStorage.getItem("user"))).id
            dbAPI.getObjectByResource("events", loggedInUserId)
                .then(events => {
                    const eventsSorted = events.sort((a, b) => { return new Date(a.date) - new Date(b.date) })
                    const localTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })
                    let month = localTime.split("/")[0]
                    if (month.length < 2) {
                        month = "0" + month
                    }
                    let day = localTime.split("/")[1]
                    if (day.length < 2) {
                        day = "0" + day
                    }
                    let year = localTime.split("/")[2].split(",")[0]
                    const currentDate = year + "-" + month + "-" + day
                    if (eventsSorted.length === 0) {
                        eventsRenderToDom.renderEventsContainersAndHeaders()
                        eventsRenderToDom.renderEventCards()
                        eventsRenderToDom.renderFriendsEventsToDom()
                    } else {
                        for (let i = 0; i < eventsSorted.length; i++) {
                            if (eventsSorted[i].date < currentDate) {
                                dbAPI.deleteObjectByResource("events", eventsSorted[i].id)
                                    .then(eventsRenderToDom.renderEventContainerWithCreateEventButton)
                                    .then(eventsRenderToDom.renderEventCards)
                            } else {
                                eventsRenderToDom.renderEventsContainersAndHeaders()
                                eventsRenderToDom.renderEventCards()
                            }
                        }
                        eventsRenderToDom.renderFriendsEventsToDom()
                    }
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

                const localTime = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" })

                let month = localTime.split("/")[0]

                if (month.length < 2) {
                    month = "0" + month
                }

                let day = localTime.split("/")[1]

                if (day.length < 2) {
                    day = "0" + day
                }

                let year = localTime.split("/")[2].split(",")[0]

                const currentDate = year + "-" + month + "-" + day

                const eventDate = eventDateInput.value.split("T")[0]

                if (eventNameInput.value.length === 0 || eventDateInput.value.length === 0 || eventLocationInput.value.length === 0) {
                    alert("Please fill out all fields before saving event.")
                }
                else if (eventDate < currentDate) {
                    alert("Please create a future event. Past dates are not accepted.")
                }
                else {

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

                eventsRenderToDom.renderEventsContainersAndHeaders()

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



