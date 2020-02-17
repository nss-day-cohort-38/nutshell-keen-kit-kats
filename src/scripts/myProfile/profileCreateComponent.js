

const createProfileHTML = {

    createMyProfileComponent() {
        const currentUserObj = JSON.parse(sessionStorage.getItem('user'))

        return `
        <div class="container" id="myProfileContainer">
            <img src="./images/profileIcon.png" alt="Profile Picture">
            <div class="container" id="changeUsernameContainer">
                <p>Username: <strong>${currentUserObj.username}</strong></p> 
                <button type="button" class="button" id="changeUsernameButton">Edit Username</button>
            </div>
            <div class="container" id="changePasswordContainer"> 
                <button type="button" class="button" id="changePasswordButton">Change Password</button>
            </div>
        </div>
        `
    },

    createChangeUsernameComponent() {
        const currentUserObj = JSON.parse(sessionStorage.getItem('user'))

        return `
            <p>Change Username: </p>
            <input type='text' class='textInput' id='changedUsernameInput' placeholder='${currentUserObj.username}'>
        `
    },

    createChangePasswordComponent() {
        return `
            <input type='password' class='textInput' id='currentPasswordInput' placeholder='Current Password'>
            <input type='password' class='textInput' id='newPassword-1' placeholder='New Password'>
            <input type='password' class='textInput' id='newPassword-2' placeholder='Retype New Password'>
        `
    }

}


export default createProfileHTML