import dbAPI from "../dbAPI.js";
import createMessageBoard from "./messageContainerFactory.js";
import renderChatRoom from "./renderMessages.js";

//function()
const init = () => {
  const chatButton = document.getElementById("chatButton");
  //document.getElementById("messageList").scrollIntoView(true);
  
  chatButton.addEventListener("click", () => {
    document.getElementById("chatContainer").classList.toggle("hidden");
    document.getElementById("body").classList.toggle("shrink");
    document.getElementById("profileDropDown").classList.toggle("hidden");
    dbAPI.getMessagesExpanded().then(dataFromAPi => {
      const chatContainer = document.getElementById("message-list");
      chatContainer.innerHTML = "";
      dataFromAPi.forEach(data => {

        const message = data.message;
        const userId = data.userId;
        const username = data.user.username;
        const messageId = data.id;
        const chatHTML = createMessageBoard(
          message,
          userId,
          username,
          messageId
          );
          renderChatRoom(chatHTML);
        })
        const messageContainerScroll = document.querySelector(".chat-room-landing-page");
        messageContainerScroll.scrollIntoView(false);
      });
    });
};

export { init as default }; 
