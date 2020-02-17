
import {createHTML, createObjects} from "./createComponent.js"


const addToDom = {
    checkIfLoggedIn() {
        if (sessionStorage.getItem('user') === null) {
            this.addLoginForm()
        } else {
            this.addReturningUserMessage()
            // making nav buttons appear
            document.getElementById('resourceButtons').classList.toggle('hidden')
            document.getElementById('profileIcon').classList.toggle('hidden')
        }
    },

    addLoginForm() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.innerHTML += createHTML.createLoginForm()
    },

    addButtonsToNav() {
        const loggedInUserId = (JSON.parse(sessionStorage.getItem('user'))).id
        const headerButtonContainer = document.getElementById('headerButtonContainer')

        headerButtonContainer.innerHTML += createHTML.createMainButtons(loggedInUserId)
    },

    addNewUserMessage() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.innerHTML += createHTML.createNewUserWelcomeMessage()
    },

    addReturningUserMessage() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.innerHTML += createHTML.createReturningUserWelcomeMessage()
    }
}


export default addToDom