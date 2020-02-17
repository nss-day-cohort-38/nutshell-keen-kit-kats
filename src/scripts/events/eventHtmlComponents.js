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
        <h1>Your Events:</h1>
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
        <article class="objCards" id="objCards--events">
            <div class="cards" id="cards--events">
        
                <h3>${event.name}</h3>
                <h4>${event.location}</h4>
                <p>${event.date}</p>

            </div>
        </article>
        `
    }
}

export default eventHtmlComponents