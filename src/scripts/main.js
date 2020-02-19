
import addToDom from "./addToDom.js"
import eventListeners from "./mainEventListeners.js"
import eventsEventListeners from './events/eventsEventListeners.js';
import profileEventListeners from "./myProfile/profileEventListeners.js"
import newsEventListeners from "./articles/eventListenersNews.js"
import tasksEventListeners from "./tasks/tasksEventListeners.js"
import friendsEventListeners from "./friends/friendEventListeners.js"
import chatButtonClickEvent from "./messages/eventListeners.js"
import init from "./messages/addMessagesToDOM.js"
import messageAPIManager from "./messages/messagesManager.js"

// import eventsRenderToDom from "./events/eventsRenderToDom.js"

// eventsRenderToDom.renderFriendsEventsToDom()

// Calling initial render of messages
init()
messageAPIManager.postSendMessage()

// Calling check if logged in conditional function!
addToDom.checkIfLoggedIn()

// Calling event listeners for login form!
eventListeners.loginButtonEventListener()
eventListeners.signupButtonEventListener()
eventListeners.logoutButtonEventListener()
// friendsEventListeners.friendsButtonEventListener()
eventListeners.profileDropDownEventListener()


// calling My Profile Event Listeners

profileEventListeners.myProfileButtonEventListener()
profileEventListeners.changeUsernameButtonEventListener()
profileEventListeners.submitChangedUserNameEventListener()
profileEventListeners.changePasswordButtonEventListener()
profileEventListeners.submitChangedPasswordEventListener()
//addMessagesToDOM.messageButtonEventListener()


// Calling messages event listeners
//chatButtonClickEvent.chatButtonFirstClick()
chatButtonClickEvent.exitMessages()


// Friends event listeners
friendsEventListeners.friendsButtonEventListener()



    // News section Event Listeners
newsEventListeners.mainNavNewsButtonAddEventListener();
newsEventListeners.createSaveEditAndDeleteBtnsAddEventListener();


// Tasks event listeners

tasksEventListeners.taskNavBarEventListener()
tasksEventListeners.createTaskEventListener()
tasksEventListeners.saveTaskEventListener()
tasksEventListeners.editTaskNameEventListener()
tasksEventListeners.saveEditedNameEventListener()
tasksEventListeners.taskCompleteEventListener()
tasksEventListeners.deleteTaskEventListener()
tasksEventListeners.nevermindButtonEventListener()

// Calling Events Event Listeners

eventsEventListeners.addEventButtonEventListener();
eventsEventListeners.addCreateEventButtonEventListener();
eventsEventListeners.addSaveEventButtonEventListener();
eventsEventListeners.addDeleteEventButtonEventListener();
eventsEventListeners.addEditEventButtonEventListener();
eventsEventListeners.addNevermindButtonEventListener();
