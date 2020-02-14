
import {createHTML, createObjects} from "./createComponent.js"


const addToDom = {
    addLoginForm() {
        const mainContainer = document.getElementById('mainContainer')

        mainContainer.innerHTML += createHTML.createLoginForm()
    },

    addButtonsToNav(userId) {
        const headerContainer = document.getElementById('headerContainer')

        headerContainer.innerHTML += createHTML.createMainButtons(userId)
    }
}


export default addToDom