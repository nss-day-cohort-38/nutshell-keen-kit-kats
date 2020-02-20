import createFriendsHTML from "./createFriendsComponents.js"
import dbAPI from "../dbAPI.js"



const addFriendsToDom = {

    addFriendsContainers(){
        const mainContainer = document.getElementById('mainContainer')
        
        mainContainer.innerHTML += createFriendsHTML.createFriendsContainers()
    },

    addFriendCards() {
        const friendCardContainer = document.getElementById('friendsContainer')
        const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id
        friendCardContainer.innerHTML = ""
        dbAPI.getFriends(currentUserId).then(friendData => {
            friendData.forEach(friendObj => {
                friendCardContainer.innerHTML += createFriendsHTML.createFriendCard(friendObj)
            })
        });
    }


}

export default addFriendsToDom