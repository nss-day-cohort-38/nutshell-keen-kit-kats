const friendsEventListeners = {
  friendsButtonEventListener() {
    const friendButton = document.getElementById("myFriends");
    friendButton.addEventListener("click", event => {
      // going to friends page to fetch friends and display them on friends.html page
      window.location.href = "./scripts/friends/friends.html";
    });
  }
};

export default friendsEventListeners;
