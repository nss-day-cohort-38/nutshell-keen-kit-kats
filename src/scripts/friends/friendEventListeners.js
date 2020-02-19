import addFriendsToDom from "./addFriendsToDom.js";


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
  }
};

export default friendsEventListeners;
