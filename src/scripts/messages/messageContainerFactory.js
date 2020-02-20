const createMessageBoard = (message, userId, username, messageId) => {
  return `
      <div class="chat-room-landing-page">
        <div id="messages" data-user-id="${userId}">
          <p><em>${username}:</em> ${message}</p>
          </div>
          <div>
          <button id="editMessage--${messageId}" class="message-edit-button">Edit</button>
      </div>
  `;
};
export { createMessageBoard as default };
