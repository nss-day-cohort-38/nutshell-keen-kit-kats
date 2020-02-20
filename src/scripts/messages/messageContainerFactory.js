const createMessageBoard = (message, userId, username, messageId) => {
  return `
      <div class="chat-room-landing-page">
        <div id="messages" data-user-id="${userId}">
          <p><em class='chatUsername' id="username--${userId}">${username}</em>: ${message}</p>
        </div>
        <button id="editMessage--${messageId}" class="message-edit-button">Edit</button>
      </div>
  `;
};
export { createMessageBoard as default };
