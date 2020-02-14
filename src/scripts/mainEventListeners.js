import dbAPI from "./dbAPI.js"
import addToDom from "./addToDom.js"

const eventListeners = {
    
    loginButtonEventListener(){
        const loginButton = document.getElementById('loginButton')

        loginButton.addEventListener('click', () => {
            const userEmail = document.getElementById('user-email').value
            const userPassword = document.getElementById('user-password').value
            const mainContainer = document.getElementById('mainContainer')

            dbAPI.getUsers()
                .then(users => {
                    const theUser =users.filter(user => {
                        return user.email === userEmail.toString() && user.password === userPassword.toString()
                    });
                    console.log(theUser)
                    mainContainer.innerHTML = ""
                    
                    addToDom.addButtonsToNav(theUser[0].id)
                })
        })
    }
}

export default eventListeners