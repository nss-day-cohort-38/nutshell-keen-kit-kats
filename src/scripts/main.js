
import addToDom from "./addToDom.js"
import eventListeners from "./mainEventListeners.js"
import friendsEventListeners from "./friends/eventListeners.js"
import profileEventListeners from "./myProfile/profileEventListeners.js"
import tasksEventListeners from "./tasks/tasksEventListeners.js"
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

// Tasks event listeners

tasksEventListeners.taskNavBarEventListener()
tasksEventListeners.createTaskEventListener()
tasksEventListeners.saveTaskEventListener()
tasksEventListeners.editTaskNameEventListener()
tasksEventListeners.saveEditedNameEventListener()

// Chat event listeners
chatButtonClickEvent.chatButtonFirstClick()
addMessagesToDOM.messageButtonEventListener()
addMessagesToDOM.exitMessages()
