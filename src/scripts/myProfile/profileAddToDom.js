import createProfileHTML from "./profileCreateComponent.js"

const profileAddToDom = {

    addMyProfileToDom() {
        document.getElementById('mainContainer').innerHTML = createProfileHTML.createMyProfileComponent()
    },

    addChangeUsernameInputs() {
        document.getElementById('changeUsernameContainer').innerHTML = createProfileHTML.createChangeUsernameComponent()
    },

    addChangePasswordInputs() {
        document.getElementById('changePasswordContainer').innerHTML = createProfileHTML.createChangePasswordComponent()
    }
}

export default profileAddToDom