
import addToDom from "./addToDom.js"
import eventListeners from "./mainEventListeners.js"
import eventsEventListeners from './events/eventsEventListeners.js';

// Calling check if logged in conditional function!
addToDom.checkIfLoggedIn()

// Calling event listeners for login form!
eventListeners.loginButtonEventListener()
eventListeners.signupButtonEventListener()
eventListeners.logoutButtonEventListener()

eventsEventListeners.addEventButtonEventListener();