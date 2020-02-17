
import profileAddToDom from "./profileAddToDom.js"
import {createHTML, createObjects} from "../createComponent.js"
import dbAPI from "../dbAPI.js"


const passwordMinLength = 3

const profileEventListeners = {

    myProfileButtonEventListener() {
        document.getElementById('myProfile').addEventListener('click', () => {
            profileAddToDom.addMyProfileToDom();
            document.getElementById('profileDropDown').classList.toggle('hidden');
        });
    },

    changeUsernameButtonEventListener() {
        document.getElementById('mainContainer').addEventListener('click', (event) =>  {
            if(event.target.id ==='changeUsernameButton') {
                document.getElementById('changeUsernameContainer').innerHTML = ""
                profileAddToDom.addChangeUsernameInputs()
            }
        })
    },

    submitChangedUserNameEventListener() {
        document.getElementById('mainContainer').addEventListener('keyup', (event) =>  {
            if(event.target.id ==='changedUsernameInput' && event.key === 'Enter') {
                const usernameInput = document.getElementById('changedUsernameInput')

                if(usernameInput.value.length < 3) {
                    alert('Username must be 3 characters or longer. Please try again.') 
                } else if (usernameInput.value.includes(" ")) {
                    alert('Usernames cannot contain any spaces. Please try again.')
                } else {
                    dbAPI.getUsers()
                        .then(users => {
                            const sameUsernameObj = users.filter(userObj => userObj.username === usernameInput.value)

                            if (sameUsernameObj.length !== 0) {
                                alert('Sorry, this username already taken! Please try again.')
                            } else {
                                const usernameObj = createObjects.patchedKeyValueObjectCreator('username', usernameInput.value)
                                const userId = (JSON.parse(sessionStorage.getItem('user')).id)
                                dbAPI.patchObjectByResource('users', userId, usernameObj)
                                    .then(newUserObj => sessionStorage.setItem('user', JSON.stringify(newUserObj)))
                                    .then(profileAddToDom.addMyProfileToDom)
                            }
                        })
                }
            }
        })
    }, 

    changePasswordButtonEventListener() {

        document.getElementById('mainContainer').addEventListener('click', (event) =>  {
            if(event.target.id ==='changePasswordButton') {
                document.getElementById('changePasswordContainer').innerHTML = ""
                profileAddToDom.addChangePasswordInputs()
            }
        })

    },

    submitChangedPasswordEventListener() {
        document.getElementById('mainContainer').addEventListener('keyup', (event) =>  {
            if(event.target.id ==='newPassword-2' && event.key === 'Enter') {
                const currentPassword = document.getElementById('currentPasswordInput').value
                const newPassword1 = document.getElementById('newPassword-1').value
                const newPassword2 = document.getElementById('newPassword-2').value
                const userId = (JSON.parse(sessionStorage.getItem('user'))).id


                if (newPassword1 !== newPassword2){
                    return alert('New passwords do not match! Please try again.')
                }
                
                dbAPI.getUsers()
                    .then(users => {
                        const userDatabaseObj = (users.filter(userObj => userObj.id === userId))[0]

                        if (userDatabaseObj.password !== currentPassword) {
                                alert('The current password you typed is incorrect. Please try again.')
                        } else if (newPassword2.length < passwordMinLength) {
                            alert(`Password must be at least ${passwordMinLength} characters long. Please try again.`)
                        } else if (newPassword2.includes(" ") === true) {
                            alert('Passwords cannot contain any spaces. Please try again')
                        } else {
                            const newPasswordObj = createObjects.patchedKeyValueObjectCreator('password', newPassword2)
                            dbAPI.patchObjectByResource('users', userId, newPasswordObj)
                                .then(newUserObj => sessionStorage.setItem('user', JSON.stringify(newUserObj)))
                                .then(()=>{
                                    const changePasswordContainer = document.getElementById('changePasswordContainer')
                                    changePasswordContainer.innerHTML = `<p><strong>SUCCESS!</strong> Your password has been changed.</p>`
                                })
                        }
                    })
                }
        })
    }

}

export default profileEventListeners