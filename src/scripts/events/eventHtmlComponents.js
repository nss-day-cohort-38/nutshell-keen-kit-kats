const eventHtmlComponents = {
    createEventContainerWithCreateEventButton() {
        return `
        <article class="createFormContainer" id="createFormContainer--events">

        <button class="createFormButton" id="createFormButton--events">Create Event</button>
            
        </article>
        `
    },
    createEventForm() {
        return `
        <input type="hidden" id="event_id" value=""/>

        <input type="hidden" id="event_userId" value=""/>

        <fieldset>
            <input type="text" id="event_name" class="form_input" placeholder="Event Name"/>
        </fieldset>

        <fieldset>
            <input type="date" id="event_date" class="form_input" placeholder="Event Date"/>
        </fieldset>

        <fieldset>
            <input type="text" id="event_location" class="form_input" placeholder="Event Location"/>
        </fieldset>

        <button class="saveFormButton" id="saveFormButton--events">Save Event</button>
        `
    },
    createEventCardsContainerHeader() {
        return `
        <article class="objCards" id="objCards--events">

        <h1>Your Events:</h1>

        </article>
        `
    },
    createNoEventsMessage() {
        return `
        <article class="objCards" id="objCards--events">
            You have no saved events. Please create an event!
        </article>
        `
    },
    createEventCard(event) {
        return `
            <div class="cards" id="cards--${event.id}">
        
                <h3>${event.name}</h3>
                <h4>${event.location}</h4>
                <p>${event.date}</p>
                <button class="editFormButton" id="editFormButton--${event.id}">Edit Event</button>
                <button class="deleteFormButton" id="deleteFormButton--${event.id}">Delete Event</button>

            </div>
        `
    },
    createEditEventForm(event) {
        return `
        <input type="hidden" id="event_id" value="${event.id}"/>

        <input type="hidden" id="event_userId" value="${event.userId}"/>

        <fieldset>
            <input type="text" id="event_name" class="form_input" value="${event.name}"/>
        </fieldset>

        <fieldset>
            <input type="date" id="event_date" class="form_input" value="${event.date}"/>
        </fieldset>

        <fieldset>
            <input type="text" id="event_location" class="form_input" value="${event.location}"/>
        </fieldset>

        <button class="saveFormButton" id="saveFormButton--${event.id}">Save Event</button>
        `
    }
}

export default eventHtmlComponents;