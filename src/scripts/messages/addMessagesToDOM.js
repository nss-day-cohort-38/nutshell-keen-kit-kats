import dbAPI from "../dbAPI.js";
import createMessageBoard from "./messageContainerFactory.js";
import renderChatRoom from "./renderMessages.js";

const init = () => {
  const chatButton = document.getElementById("chatButton");
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

        const chatHTML = createMessageBoard(message, userId, username);
        renderChatRoom(chatHTML);
      });
    });
  });
};

export { init as default };
