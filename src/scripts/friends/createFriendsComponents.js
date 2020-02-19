import createProfileHTML from "../myProfile/profileCreateComponent.js";


const createFriendsHTML = {

    createFriendCard(friend){
        return`
            <figure class="friendCard cards" id="friend-${friend.id}">
                <img src="./images/profileIcon.png" alt="Profile Picture"></img>
                <h1>${friend.username}</h1>
                <button class="unfriend" id="unFriend-${friend.id}">Unfriend</button>
                <input type="hidden" value=${friend.id}>
            </figure>
        `;
    },

    createFriendsContainers() {
        return `
            <h1 class='sectionHeader'>My Friends!</h1>
            <article class="objCards" id='friendsContainer'></article>
        `;
    }


}

export default createFriendsHTML