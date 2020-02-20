import addFriendsToDom from "./addFriendsToDom.js";
import dbAPI from "../dbAPI.js";
import createFriendsHTML from "./createFriendsComponents.js"


const friendsEventListeners = {
  friendsButtonEventListener() {
    const mainContainer = document.getElementById("mainContainer")
    const friendButton = document.getElementById("myFriends");
    friendButton.addEventListener("click", event => {
      // going to friends page to fetch friends and display them on friends.html page
      mainContainer.innerHTML = ""
      addFriendsToDom.addFriendsContainers()
      addFriendsToDom.addFriendCards()

      dbAPI.getUsers()
          .then(users => {
              users.forEach(userObj => {
                const usersSelection = document.getElementById('selectUsers')
                  usersSelection.innerHTML += createFriendsHTML.userFriendOptionCreator(userObj)
              })
            })
    })
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
            if(userName === (JSON.parse(sessionStorage.getItem('user'))).username) {
              alert(`You can't add yourself silly!`)
            }
            else if(alreadyFriend.length !== 0){
              if(confirm(`Unfriend ${userName}?`)){
                dbAPI.deleteObjectByResource('friends', alreadyFriend[0].id)
                .then(()=>{
                  if(document.getElementById('friendsContainer') !== null) {
                    addFriendsToDom.addFriendCards()
                  }
                  alert(`You have unfriended ${userName}`)
                })
              }
            } else {
              const newFriendObj = {
                'userId': parseInt(newFriendUserId),
                'loggedInUserId': currentUserId
              };
              if(confirm(`Add ${userName} as a friend?`)){
                dbAPI.postObjectByResource('friends', newFriendObj)
                  .then(()=>{
                    if(document.getElementById('friendsContainer') !== null) {
                      addFriendsToDom.addFriendCards()
                    }
                  }).then(alert(`You are now following ${userName}`))
              }

            }
          })
       }
    })
  },
  unfriendButtonEventListener() {
    const mainContainer = document.getElementById("mainContainer")

    mainContainer.addEventListener('click', (event) => {
      
      if(event.target.id.startsWith('unfriend')) {
        const friendId = (event.target.id.split('-'))[1]
        const username = (event.target.id.split('-'))[2]

        if(confirm(`Are you sure you want to unfriend ${username}?`)){
          dbAPI.deleteObjectByResource('friends', friendId)
            .then(()=>{
              if(document.getElementById('friendsContainer') !== null) {
                addFriendsToDom.addFriendCards()
              }
              alert(`${username} has been unfriended!`)
            })
      } 

    }
    })
  },
  // fiendAddButtonEventListener() {
  //   if (document.getElementById('addFriendButton') !== null) {
  //     const addFriendButton = document.getElementById('selectUsers')

  //     addFriendButton.addEventListener('click', (event) => {

  //     })

  //   }
  // }

};

export default friendsEventListeners;
