
import addToDom from "./addToDom.js"
import eventListeners from "./mainEventListeners.js"
import eventsEventListeners from './events/eventsEventListeners.js';
import profileEventListeners from "./myProfile/profileEventListeners.js"
import eventsRenderToDom from "./events/eventsRenderToDom.js";
import friendsEventListeners from "./friends/eventListeners.js"
import chatButtonClickEvent from "./messages/eventListeners.js"
//import messageButtonEventListener from "./messages/addMessagesToDOM.js"
import addMessagesToDOM from "./messages/addMessagesToDOM.js"

// Calling check if logged in conditional function!
addToDom.checkIfLoggedIn()

// Calling event listeners for login form!
eventListeners.loginButtonEventListener()
eventListeners.signupButtonEventListener()
eventListeners.logoutButtonEventListener()
friendsEventListeners.friendsButtonEventListener()
eventListeners.profileDropDownEventListener()


// calling My Profile Event Listeners

profileEventListeners.myProfileButtonEventListener()
profileEventListeners.changeUsernameButtonEventListener()
profileEventListeners.submitChangedUserNameEventListener()
profileEventListeners.changePasswordButtonEventListener()
profileEventListeners.submitChangedPasswordEventListener()

// Calling Events Event Listeners

eventsEventListeners.addEventButtonEventListener();
eventsEventListeners.addCreateEventButtonEventListener();
eventsEventListeners.addSaveEventButtonEventListener();
eventsEventListeners.addDeleteEventButtonEventListener();
eventsEventListeners.addEditEventButtonEventListener();


chatButtonClickEvent.chatButtonFirstClick()
addMessagesToDOM.messageButtonEventListener()
addMessagesToDOM.exitMessages()
