import dbAPI from "../dbAPI.js";
import addMessagesToDOM from "./messageContainerFactory.js"
import createMessageBoard from "./messageContainerFactory.js"

//grab ref to mainContainer
// event needs to blow away what is on the page
// chat with other users, when the user activated their account
// chat section top right of page
// 1 messages, userID, display username based on userID.
// save users id as foriegn key on the chat

const mainContainer = document.getElementById("mainContainer");
const chatContainer = document.getElementById("chatContainer");
const chatButton = document.getElementById("chatButton");

const chatButtonClickEvent = {
  chatButtonFirstClick() {
    const chatButton = document.getElementById("chatButton");
    chatButton.addEventListener("click", () => {
      dbAPI.getMessages().then(dataFromAPi => {
          console.log(dataFromAPi);
        const chatContainer = document.getElementById("chatContainer");
        //chatContainer.innerHTML = "";
        dataFromAPi.map(user => {
          const message = user.message;
          const userId = user.userId;
         const chatHTML = createMessageBoard(message);
         //renderChatRoom(chatHTML);

        });
      });
    });
  }
};

const renderChatRoom = chatHTML => {
  const chatContainer = document.getElementById("chatContainer");
  chatContainer.innerHTML += chatHTML;
};

export default chatButtonClickEvent;
