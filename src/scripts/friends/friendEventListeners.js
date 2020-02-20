import addFriendsToDom from "./addFriendsToDom.js";
import dbAPI from "../dbAPI.js";


const friendsEventListeners = {
  friendsButtonEventListener() {
    const mainContainer = document.getElementById("mainContainer")
    const friendButton = document.getElementById("myFriends");
    friendButton.addEventListener("click", event => {
      // going to friends page to fetch friends and display them on friends.html page
      mainContainer.innerHTML = ""
      addFriendsToDom.addFriendsContainers()
      addFriendsToDom.addFriendCards()
    });
  },

  addNewFriendEventListener() {
    const chatContainer = document.getElementById('chatContainer')

    chatContainer.addEventListener('click', (event) => {
       if(event.target.id.startsWith('username')) {
         const newFriendUserId = (event.target.id.split('--'))[1]
         const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id
         const userName = event.toElement.innerText
         dbAPI.getFriends(currentUserId)
          .then(friends => {
            const alreadyFriend = friends.filter(friend => {
                return friend.user.id === parseInt(newFriendUserId)
              })
            if(alreadyFriend.length !== 0){
              return alert(`You are already friends with ${userName}! :)`)
            } else {
              const newFriendObj = {
                'userId': parseInt(newFriendUserId),
                'loggedInUserId': currentUserId
              };
              if(confirm(`Add ${userName} as a friend?`)){
                dbAPI.postObjectByResource('friends', newFriendObj)
                  .then(()=>{
                    alert(`You are now following ${userName}`)
                    if(document.getElementById('friendsContainer') !== null) {
                      addFriendsToDom.addFriendCards()
                    }
                  })
              }

            }
          })
       }
    })
  }
};

export default friendsEventListeners;
