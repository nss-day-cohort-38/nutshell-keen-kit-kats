
import addToDom from "./addToDom.js"
import eventListeners from "./mainEventListeners.js"
import profileEventListeners from "./myProfile/profileEventListeners.js"
import newsEventListeners from "./articles/eventListenersNews.js"

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



    // News section Event Listeners
newsEventListeners.mainNavNewsButtonAddEventListener();
newsEventListeners.createSaveEditAndDeleteBtnsAddEventListener();