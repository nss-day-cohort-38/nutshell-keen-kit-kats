import dbAPI from "../dbAPI.js";
import friendsEventListeners from "./eventListeners.js";


const friendsFunctions = {

  getUsersFriends() {
    dbAPI
      .getFriends(resp => resp.json())
      .then(friends => {
        const activeUserId = (JSON.parse(sessionStorage.getItem("user"))).id;
        const activeFriendIds = friends.filter(friend => {
          return friend.loggedInUserId;
        });
        const userIds = activeFriendIds.map(user => {
          return user.userId;
        });
        dbAPI
          .getUsers(userIds) // needs getObjectsbyResorce pass in the resource (friends) 
          .then(data => {
            console.log("data", data);
            const activeUserId = (JSON.parse(sessionStorage.getItem("user"))).id;
            console.log(activeUserId);
            data.forEach(user => {
              const username = user.username;
              const ul = document.getElementById("friends-list");
              const listElement = document.createElement("li");
              listElement.appendChild(document.createTextNode(username));
              ul.appendChild(listElement);
            });
          })
          .catch(err => console.log("err", err));
      });
  }
}

  // dbAPI
  // .getFriends(resp => resp.json())
  // .then(friends => {
  //     console.log(friends);
  //   const activeUserId = (JSON.parse(sessionStorage.getItem("user"))).id;
  // });
