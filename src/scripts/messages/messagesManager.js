import dbAPI from "../dbAPI.js";
import renderChatRoom from "./renderMessages.js";
import {createMessageBoard, differentUserMessage } from "./messageContainerFactory.js";

const messageAPIManager = {
  postSendMessage() {
    const sendButton = document.getElementById("sendMessage");
    sendButton.addEventListener("click", () => {
      const message = document.getElementById("writeMessage").value;
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      const hiddenMessageId = document.getElementById("hiddenMessageId").value;

      const resource = {
        userId,
        message,
        id: hiddenMessageId,
      };
      if (hiddenMessageId !== "") {
        dbAPI
          .editResource("messages", resource)
          .then(() => {
            document.getElementById("writeMessage").value = "";

            const chatContainer = document.getElementById("message-list");
            chatContainer.innerHTML = "";

            dbAPI.getMessagesExpanded().then(dataFromAPi => {
              dataFromAPi.forEach(data => {
                const message = data.message;
                const userId = data.userId;
                const username = data.user.username;
                const messageId = data.id;
                const hiddenId = data.id;
                
                const chatHTML = createMessageBoard(
                  message,
                  userId,
                  username,
                  messageId,
                  hiddenId
                );

                renderChatRoom(chatHTML);
              });
            });
          })
          .catch(err => console.log({ err }));
      } else {
        dbAPI.postObjectByResource("messages", resource).then(response => {
          //console.log("Message created: ", response);
          document.getElementById("writeMessage").value = "";

          const chatContainer = document.getElementById("message-list");
          chatContainer.innerHTML = "";

          dbAPI.getMessagesExpanded().then(dataFromAPi => {
            dataFromAPi.forEach(data => {
              const message = data.message;
              const userId = data.userId;
              const username = data.user.username;
              const messageId = data.id;
              const hiddenId = data.id;
              const currentUserId = (JSON.parse(sessionStorage.getItem('user'))).id

              if (userId === currentUserId) {
                const chatHTML = createMessageBoard(
                  message,
                  userId,
                  username,
                  messageId
                  );
                  renderChatRoom(chatHTML); 
              } else {
                const chatHTML = differentUserMessage(
                  message,
                  userId,
                  username,
                  messageId
                  );
                  renderChatRoom(chatHTML); 
      
              }
            });
          });
        });
      }
    });
  }
};

export default messageAPIManager;
