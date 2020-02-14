const eventHtmlComponents = {
    createEventFormButton() {
        return `
        <article class="createFormContainer" id="createFormContainer--events">
            <button class="createFormButton" id="createFormButton--events">Create Event</button>
        </article>
        `
    },
    createEventForm() {
        return `
        <article class="createFormContainer" id="createFormContainer--events">

            <fieldset>
                <input type="text" id="event_name" class="form_input" placeholder="Event Name"/>
            </fieldset>

            <fieldset>
                <input type="date" id="event_date" class="form_input" placeholder="Event Date"/>
            </fieldset>

            <fieldset>
                <input type="text" id="event_location" class="form_input" placeholder="Event Location"/>
            </fieldset>

        </article>
        `
    },
    createEventCard(event) {
        return `
        <div class="cards" id="cards--events">
        
        <h3>${event.name}</h3>
        <h4>${event.location}</h4>
        <p>${event.date}</p>

        </div>
        `
    },
    createEventCardsContainerHeader() {
        return `
        <h1>Your Events</h1>
        `
    }
}