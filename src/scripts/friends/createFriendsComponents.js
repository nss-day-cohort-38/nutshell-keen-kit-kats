import createProfileHTML from "../myProfile/profileCreateComponent.js";


const createFriendsHTML = {

    createFriendCard(friendObj){
        return`
            <figure class="friendCard cards" id="friend-${friendObj.id}">
                <img src="./images/profileIcon.png" alt="Profile Picture"></img>
                <h1>${friendObj.user.username}</h1>
                <button class="unfriend" id="unfriend-${friendObj.id}-${friendObj.user.username}">Unfriend</button>
                <input type="hidden" value=${friendObj.id}>
            </figure>
        `;
    },

    createFriendsContainers() {
        return `
            <article class="addFriends" id='addFriendsContainer'>
            <h1 class='sectionHeader'>Add a friend!</h1>

            <select id='selectUsers'>
            <option value="" selected disabled hidden>Select User</option>

            </select>
            <button id="addFriendButton">Add Friend</button>
            </article>
            <h1 class='sectionHeader'>My Friends!</h1>
            <article class="objCards" id='friendsContainer'></article>
        `;
    },

    userFriendOptionCreator(userObj) {
        return `<option id='userOption-${userObj.username}' value="${userObj.id}-${userObj.username}">${userObj.username}</option>`
    }


}

export default createFriendsHTML