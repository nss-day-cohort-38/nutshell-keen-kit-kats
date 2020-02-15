import dbAPI from "./dbAPI.js"
import addToDom from "./addToDom.js"
import {createHTML, createObjects} from "./createComponent.js"

const eventListeners = {
    
    loginButtonEventListener(){
        const mainContainer = document.getElementById('mainContainer');

        mainContainer.addEventListener('click', (event) => {
            const userEmail = document.getElementById('userEmail');
            const userPassword = document.getElementById('userPassword');
            
            if (event.target.id.startsWith('loginButton')){
                dbAPI.getUsers()
                    .then(users => {
                        const userDatabaseObject = (users.filter(user => user.email === userEmail.value && user.password === userPassword.value));
                    
                        if (userEmail.value === "" || userPassword.value === "") {
                            alert('Please fill out all entry fields!')
                        } else if (userDatabaseObject.length === 0) {
                            alert('Sorry, wrong email or password. Try again!')
                            userPassword.value = ""
                        } else {
                            // This is a successful login. 
                            // The user object is taken directly from the db so it has the id
                            // It is then stored in the browsers session memory, which is ended if you close the tab or window.
                           sessionStorage.setItem('user', JSON.stringify(userDatabaseObject[0]));
                            mainContainer.innerHTML = ""

                            addToDom.addReturningUserMessage();
                        };
                    });
            };
        });
    }, 
    
    signupButtonEventListener(){
        const mainContainer = document.getElementById('mainContainer');

        mainContainer.addEventListener('click', (event) => {
            const newUserEmail = document.getElementById('new-userEmail');
            const newUsername = document.getElementById('new-username');
            const newUserPassword = document.getElementById('new-userPassword');
            
            if (event.target.id.startsWith('signUpButton')){
                dbAPI.getUsers()
                    .then(users => {
                        const userEmailObject = (users.filter(user => user.email === newUserEmail.value));
                        const userNameObject = (users.filter(user => user.username === newUsername.value))
                        if (newUsername.value === "" || newUserEmail.value === "" || newUserPassword.value === "") {
                            alert('Please fill out all entry fields!')
                        } else if (userEmailObject.length !== 0) {
                            alert('That email is already in use. Pleas use another email and try again.')
                        } else if (newUserEmail.value.includes('@') === false || newUserEmail.value.includes('.com' || '.net' || '.org') === false) {
                            alert('Please enter valid email address!')
                        } else if (newUsername.value.length < 3) {
                            alert('Usernames must be at least three characters long. Please try again.')
                        } else if (userNameObject.length !== 0) {
                            alert('That username is already in use. Please choose another one and try again.')
                        } else {
                            // This is a successful new account creation
                            // The newUserObject is POSTed, and then returns the new object
                            // We then save the new object to session storage and wipe the login away

                            const newUserObject = createObjects.newUserObjectCreator(newUsername.value, newUserEmail.value, newUserPassword.value);
                            dbAPI.postObjectByResource('users', newUserObject)
                                .then(newUserObject => {
                                    sessionStorage.setItem('user', JSON.stringify(newUserObject));
                                    mainContainer.innerHTML = "";

                                    addToDom.addNewUserMessage();
                                })
                        };
                    });
            };
        });
    },

    logoutButtonEventListener() {
        const logoutButton = document.getElementById('logout');
        const mainContainer = document.getElementById('mainContainer');

        logoutButton.addEventListener('click', () => {
            if (confirm("Are you sure you want to logout?")){
                sessionStorage.clear();
                mainContainer.innerHTML = "";
                addToDom.addLoginForm();
            }
        });
    }
}

export default eventListeners