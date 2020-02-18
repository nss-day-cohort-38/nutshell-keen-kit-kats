
import addToDom from "./addToDom.js"
import eventListeners from "./mainEventListeners.js"
import profileEventListeners from "./myProfile/profileEventListeners.js"
import tasksEventListeners from "./tasks/tasksEventListeners.js"

// Calling check if logged in conditional function!
addToDom.checkIfLoggedIn()

// Calling event listeners for login form!
eventListeners.loginButtonEventListener()
eventListeners.signupButtonEventListener()
eventListeners.profileDropDownEventListener()
eventListeners.logoutButtonEventListener()


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